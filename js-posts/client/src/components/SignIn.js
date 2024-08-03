import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onError = (errors) => {
    console.log(errors);
  };

  const onSubmit = (formData) => {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => {
      if (data.token) {
        props.onSignIn(data.token);
        navigate('/posts')
      }
    });
  };

  return (
    <div className="SignIn">
      <h2 className="text-center text-4xl pt-2">Sign In</h2>

      <div className="flex justify-center">
        <div className="m-2 p-2 border-2 border-zinc-50 md:rounded-md w-full md:w-1/2 bg-zinc-50 shadow-md">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex justify-center my-3">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="input input-bordered w-full"
                {...register('email', { required: 'Email is required' })}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            <div className="flex justify-center my-3">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="input input-bordered w-full"
                {...register('password', { required: 'Password is required' })}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}

            <div className="mb-2">
              <input
                type="submit"
                value="Sign In"
                className="btn btn-primary w-full bg-sky-600 p-2 rounded text-slate-50 font-semibold cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
