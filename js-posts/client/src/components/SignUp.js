import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../AuthProvider';

function SignUp(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const onError = (errors) => {
    console.log(errors);
  };

  const onSubmit = (formData) => {
    formData = underscoreKeys(formData);

    fetch('http://localhost:3001/users', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((_data) => {
      console.log(email);
      fetch('http://localhost:3001/login', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
      }).then((response) => response.json()).then((data) => {
        if (data.token) {
          login(data.token);
          navigate('/posts')
        }
      });
    });
  };

  const underscoreKeys = (object) => {
    return Object.keys(object).reduce((newObject, key) => {
      const value = object[key];
      const newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      newObject[newKey] = value;
      return newObject;
    }, {});
  }

  return (
    <div className="SignUp">
      <h2 className="text-center text-4xl pt-2">Sign Up</h2>

      <div className="flex justify-center">
        <div className="m-2 p-2 border-2 border-zinc-50 md:rounded-md w-full md:w-1/2 bg-zinc-50 shadow-md">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex justify-center my-3">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                className="input input-bordered w-full"
                {...register('firstName', { required: 'First name is required' })}
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            {errors.firstName?.type === "required" && (
              <p className="text-red-500">First name is required</p>
            )}
            <div className="flex justify-center my-3">
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="input input-bordered w-full"
                {...register('lastName', { required: 'Last name is required' })}
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            {errors.lastName?.type === "required" && (
              <p className="text-red-500">Last name is required</p>
            )}
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
                value="Sign Up"
                className="btn btn-primary w-full bg-sky-600 p-2 rounded text-slate-50 font-semibold cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
