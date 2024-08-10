import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

function Home(props) {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default Home;
