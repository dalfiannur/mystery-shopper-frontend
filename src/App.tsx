import "./index.css";
import {createBrowserRouter, RouterProvider} from 'react-router'
import {DashboardPage} from '@/pages/dashboard'
import LoginPage from '@/pages/login'
import {MainLayout} from '@/components/layout/main-layout.tsx'
import {HistoriesPage} from '@/pages/histories'
import {DeviceListPage} from '@/pages/devices'
import {UserManagementPage} from '@/pages/users'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />
      },
      {
        path: '/histories',
        element: <HistoriesPage />
      },
      {
        path: '/devices',
        element: <DeviceListPage />
      },
      {
        path: '/users',
        element: <UserManagementPage />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

export function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
