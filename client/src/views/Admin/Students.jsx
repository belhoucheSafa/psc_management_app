import React, { useRef, useState } from "react";
import { Table, Tag, QRCode, message, Popconfirm } from "antd";
import "./students.scss";
import { createStyles } from "antd-style";
import { keyframes } from "@emotion/react";

import * as XLSX from "xlsx";
import Papa from "papaparse";

import { TbCloudUpload } from "react-icons/tb";

import STUDENTICON from "../../assets/icons/studentIcon.png";
import IMPORTINGLOADINGVD from "../../assets/videos/LoadingImportVd2.mov";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    // transform: translateY(30px);
  }
  to {
    opacity: 1;
    // transform: translateY(0);
  }
`;

const useStyle = createStyles(({ css }) => ({
  customTable: css`
    .ant-table-container {
      animation: ${fadeInUp} 0.6s ease-out;

      .ant-table-body {
        scrollbar-width: thin;
        scrollbar-color: #eaeaea transparent;
        overflow-y: auto !important;
      }
    }
  `,
}));

const specialityColors = {
  Informatique: "#93cfff",
  "Génie Civil": "#b3a395",
  "Électro et Auto": "#c8c8c8",
  Biologie: "#c9efbc",
  Électromécanique: "#f8d98e",
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 50,
    align: "center",
    render: (id) => <QRCode value={id} size={30} bordered={false} />,
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
    width: 160,
    render: (_, { firstName, lastName }) => {
      const capitalize = (str) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

      return <span>{`${capitalize(firstName)} ${capitalize(lastName)}`}</span>;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 260,
    render: (_, { firstName, lastName }) =>
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@polytechnicien.tn`,
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
    width: 115,
    align: "center",
    render: (phone) => {
      const phoneStr = phone?.toString() ?? "";
      return phoneStr.startsWith("216") ? phoneStr.slice(3) : phoneStr;
    },
  },
  {
    title: "Speciality",
    dataIndex: "speciality",
    key: "speciality",
    width: 120,
    render: (speciality) => (
      <Tag color={specialityColors[speciality] || "default"}>{speciality}</Tag>
    ),
  },
  {
    title: "Team",
    dataIndex: "team",
    key: "team",
    align: "center",
    width: 100,
    render: (team) =>
      team ? (
        <Tag color="#bee998" className="student-table-team has-team">
          {team}
        </Tag> // green pastel
      ) : (
        <Tag color="#f69894" className="student-table-team">
          NO TEAM
        </Tag> // red pastel
      ),
  },
];
const initialData = [
  {
    key: "1",
    id: "22LBI001",
    firstName: "safa",
    lastName: "Belhouche",
    phone: "22222222",
    speciality: "Informatique",
    team: "TEAM01",
  },
  {
    key: "2",
    id: "22LBI002",
    firstName: "ali",
    lastName: "BenSalah",
    phone: "22222222",
    speciality: "Biologie",
    team: null,
  },
  {
    key: "3",
    id: "22LBI003",
    firstName: "lina",
    lastName: "Mbarek",
    phone: "22222222",
    speciality: "Électro et Auto",
    team: "TEAM12",
  },
  {
    key: "4",
    id: "22LBI004",
    firstName: "yassine",
    lastName: "Masmoudi",
    phone: "22222222",
    speciality: "Génie Civil",
    team: null,
  },
  {
    key: "5",
    id: "22LBI005",
    firstName: "asma",
    lastName: "Chatti",
    phone: "22222222",
    speciality: "Électromécanique",
    team: "TEAM09",
  },
];

const Students = () => {
  const { styles } = useStyle();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const isExcel = file.name.endsWith(".xlsx") || file.name.endsWith(".xls");

    const parseFile = () => {
      return new Promise((resolve, reject) => {
        if (isExcel) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: "binary" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            resolve(jsonData);
          };
          reader.onerror = reject;
          reader.readAsBinaryString(file);
        } else {
          Papa.parse(file, {
            header: true,
            complete: (results) => resolve(results.data),
            error: reject,
          });
        }
      });
    };

    parseFile().then((parsedData) => {
      setTimeout(() => {
        const formatted = parsedData.map((item, index) => ({
          key: index + 1,
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          phone: item.phone,
          speciality: item.speciality,
          team: null,
        }));

        setData(formatted);
        setLoading(false);
        message.success("Students list updated.");
      }, 10000);
    });
  };

  return (
    <div className="students-list-wrapper">
      <input
        type="file"
        accept=".csv, .xlsx"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      <div className="students-list-layout-1">
        <div className="students-list-layout-1-top">
          <div className="students-list-layout-1-top-left">
            <div className="badge"></div>
            <div className="icon">
              <img src={STUDENTICON} alt="" />
            </div>
            <div className="title">STUDENTS LIST</div>
          </div>

          <Popconfirm
            placement="bottomRight"
            title="Are you sure you want to overwrite the student list?"
            description="This will replace all current students. Proceed?"
            onConfirm={() => {
              setTimeout(() => {
                fileInputRef.current.click();
              }, 0);
            }}
            okText="Yes"
            cancelText="No"
          >
            <div className="students-list-layout-1-top-right">
              <div className="import-student-list-button">
                <div className="icon">
                  <TbCloudUpload />
                </div>
                <div className="text">IMPORT STUDENTS LIST</div>
              </div>
            </div>
          </Popconfirm>
        </div>

        <div className="students-list-layout-1-bottom">
          {loading ? (
            <div className="importing-loading-video">
              <div className="video-wrapper">
                <video src={IMPORTINGLOADINGVD} autoPlay loop muted />
              </div>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 50 }}
              className={styles.customTable}
              scroll={{ y: 300 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
