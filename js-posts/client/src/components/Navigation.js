import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navigation(props) {
  const navigate = useNavigate();

  const authenticatedOptions = () => {
    if (!props.authToken) { return; }

    return (
      <div>
        <Link
          to="/posts"
          className="p-2 rounded-md text-black font-medium hover:bg-slate-100"
        >
          View Posts
        </Link>
        <Link
          to="/posts/new"
          className="p-2 rounded-md text-black font-medium hover:bg-slate-100"
        >
          Create Post
        </Link>
        <button
          className="p-2 rounded-md text-black font-medium hover:bg-slate-100"
          onClick={() => {
            props.onSignOut();
            navigate('/');
          }}
        >
          Sign Out
        </button>
      </div>
    );
  };

  const unauthenticatedOptions = () => {
    if (props.authToken) { return; }

    return (
      <div>
        <Link
          to="/sign_in"
          className="p-2 rounded-md text-black font-medium hover:bg-slate-100"
        >
          Sign In
        </Link>
        <Link
          to="/sign_up"
          className="p-2 rounded-md text-black font-medium hover:bg-slate-100"
        >
          Register
        </Link>
      </div>
    );
  };

  return (
    <div className="hidden md:block p-2 bg-white shadow-lg">
      <div className="flex p-2 justify-between bg-white">
        <h3 className="text-2xl px-1 text-black">
          Posts
        </h3>

        <div className="flex">
          {authenticatedOptions()}
          {unauthenticatedOptions()}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
