import React, { useRef, useState } from "react";
import { Table, Tag, QRCode, message, Popconfirm } from "antd";
import "./tutors.scss";
import { createStyles } from "antd-style";
import { keyframes } from "@emotion/react";

import * as XLSX from "xlsx";
import Papa from "papaparse";

import { TbCloudUpload } from "react-icons/tb";

import TUTORTICON from "../../assets/icons/tutorIcon.png";
import IMPORTINGLOADINGVD from "../../assets/videos/LoadingImportVd2.mov";
import { TiUserAddOutline } from "react-icons/ti";

const Tutors = () => {
  

  return (
    <div className="tutors-list-wrapper">

      <div className="tutors-list-layout-1">
        <div className="tutors-list-layout-1-top">
          <div className="tutors-list-layout-1-top-left">
            <div className="badge"></div>
            <div className="icon">
              <img src={TUTORTICON} alt="" />
            </div>
            <div className="title">MANAGE TUTORS</div>
          </div>

            <div className="tutors-list-layout-1-top-right">
              <div className="import-student-list-button">
                <div className="icon">
                  <TiUserAddOutline />
                </div>
                <div className="text">ADD NEW TUTOR</div>
              </div>
            </div>
         
        </div>

        <div className="tutors-list-layout-1-bottom">
          
        </div>
      </div>
    </div>
  );
}

export default Tutors