import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function RequireAuth(props) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/sign_in" replace />;
  }

  return props.children;
}

export default RequireAuth;
