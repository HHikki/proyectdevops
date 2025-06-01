import { Routes, Route } from "react-router-dom";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import PostList from "../pages/PostList";
import UserSettings from "../pages/UserSettings";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<PostList />} />
      <Route path="crear" element={<CreatePost />} />
      <Route path="editar/:id" element={<EditPost />} />
      <Route path="posts" element={<PostList />} />
      <Route path="configuracion" element={<UserSettings />} />
    </Routes>
  );
};

export default DashboardRoutes;