import React, { useState } from "react";

import { PiCaretUpDownBold } from "react-icons/pi";
import { AiOutlineDashboard } from "react-icons/ai";
import { PiCalendarStarBold } from "react-icons/pi";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { HiOutlineNewspaper } from "react-icons/hi";
import { TbLayoutDashboard } from "react-icons/tb";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { LuSwatchBook } from "react-icons/lu";
import { LuNotebookTabs } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";

import { useLocation, useNavigate } from "react-router-dom";

import MAINLOGO from "../../assets/images/mainLogo2.png";

const Sidebar = () => {
  const [activeOption, setActiveOption] = useState("Option 1");
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleSelect = (option, path) => {
    setActiveOption(option);
    navigate(path);
    console.log("✅", option);
    setActiveOption(option);
  };
  const options = [
    {
      label: "Dashboard",
      icon: <TbLayoutDashboard />,
      path: "/admin/dashboard",
    },
    { label: "News", icon: <HiOutlineNewspaper />, path: "/admin/news" },
    { label: "Events", icon: <PiCalendarStarBold />, path: "/admin/events" },
    { label: "Students", icon: <PiStudentBold />, path: "/admin/students" },
    { label: "Tutors", icon: <FaChalkboardTeacher />, path: "/admin/tutors" },
    { label: "Teams", icon: <HiUserGroup />, path: "/admin/teams" },
    { label: "Reports", icon: <LuSwatchBook />, path: "/admin/reports" },
  ];

  return (
    <div className="admin_layout_sidebar">
      <div className="admin-layout-sidebar-top">
        <div className="admin-layout-sidebar-top-left-wrapper">
          <div className="admin-layout-sidebar-top-left">
            <img src={MAINLOGO} alt="" />
          </div>
        </div>
        <div className="admin-layout-sidebar-top-center">
          <div className="admin-layout-sidebar-top-center-top">
            <span className="span1">Poly</span>
            <span className="span2">PSC</span>
          </div>
          <div className="admin-layout-sidebar-top-center-bottom">
            <span>Ingénieur oui , Citoyen d'abord !</span>
          </div>
        </div>
        <div className="admin-layout-sidebar-top-right">
          <PiCaretUpDownBold />
        </div>
      </div>
      {/* <div className="admin-layout-sidebar-center">
        <div className="dropdown-menu">
          <div className="group">
            <div className="group-title">Main Menu</div>
            <div
              className={`option ${
                activeOption === "Option 1" ? "active" : ""
              }`}
              onClick={() => handleSelect("Option 1" , "/admin/dashboard")}
            >
              <div className="option-icon">
                <TbLayoutDashboard />
              </div>
              <div className="option-text">Dashboard</div>
            </div>
            <div
              className={`option ${
                activeOption === "Option 2" ? "active" : ""
              }`}
              onClick={() => handleSelect("Option 2" , "/admin/news")}
            >
              <div className="option-icon">
                <HiOutlineNewspaper />
              </div>
              <div className="option-text">News</div>
            </div>
            <div
              className={`option ${
                activeOption === "Option 3" ? "active" : ""
              }`}
              onClick={() => handleSelect("Option 3" , "/admin/events")}
            >
              <div className="option-icon">
                <PiCalendarStarBold />
              </div>
              <div className="option-text">Events</div>
            </div>
          </div>

          <div className="group">
            <div className="group-title">Management</div>
            <div
              className={`option ${
                activeOption === "Option 4" ? "active" : ""
              }`}
              onClick={() => handleSelect("Option 4" , "/admin/students")}
            >
              <div className="option-icon">
                <PiStudentBold />
              </div>
              <div className="option-text">Students</div>
            </div>
            <div
              className={`option ${
                activeOption === "Option 5" ? "active" : ""
              }`}
              onClick={() => handleSelect("Option 5" ,"/admin/tutors")}
            >
              <div className="option-icon">
                <FaChalkboardTeacher />
              </div>
              <div className="option-text">Tutors</div>
            </div>
            <div
              className={`option ${
                activeOption === "Option 6" ? "active" : ""
              }`}
              onClick={() => handleSelect("Option 6" , "/admin/teams")}
            >
              <div className="option-icon">
                <HiUserGroup />
              </div>
              <div className="option-text">Teams</div>
            </div>
            <div
              className={`option ${
                activeOption === "Option 7" ? "active" : ""
              }`}
              onClick={() => handleSelect("Option 7" , "/admin/reports")}
            >
              <div className="option-icon">
                <LuSwatchBook  />
              </div>
              <div className="option-text">Reports</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="admin-layout-sidebar-center">
        <div className="dropdown-menu">
          <div className="group">
            <div className="group-title">Main Menu</div>

            {options.slice(0, 3).map((opt, index) => (
              <div
                key={index}
                className={`option ${currentPath === opt.path ? "active" : ""}`}
                onClick={() => navigate(opt.path)}
              >
                <div className="option-icon">{opt.icon}</div>
                <div className="option-text">{opt.label}</div>
              </div>
            ))}
          </div>

          <div className="group">
            <div className="group-title">Management</div>

            {options.slice(3).map((opt, index) => (
              <div
                key={index}
                className={`option ${currentPath === opt.path ? "active" : ""}`}
                onClick={() => navigate(opt.path)}
              >
                <div className="option-icon">{opt.icon}</div>
                <div className="option-text">{opt.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="admin-layout-sidebar-bottom"></div>
    </div>
  );
};

export default Sidebar;
