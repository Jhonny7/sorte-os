import AdvancedSearch from "@/views/advancedSearch/AdvancedSearch";
import FAQS from "@/views/faqs/FAQS";
import AddLocation from "@/views/location/addLocation/AddLocation";
import Location from "@/views/location/Location";
import Privacy from "@/views/privacy/Privacy";
import Register from "@/views/register/Register";
import Search from "@/views/search/Search";
import UserType from "@/views/user-type/UserType";
import { Layout, PrivateRoute, PublicRoute } from "common-lib";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("../views/home/Home"));
const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));
const Reports = lazy(() => import("../views/reports/Reports"));
const Login = lazy(() => import("@/views/login/Login"));
const SelectLocation = lazy(
  () => import("@/views/locations/select-location/select-location")
);
const AddAddress = lazy(
  () => import("@/views/locations/add-address/add-address")
);
const CurrentLocation = lazy(
  () => import("@/views/locations/current-location/current-location")
);


export const appRoutes = [
  // Ruta por defecto que redirige a login
  { path: "/", element: <Navigate to="/login" /> },

  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/faqs", element: <FAQS /> },
      { path: "/search", element: <AdvancedSearch /> },
      { path: "/advanced-search", element: <Search /> },
      { path: "/home", element: <Home /> },
      { path: "/choose", element: <UserType /> },
      {
        path: "/addresses", children: [
          { path: "", element: <Location isFull /> },
          { path: "add", element: <AddLocation /> },
        ]
      },
    ]
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout flatMenu={[]} />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/reports",
            element: <Reports />,
          },
          {
            path: "/locations",
            element: <Location />,
          },
          {
            path: "/add-location",
            element: <AddLocation />,
          },
          {
            path: "/select-location",
            element: <SelectLocation />,
          },
          {
            path: "/add-address",
            element: <AddAddress />,
          },
          {
            path: "/current-location",
            element: <CurrentLocation />,
          },
        ],
      },
    ],
  },
  // Fallback para rutas no existentes
  { path: "*", element: <Navigate to="/login" /> },
];
