import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

function Home(props) {
  return (
    <div>
      <Navigation
        authToken={props.authToken}
        onSignOut={props.onSignOut}
      />
      <Outlet />
    </div>
  );
}

export default Home;
