import { useState, useEffect } from 'react';
import RequireAuth from './RequireAuth';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PostIndex from './components/PostIndex';
import PostNew from './components/PostNew';
import PostEdit from './components/PostEdit';
import PostShow from './components/PostShow';
import Navigation from './components/Navigation';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';

function App() {
  const [authToken, setAuthToken] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home
        authToken={authToken}
        onSignOut={() => {
          localStorage.clear();
          setAuthToken(null);
        }}
      />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/sign_in",
          element: <SignIn onSignIn={(token) => {
            localStorage.setItem('js-posts-auth-token', token);
            setAuthToken(token);
          }}/>,
          errorElement: <ErrorPage />,
        },
        {
          path: "/sign_up",
          element: <SignUp onSignIn={(token) => {
            localStorage.setItem('js-posts-auth-token', token);
            setAuthToken(token);
          }}/>,
          errorElement: <ErrorPage />,
        },
        {
          path: "/posts",
          element: <RequireAuth authToken={authToken}>
            <PostIndex authToken={authToken} />
          </RequireAuth>,
          errorElement: <ErrorPage />,
        },
        {
          path: "/posts/:id",
          element: <RequireAuth authToken={authToken}>
            <PostShow authToken={authToken} />
          </RequireAuth>,
          errorElement: <ErrorPage />,
        },
        {
          path: "/posts/new",
          element: <RequireAuth authToken={authToken}>
            <PostNew authToken={authToken} />
          </RequireAuth>,
          errorElement: <ErrorPage />,
        },
        {
          path: "/posts/:id/edit",
          element: <RequireAuth authToken={authToken}>
            <PostEdit authToken={authToken} />
          </RequireAuth>,
          errorElement: <ErrorPage />,
        }
      ]
    },
  ]);

  useEffect(() => {
    const currentToken = localStorage.getItem('js-posts-auth-token');

    if (currentToken) {
      setAuthToken(currentToken);
    }
  }, [authToken]);

  return (
    <div>
      <RouterProvider router={router}>
        <Navigation authToken={authToken} />
      </RouterProvider>
    </div>
  );
}

export default App;
