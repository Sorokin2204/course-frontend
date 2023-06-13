import { useRoutes } from 'react-router';

import SiteLayout from './components/site/SiteLayout/SiteLayout';
import AdminLogin from './pages/admin/AdminLogin/AdminLogin';
import AccountPage from './pages/site/AccountPage';

import HomePage from './pages/site/HomePage';
import CourseList from './pages/site/CourseList';
import CourseSingle from './pages/site/CourseSingle';
import CourseStart from './pages/site/CourseStart';
import AdminLayout from './components/admin/AdminLayout/AdminLayout';
import AdminUsers from './pages/admin/AdminUsers/AdminUsers';
import AdminTypeBusiness from './pages/admin/AdminTypeBusiness/AdminTypeBusiness';
import AdminNameBusiness from './pages/admin/AdminNameBusiness/AdminNameBusiness';

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
      path: '/admin/users',
      element: (
        <AdminLayout>
          <AdminUsers />
        </AdminLayout>
      ),
    },
    {
      path: '/admin/types-of-business',
      element: (
        <AdminLayout>
          <AdminTypeBusiness />
        </AdminLayout>
      ),
    },
    {
      path: '/admin/business-list',
      element: (
        <AdminLayout>
          <AdminNameBusiness />
        </AdminLayout>
      ),
    },
    {
      path: '/list',
      element: (
        <SiteLayout>
          <CourseList />
        </SiteLayout>
      ),
    },
    {
      path: '/list/audit',
      element: (
        <SiteLayout>
          <CourseSingle />
        </SiteLayout>
      ),
    },
    {
      path: '/list/audit/start',
      element: (
        <SiteLayout>
          <CourseStart />
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
