
import { FluentProvider, Spinner, webLightTheme } from '@fluentui/react-components';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./Components";
import AuthLayout from "./Components/AuthLayout/AuthLayout";
import { Dashboard, Login, SignUp } from "./Pages";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { login, logout } from './Store/authSlice';
import authController from './DataProvider/Controllers/AuthController';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <AuthLayout authentication={true}>
          <Dashboard />
        </AuthLayout>
      },
    ]
  },
  {
    path: '/login',
    element: <AuthLayout authentication={false}>
      <Login />
    </AuthLayout>
  },
  {
    path: '/signup',
    element: <AuthLayout authentication={false}>
      <SignUp />
    </AuthLayout>
  }
]);
export default function App() {
  enum Theme {
    Dark = "dark",
    Light = "light"
  }
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(Theme.Light);
  const dispatch = useDispatch();

  const handleTheme = async () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme(Theme.Dark);
    } else {
      setTheme(Theme.Light);
    }
  }

  const initializeAuth = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        const data = await authController.getCurrentUser();

        // Dispatch tokens and user data to Redux
        dispatch(login({
          userdata: {
            _id: data._id,
            displayName: data.displayName,
            username: data.username,
            avatar: data.avatar,
            managerName: data.managerName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            pincode: data.pincode,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          },
          accessToken,
          refreshToken
        }));
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(logout());
      }
    } catch (err) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(logout());

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    initializeAuth();
  }, [dispatch]);

  // for load theme
  useEffect(() => {
    handleTheme();
  })

  return (
    <FluentProvider theme={theme === Theme.Light ? webLightTheme : webLightTheme}>
      {!loading ? (<RouterProvider router={router} />) : <Spinner />}
    </FluentProvider>
  );
}