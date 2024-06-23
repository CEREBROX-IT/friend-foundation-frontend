import { Routes, Route } from "react-router-dom";
import AdminSideBar from "../components/admin-components/admin-sidebar";
import AdminDashboard from "../pages/dashboard/admin-dashboard/admin-dashboard";
import AdminUserList from "../pages/dashboard/admin-dashboard/admin-userlist";
import AdminDistrictAssignment from "../pages/dashboard/admin-dashboard/admin-district-assignment";
import AdminChurchAssignment from "../pages/dashboard/admin-dashboard/admin-church-assignment";
import AdminAssignmentLogs from "../pages/dashboard/admin-dashboard/admin-assignment-logs";
import AdminNotificationLogs from "../pages/dashboard/admin-dashboard/admin-notification-logs";
import AdminFormManagement from "../pages/dashboard/admin-dashboard/admin-form-management";
import { FC } from "react";
import HeadDistrictSidebar from "../components/head-district-components/head-district-sidebar";
import HeadDistrictDashboard from "../pages/dashboard/head-district-dashboard/head-district-dashboard";
import HeadDistrictChurchList from "../pages/dashboard/head-district-dashboard/head-district-church-list";
import HeadDistrictFormSubmission from "../pages/dashboard/head-district-dashboard/head-district-form-submission";
import UserProfile from "../components/user-profile";
import PendingLandingPage from "../components/pending-landing-page";
import Header from "../components/header";
import UnAssginedSidebar from "../components/unassigned-components/unassigned-sidebar";
import UnassignedDashboard from "../pages/dashboard/unassigned-dashboard/unassigned-dashboard";
import PastorDashboard from "../pages/dashboard/pastor-dashboard/pastor-dashboard";
import PastorSideBar from "../components/head-pastor-components/pastor-sidebar";
import PastorFormSubmission from "../pages/dashboard/pastor-dashboard/pastor-form-submission";
interface RoleProps {
  role?: string;
}
const Protected: FC<RoleProps> = ({ role }) => {
  return (
    <>
      {role === "Admin" && (
        <>
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
              <Route
                path="/dashboard/church-district/assignment-logs"
                element={
                  <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
                    <AdminSideBar />
                    <AdminAssignmentLogs />
                  </div>
                }
              />

              <Route
                path="/dashboard/analytic-alert/notification"
                element={
                  <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
                    <AdminSideBar />
                    <AdminNotificationLogs />
                  </div>
                }
              />

              <Route
                path="/dashboard/forms-management"
                element={
                  <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
                    <AdminSideBar />
                    <AdminFormManagement />
                  </div>
                }
              />
              <Route
                path="/user-profile"
                element={
                  <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
                    <AdminSideBar />
                    <UserProfile />
                  </div>
                }
              />
            </Routes>
          </div>
        </>
      )}
      {role === "Head District" && (
        <>
          <div className="flex bg-white min-h-[100vh]">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
                    <HeadDistrictSidebar />
                    <HeadDistrictDashboard />
                  </div>
                }
              />
              <Route
                path="/dashboard/church-list"
                element={
                  <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
                    <HeadDistrictSidebar />
                    <HeadDistrictChurchList />
                  </div>
                }
              />
              <Route
                path="/dashboard/form-submission"
                element={
                  <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
                    <HeadDistrictSidebar />
                    <HeadDistrictFormSubmission />
                  </div>
                }
              />
            </Routes>
          </div>
        </>
      )}
      {role === "Pending" && (
        <>
          <div className="flex flex-col bg-white min-h-[100vh]">
            <Header />
            <PendingLandingPage />
          </div>
        </>
      )}
      {role === "Unassign" && (
        <div className="flex bg-white min-h-[100vh]">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
                  <UnAssginedSidebar />
                  <UnassignedDashboard />
                </div>
              }
            />
          </Routes>
        </div>
      )}
      {role === "Head Pastor" && (
        <div className="flex bg-white min-h-[100vh]">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
                  <PastorSideBar />
                  <PastorDashboard />
                </div>
              }
            />
            <Route
              path="/form-submission"
              element={
                <div className="relative mx-auto w-full flex flex-row custom-scrollbar">
                  <PastorSideBar />
                  <PastorFormSubmission />
                </div>
              }
            />
          </Routes>
        </div>
      )}
    </>
  );
};

export default Protected;
