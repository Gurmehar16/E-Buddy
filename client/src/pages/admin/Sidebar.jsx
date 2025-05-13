import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 dark:bg-[#141414] bg-white  p-5 sticky top-0  h-screen">
        <div className="space-y-4 ">
          <Link to="dashboard" className="flex items-center gap-2 text-gray-800 dark:text-white">
            <ChartNoAxesColumn size={22} className="text-gray-800 dark:text-white" />
            <h1>Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2 text-gray-800 dark:text-white">
            <SquareLibrary size={22} className="text-gray-800 dark:text-white" />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-10 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
