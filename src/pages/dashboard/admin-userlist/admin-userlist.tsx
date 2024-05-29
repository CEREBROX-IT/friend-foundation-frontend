import Header from "../../../components/header";
import ListUsersOverview from "../../../components/admin-components/list-users-overview";

const AdminUserList = () => {
  return (
    <div className="relative flex flex-col w-full bg-fourth-light dark:bg-fourth-dark overflow-y-auto ">
      <Header />
      <div className=" w-full h-[200px] bg-primary-light p-4 ">
        <p className="text-sixth-light font-semibold text-[25px]">
          LIST OF USERS
        </p>
      </div>

      <div className="flex-1 w-full px-4 -mt-32 ">
        <div className="bg-white p-4 rounded-[10px] ">
          <button className="bg-fourth-dark py-2 px-7 text-white mb-4 ">
            NEW USER
          </button>
          <div className="bg-sixth-light dark:bg-sixth-dark  shadow-lg rounded-[10px]">
            <ListUsersOverview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;
