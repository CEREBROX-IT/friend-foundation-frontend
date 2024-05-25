import { Routes, Route } from "react-router-dom";
import SideBar from "../components/admin-components/admin-sidebar";
import AdminDashboard from "../pages/dashboard/admin-dashboard/admin-dashboard";
const Protected = () => {
  return (
    <div className="flex bg-white min-h-[100vh]">
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div className="relative mx-auto w-full flex flex-row">
              <SideBar />
              <AdminDashboard />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default Protected;
