import "./App.css";
import Connector from "./layout/Connector";
import { BrowserRouter } from "react-router-dom";
import UserListPage from "./modules/UserPage/UserListPage";
import CreateUserPage from "./modules/UserPage/CreateUserPage";
import EditUserPage from "./modules/UserPage/EditUserPage";
import LoginPage from "./modules/LoginPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router";
import DashboardPage from "./modules/DashboardPage/DashboardPage";
import { useEffect } from "react";
import { authState } from "./store/slice/loginSlice";
import ListAppPage from "./modules/AppPage/ListAppPage";
import CreateAppPage from "./modules/AppPage/CreateAppPage";

function App() {
  const userAuth = useSelector((state) => state.login.isUser);
  console.log("userAuth", userAuth);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(authState());
  // }, []);

  // useEffect(() => {
  //   userAuth && localStorage.getItem("id");
  //   console.log("id", localStorage.getItem("id"));
  // }, []);

  const routing = useRoutes([
    {
      path: "/",
      element: !userAuth ? <LoginPage /> : <Navigate to="/dashboard" />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "/", element: <Navigate to="/login" /> },
      ],
    },
    {
      path: "/",
      element: userAuth ? <Connector /> : <Navigate to="/login" />,
      children: [
        { path: "dashboard", element: <DashboardPage /> },
        { path: "users", element: <UserListPage /> },
        { path: "create-user", element: <CreateUserPage /> },
        { path: "users/edit-user/:i", element: <EditUserPage /> },

        { path: "applications", element: <ListAppPage /> },
        { path: "create-application", element: <CreateAppPage /> },
      ],
    },
  ]);

  return <>{routing}</>;

  // if (!userAuth) {
  //   return (
  //     <Routes>
  //       <Route path="/" element={<LoginPage />} />
  //     </Routes>
  //   );
  // }

  // return (
  //   <BrowserRouter>
  //     {/* <Route path="/" element={<LoginPage />} /> */}
  //     {!userAuth && (
  //       <Routes>
  //         <Route path="/" element={<LoginPage />} />
  //       </Routes>
  //     )}
  //     <Connector />
  //     <div className="route_child">
  //       <Routes>
  //         <Route path="/" index element={<UserListPage />} />
  //         <Route path="/users" element={<UserListPage />} />
  //         <Route path="/create-user" element={<CreateUserPage />} />
  //         <Route path="users/edit-user/:i" element={<EditUserPage />} />
  //       </Routes>
  //     </div>
  //   </BrowserRouter>
  // );
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
