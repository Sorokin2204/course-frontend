import { useRoutes } from 'react-router';

import SiteLayout from './components/site/SiteLayout/SiteLayout';
import AdminLogin from './pages/admin/AdminLogin/AdminLogin';
import AccountPage from './pages/site/AccountPage';

import HomePage from './pages/site/HomePage';

function App() {
  let routes = useRoutes([
    {
      path: '/',
      element: <AdminLogin />,
    },

    // {
    //   path: '/login',
    //   element: <AdminLogin />,
    // },
    {
      path: '/dashboard',
      element: (
        <SiteLayout>
          <AccountPage />
        </SiteLayout>
      ),
    },
    {
      path: '/list',
      element: (
        <SiteLayout>
          <div></div>
        </SiteLayout>
      ),
    },
    {
      path: '/list-2',
      element: (
        <SiteLayout>
          <div></div>
        </SiteLayout>
      ),
    },
  ]);

  return routes;
}

export default App;
