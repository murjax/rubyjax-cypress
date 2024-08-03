import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';

function PostEdit(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  const params = useParams();

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
    formData.id = params.id;

    fetch(`http://localhost:3001/posts/${params.id}`, {
      method: 'PUT',
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

  useEffect(() => {
    const getPost = () => {
      fetch(`http://localhost:3001/posts/${params.id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': props.authToken
        }
      }).then((response) => response.json()).then((data) => {
        setName(data.name);
        setDescription(data.description);
      });
    }

    getPost();
  }, [props.authToken, params.id]);

  return (
    <div className="relative md:rounded-md bg-white shadow-md mb-10 p-2">
      <h1 className="text-4xl text-center">Edit Post</h1>

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

export default PostEdit;
