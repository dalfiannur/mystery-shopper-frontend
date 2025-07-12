import "./index.css";
import {createBrowserRouter, RouterProvider} from 'react-router'
import DashboardPage from '@/pages/dashboard'
import LoginPage from '@/pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />
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
