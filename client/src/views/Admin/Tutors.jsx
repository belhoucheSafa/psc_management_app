import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Input,
  Form,
  Radio,
  Button,
  Switch,
  QRCode,
  message,
} from "antd";
import { TiUserAddOutline } from "react-icons/ti";
import { AiOutlineUserDelete, AiOutlineReload } from "react-icons/ai";
import { LiaUserEditSolid } from "react-icons/lia";
import "./tutors.scss";
import TUTORTICON from "../../assets/icons/tutorIcon.png";

let matriculeCounter = 1; // This will track the matricule numbering starting from 001

const initialTutorsData = [
  {
    id: 1,
    firstName: "Naceur",
    lastName: "Ben Ali",
    phone: "73210210",
    gender: "male",
    matricule: "TUT-PSC-001",
    teams: [
      { name: "Team 23", theme: "ed" },
      { name: "Team 45", theme: "env" },
      { name: "Team 17", theme: "health" },
    ],
    active: true,
  },
  {
    id: 2,
    firstName: "Aya",
    lastName: "Zouari",
    phone: "72661120",
    gender: "female",
    matricule: "TUT-PSC-002",
    teams: [
      { name: "Team 31", theme: "other" },
      { name: "Team 12", theme: "ed" },
    ],
    active: false,
  },
  {
    id: 3,
    firstName: "Amine",
    lastName: "Khedhir",
    phone: "73124578",
    gender: "male",
    matricule: "TUT-PSC-003",
    teams: [
      { name: "Team 5", theme: "health" },
      { name: "Team 8", theme: "env" },
      { name: "Team 19", theme: "ed" },
      { name: "Team 27", theme: "other" },
    ],
    active: true,
  },
  {
    id: 4,
    firstName: "Sara",
    lastName: "Mnassri",
    phone: "73542210",
    gender: "female",
    matricule: "TUT-PSC-004",
    teams: [
      { name: "Team 22", theme: "env" },
      { name: "Team 14", theme: "health" },
    ],
    active: true,
  },
  {
    id: 5,
    firstName: "Walid",
    lastName: "Gharbi",
    phone: "73882211",
    gender: "male",
    matricule: "TUT-PSC-005",
    teams: [
      { name: "Team 7", theme: "other" },
      { name: "Team 11", theme: "ed" },
      { name: "Team 29", theme: "env" },
    ],
    active: false,
  },
];

const Tutors = () => {
  const [tutors, setTutors] = useState(initialTutorsData);
  const [activeCardId, setActiveCardId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [matricule, setMatricule] = useState("");
  const [gender, setGender] = useState("male");
  const tutorCardRef = useRef(null);

  // Close overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tutorCardRef.current &&
        !tutorCardRef.current.contains(event.target)
      ) {
        setActiveCardId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = (id) => {
    setTutors((prevTutors) => prevTutors.filter((tutor) => tutor.id !== id));
    setActiveCardId(null); // hide overlay after delete
  };

  const handleAddTutor = () => {
    setIsModalVisible(true);
    generateMatricule(); // Generate new matricule when opening modal
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const validatePhoneNumber = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please input phone number"));
    }
    if (!/^[2-57]\d{7}$/.test(value)) {
      return Promise.reject(
        new Error("Phone must be 8 digits starting with 2,3,4,5 or 7")
      );
    }
    return Promise.resolve();
  };

  const handleFormSubmit = (values) => {
    const newTutor = {
      ...values,
      id: tutors.length + 1,
      active: false, // Set to false for first creation as requested
      matricule,
      gender,
      teams: [],
    };

    setTutors((prevTutors) => [...prevTutors, newTutor]);
    setIsModalVisible(false);
    form.resetFields();
    message.success("Tutor added successfully!");
  };

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-8); // generates an 8-character random password
    form.setFieldsValue({ password });
  };

  const generateMatricule = () => {
    // Find the highest existing matricule number
    const highestMatricule = tutors.reduce((max, tutor) => {
      const num = parseInt(tutor.matricule.split("-")[2]);
      return num > max ? num : max;
    }, 0);

    // Set counter to highest + 1
    matriculeCounter = highestMatricule + 1;

    const newMatricule = `TUT-PSC-${String(matriculeCounter).padStart(3, "0")}`;
    setMatricule(newMatricule);
  };
  const tutorCardRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideAllCards = Object.values(tutorCardRefs.current).every(
        (ref) => ref && !ref.contains(event.target)
      );

      if (clickedOutsideAllCards) {
        setActiveCardId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleActiveStatus = (id, checked, e) => {
    e.stopPropagation(); // Stop the event from bubbling up to the card
    setTutors((prevTutors) =>
      prevTutors.map((tutor) =>
        tutor.id === id ? { ...tutor, active: checked } : tutor
      )
    );
  };

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
            <div
              className="import-student-list-button"
              onClick={handleAddTutor}
            >
              <div className="icon">
                <TiUserAddOutline />
              </div>
              <div className="text">ADD NEW TUTOR</div>
            </div>
          </div>
        </div>

        <div className="tutors-list-layout-1-bottom" ref={tutorCardRef}>
          {tutors && tutors.length > 0 ? (
            tutors.map((tutor) => (
              <div
                key={tutor.id}
                ref={(el) => (tutorCardRefs.current[tutor.id] = el)}
                className={`tutor-card-wrapper ${
                  activeCardId === tutor.id ? "overlay-active" : ""
                }`}
                onClick={() => setActiveCardId(tutor.id)}
              >
                <div className="tutor-card-top">
                  <div className="avatar-wrapper">
                    <QRCode
                      value={tutor.matricule || "-"}
                      className="tutor-qrcode"
                      size={80}
                    />
                  </div>

                  <div className="tutor-details-wrapper">
                    <div className="tutor-name">
                      <span>{tutor.gender === "male" ? "Mr." : "Ms."}</span>{" "}
                      {tutor.firstName} {tutor.lastName}
                    </div>

                    <div className="tutor-phone">
                      <span>PHONE: </span> {tutor.phone}
                    </div>
                  </div>

                  <div className="tutor-status-toggle-wrapper">
                    <Switch
                      size="small"
                      checked={tutor.active}
                      onChange={(checked, e) =>
                        toggleActiveStatus(tutor.id, checked, e)
                      }
                    />
                  </div>
                </div>

                <div className="tutor-card-bottom">
                  <div className="tutor-teams-wrapper">
                    {tutor.teams && tutor.teams.length > 0 ? (
                      tutor.teams.map((team, index) => (
                        <div
                          key={index}
                          className={`assigned-team-widget ${team.theme}`}
                        >
                          {team.name}
                        </div>
                      ))
                    ) : (
                      <div className="no-teams-yet">No teams assigned yet</div>
                    )}
                  </div>
                </div>

                {activeCardId === tutor.id && (
                  <div className="tutor-card-overlay">
                    <button className="action-button edit">
                      <LiaUserEditSolid className="edit-icon" />
                      Edit
                    </button>
                    <button
                      className="action-button delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(tutor.id);
                      }}
                    >
                      <AiOutlineUserDelete className="delete-icon" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No tutors available.</div>
          )}
        </div>
      </div>

      <Modal
        title="Add New Tutor"
        open={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}
        centered
        destroyOnClose
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <div className="add-new-admin-form-wrapper">
            <div className="leftside">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "Please input first name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please input last name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Please select gender" }]}
              >
                <Radio.Group
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              </Form.Item>
            </div>

            <div className="rightside">
              <Form.Item name="matricule" label="Matricule">
                <Input
                  value={matricule}
                  readOnly
                  addonAfter={
                    <QRCode
                      value={matricule}
                      size={40}
                      style={{ marginLeft: 8 }}
                    />
                  }
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please input phone number" },
                  { validator: validatePhoneNumber },
                ]}
              >
                <Input maxLength={8} />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please input password" }]}
              >
                <Input.Password
                  addonAfter={
                    <Button
                      type="text"
                      icon={<AiOutlineReload />}
                      onClick={generatePassword}
                      style={{ height: "100%" }}
                    />
                  }
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add Tutor
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Tutors;
