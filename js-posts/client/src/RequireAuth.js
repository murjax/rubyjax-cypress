import { Navigate } from 'react-router-dom';

function RequireAuth(props) {
  if (!props.authToken) {
    return <Navigate to="/sign_in" replace />;
  }

  return props.children;
}

export default RequireAuth;
