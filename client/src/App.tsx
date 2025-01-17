import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './components/Navbar/NavBarUsers';

function App() {
  const location = useLocation();

  // Liste des routes utilisant des layouts spécifiques
  const excludedRoutes = ['/users'];

  const shouldShowNavBar = !excludedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  return (
    <main>
      {shouldShowNavBar && <NavBar />}
      <Outlet />
    </main>
  );
}

export default App;
