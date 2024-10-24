import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/Guest/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/SignUp/SignUp";
import UserProfile from "./pages/UserProfile/UserProfile";
import User from "./pages/User/User";
import Layout from "./components/Layout";
import Drawers from "./components/Drawers";
// import NavbarUser from "./components/NavbarAfterLogin/NavbarUser";
import MyFish from "./pages/MyFish/FishAdd";
import MyPond from "./pages/MyPond/MyPond";
import Admin from "./components/Drawers/Admin";
import Shop from "./components/Drawers/Shop";
import Dashboard from "./pages/Admin/Dashboard";
import UserInfo from "./pages/Admin/UserInfo";
import HomeForShop from "./pages/HomeForShop/HomeForShop";
import AddProducts from "./pages/Products/AddProducts/AddProducts";
import ShowProduct from "./pages/Products/ShowProducts/ShowProducts";
import Orders from "./pages/Orders/Orders";
import Revenue from "./pages/Revenue/Revenue"
import Status_Products from "./pages/Status_Products/Status_Products";
import Notification from "./pages/Admin/Notification";
import FishList from "./pages/MyFish/MyFish";
import News from "./pages/News/News";
import Store from "./pages/Store/Product";
import Details from "./pages/Store/Details";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "userhome",
          element: <Drawers />,
          children: [
            { path: "userprofile", element: <UserProfile /> },
            { path: "myfish", element: <MyFish /> },
            { path: "myfishlist", element: <FishList /> },
            { path: "mypond", element: <MyPond /> },
            { path: "store", element: <Store /> },
            { path: "/userhome/store/:id", element: <Details /> },
            { path: "", element: <Navigate to="mypond" replace /> },
          ],
        },
      ],
    },
    { path: "news", element: <News /> },
    {
      path: "admin",
      element: <Admin />,
      children: [
        { path: "userInfo", element: <UserInfo /> },
        { path: "", element: <Navigate to="userInfo" replace /> },
      ],
    },
    {
      path: "/shop",
      element: <Shop />,
      children: [
        { path: "userInfo", element: <UserInfo /> },
        { path: "", element: <Navigate to="userInfo" replace /> },
        { path: "homeForShop", element: <HomeForShop /> },
        { path: "addProducts", element: <AddProducts /> },
        { path: "showProduct", element: <ShowProduct /> },
        { path: "orders", element: <Orders /> },
        { path: "revenue", element: <Revenue /> },
        { path: "status_Products", element: <Status_Products /> },
      ],
    },
  ]);

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <ShowProduct/>
    </>
  );
}

export default App;