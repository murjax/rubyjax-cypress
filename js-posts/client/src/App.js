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
import AuthProvider from './AuthProvider'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/sign_in",
          element: <SignIn />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/sign_up",
          element: <SignUp />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/posts",
          element: <RequireAuth>
            <PostIndex />
          </RequireAuth>,
          errorElement: <ErrorPage />,
        },
        {
          path: "/posts/:id",
          element: <RequireAuth>
            <PostShow />
          </RequireAuth>,
          errorElement: <ErrorPage />,
        },
        {
          path: "/posts/new",
          element: <RequireAuth>
            <PostNew />
          </RequireAuth>,
          errorElement: <ErrorPage />,
        },
        {
          path: "/posts/:id/edit",
          element: <RequireAuth>
            <PostEdit />
          </RequireAuth>,
          errorElement: <ErrorPage />,
        }
      ]
    },
  ]);

  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router}>
          <Navigation />
        </RouterProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
