import { Routes, Route } from "react-router-dom";
import SideBar from "../components/admin-sidebar";
import AdminDashboard from "../pages/dashboard/admin-dashboard/admin-dashboard";
const Protected = () => {
  return (
    <div className="parent-container flex flec-col bg-fourth-light">
      <Routes>
        <Route
          path="/dashboard"
          element={
            <>
              <SideBar />
              <AdminDashboard />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default Protected;
