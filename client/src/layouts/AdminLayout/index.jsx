import React, { useState } from "react";
import "./adminLayout.scss";
import Header from "./Header";
import Sidebar from "./Sidebar";

import PSCLOGO from "../../assets/images/mainLogo2.png";
import DRIVEICON from "../../assets/icons/driveIcon.png";
import WEBSITEICON from "../../assets/icons/websiteIcon2.png";

const MainLayout = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };
  const isTeamsPage = location.pathname === "/admin/teams";

  return (
    <>
      <div className="admin_layout_container">
        <div className="admin_layout_spaces_section">
          <div className="space-item-wrapper psc-space active">
            <div className="space-item ">
              <img src={PSCLOGO} alt="" className="psc-icon" />
            </div>
          </div>

          <div className="space-item-wrapper drive-space">
            <div className="space-item ">
              <img src={DRIVEICON} alt="" className="drive-icon" />
            </div>
          </div>

          <div className="space-item-wrapper polytech-space">
            <div className="space-item ">
              <img src={WEBSITEICON} alt="" className="polyWebsite-icon" />
            </div>
          </div>
        </div>
        <Sidebar />
        <div className="admin_layout_full_page_container_1">
          <div className="admin_layout_full_page_container_2">
            {/* <Header /> */}
            {!isTeamsPage && <Header />}

            <div className="admin_layout_full_page_wrapper">
              {React.cloneElement(children, { onViewProfile: toggleSidebar })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
