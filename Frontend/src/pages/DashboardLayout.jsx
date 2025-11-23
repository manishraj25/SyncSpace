import Dashboard from "./Dashboard";
import Home from "./Home";
import Workspaces from "./WorkSpaces";
import Todo from "./Todo";
import Notifications from "./Notifications";
import Profile from "./Profile";
import { Route, Routes } from "react-router-dom";

const DashboardLayout = () => {

    return(
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/workspaces" element={<Workspaces />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};

export default DashboardLayout;