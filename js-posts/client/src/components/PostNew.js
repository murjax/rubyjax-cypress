import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function PostNew(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const onError = (errors) => {
    console.log(errors);
  };

  const onSubmit = (formData) => {
    fetch('http://localhost:3001/posts', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.authToken
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((_data) => {
      navigate('/posts')
    });
  };

  return (
    <div className="relative md:rounded-md bg-white shadow-md mb-10 p-2">
      <h1 className="text-4xl text-center">New Post</h1>

      <div className="flex flex-col items-center mb-10">
        <form className="w-full md:w-3/4" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex flex-col mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="input input-bordered w-full"
              {...register('name', { required: 'Name is required' })}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}
          <div className="flex flex-col mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              className="input input-bordered w-full"
              {...register('description', { required: 'Description is required' })}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          {errors.description?.type === "required" && (
            <p className="text-red-500">Description is required</p>
          )}

          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded cursor-pointer"
            data-test-id="save-post"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostNew;
