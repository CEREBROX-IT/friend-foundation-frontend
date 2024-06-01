import { Routes, Route } from "react-router-dom";
import AdminSideBar from "../components/admin-components/admin-sidebar";
import AdminDashboard from "../pages/dashboard/admin-dashboard/admin-dashboard";
import AdminUserList from "../pages/dashboard/admin-dashboard/admin-userlist";
import AdminDistrictAssignment from "../pages/dashboard/admin-dashboard/admin-district-assignment";
import AdminChurchAssignment from "../pages/dashboard/admin-dashboard/admin-church-assignment";

const Protected = () => {
  return (
    <div className="flex bg-white min-h-[100vh]">
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
              <AdminSideBar />
              <AdminDashboard />
            </div>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
              <AdminSideBar />
              <AdminUserList />
            </div>
          }
        />
        <Route
          path="/dashboard/church-district/district-assignment"
          element={
            <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
              <AdminSideBar />
              <AdminDistrictAssignment />
            </div>
          }
        />
        <Route
          path="/dashboard/church-district/church-assignment"
          element={
            <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
              <AdminSideBar />
              <AdminChurchAssignment />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default Protected;
