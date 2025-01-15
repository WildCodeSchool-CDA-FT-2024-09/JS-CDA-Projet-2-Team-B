import { Outlet } from 'react-router-dom';
import NavBarAdmin from '../../components/NavBarAdmin';

export default function UserLayout() {
  return (
    <main>
      <NavBarAdmin />
      <Outlet />
    </main>
  );
}
