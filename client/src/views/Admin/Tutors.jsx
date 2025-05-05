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
  Drawer,
  InputNumber,
} from "antd";
import { TiUserAddOutline } from "react-icons/ti";

import { MdOutlineAttachMoney } from "react-icons/md";
import { IoClose } from "react-icons/io5";
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
      // { name: "Team 5", theme: "health" },
      // { name: "Team 8", theme: "env" },
      // { name: "Team 19", theme: "ed" },
      // { name: "Team 27", theme: "other" },
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

import { Select, Tag } from "antd";

const themeOptions = [
  { value: "Education", label: "Education", theme: "ed" },
  { value: "Environnement", label: "Environnement", theme: "env" },
  { value: "Health", label: "Health", theme: "health" },
  { value: "Culture & Sport", label: "Culture & Sport", theme: "other" },
];

const teamOptions = [
  { value: "Team 5", label: "Team 5", theme: "health" },
  { value: "Team 7", label: "Team 7", theme: "other" },
  { value: "Team 8", label: "Team 8", theme: "env" },
];

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // Find the full team object based on the value
  const team = teamOptions.find((team) => team.value === value);
  const teamName = team?.label || value;
  const teamTheme = team?.theme || "";

  return (
    <Tag
      className={`assigned-team-widget ${teamTheme}`}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {teamName}
    </Tag>
  );
};
const themeTagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const themeObj = themeOptions.find((theme) => theme.value === value);
  const themeClass = themeObj?.theme || "";

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      className={`assigned-team-widget ${themeClass}`}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

const Tutors = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [tutors, setTutors] = useState(initialTutorsData);
  const [activeCardId, setActiveCardId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [matricule, setMatricule] = useState("");
  const [gender, setGender] = useState("male");
  const [status, setStatus] = useState(""); // '' | 'permanent' | 'part-time'
  const [selectedThemes, setSelectedThemes] = useState([]);
  const tutorCardRef = useRef(null);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    if (value === "permanent") {
      setSelectedThemes(themeOptions.map(t => t.value));
    } else if (value === "part-time") {
      const shuffled = [...themeOptions].sort(() => 0.5 - Math.random());
      setSelectedThemes([shuffled[0].value, shuffled[1].value]);
    } else {
      setSelectedThemes([]);
    }
  };

  const handleFormSubmit = (values) => {
    const newTutor = {
      ...values,
      id: tutors.length + 1,
      active: false, // Set to false for first creation as requested
      matricule,
      gender,
      status,
      themes: selectedThemes,
      teams: [],
    };
    setTutors(prevTutors => [...prevTutors, newTutor]);
    setIsModalVisible(false);
    form.resetFields();
    setGender("male");
    setStatus("");
    setSelectedThemes([]);
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

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setGender("male");
    setStatus("");
    setSelectedThemes([]);
    setSelectedTeams([]);
    setMatricule("");
  };

  const handleSaveTutor = () => {
    if (!firstName || !lastName || !email || !phone || !status || selectedThemes.length === 0) {
      message.error("Please fill all required fields.");
      return;
    }
    const newTutor = {
      id: tutors.length + 1,
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      status,
      themes: selectedThemes,
      teams: selectedTeams.map(teamValue => {
        const team = teamOptions.find(t => t.value === teamValue);
        return team ? { name: team.label, theme: team.theme } : { name: teamValue, theme: '' };
      }),
      matricule,
      active: false,
    };
    setTutors(prevTutors => [...prevTutors, newTutor]);
    setOpen(false);
    resetForm();
    message.success("Tutor added successfully!");
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
              // onClick={handleAddTutor}
              onClick={showDrawer}
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
                className={`tutor-card-wrapper ${activeCardId === tutor.id ? "overlay-active" : ""
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
                  {tutor.teams && tutor.teams.length > 0 ? (
                    <div className="tutor-teams-wrapper">
                      {tutor.teams.map((team, index) => (
                        <div key={index} className={`assigned-team-widget ${team.theme}`}>
                          {team.name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-teams-yet">No teams assigned yet</div>
                  )}
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

      <Drawer
        title={null}
        onClose={() => { setOpen(false); resetForm(); }}
        open={open}
        className="add-new-tutor-drawer"
        width={350}
        height={200}
      >
        <div className="add-new-tutor-header">
          {/* <div className="close-btn" onClick={onClose}>
            <IoClose />
          </div> */}
        </div>

        <div className="new-tutor-body-wrapper">
          <div className="tutor-icon-wrapper">
            <div className="tutor-icon">
              <QRCode
                className="tutor-icon-qrcode"
                value={"fdf"}
                style={{ borderRadius: "50%" }}
              />
            </div>
          </div>
          <div className="tutor-details-container">
            <div className="tutor-id-wrapper">TUTOR ID : TUT-PSC-01</div>

            <div className="new-tuto-infos-wrapper">
              <div className="form-wrapper">
                <div className="input-wrapper">
                  <div className="input-label">Firstname</div>
                  <div className="input-content">
                    <Input
                      placeholder=""
                      className="input-text-new-tutor"
                      name="firstName"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-wrapper">
                  <div className="input-label">Lastname</div>
                  <div className="input-content">
                    <Input
                      placeholder=""
                      className="input-text-new-tutor"
                      name="lastName"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-wrapper">
                  <div className="input-label">Email</div>
                  <div className="input-content">
                    <Input
                      placeholder=""
                      className="input-text-new-tutor"
                      name="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-wrapper">
                  <div className="input-label">Phone</div>
                  <div className="input-content">
                    <Input
                      placeholder=""
                      className="input-text-new-tutor"
                      name="phone"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-wrapper">
                  <div className="input-label">Status</div>
                  <div className="tutor-status-radio-wrapper">
                    <Radio.Group
                      onChange={handleStatusChange}
                      value={status}
                      className="radio-grp"
                    >
                      <Radio value="part-time">Part-Time</Radio>
                      <Radio value="permanent">Permanent</Radio>
                    </Radio.Group>
                  </div>
                </div>

                <div className="input-wrapper">
                  <div className="input-label">Password</div>
                  <div className="input-content">
                    <Input.Password
                      placeholder=""
                      className="input-text-new-tutor"
                      name="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="assigned-teams-wrapper">
                  <div className="assign-teams-label">Themes</div>
                  <div className="teams-selection-wrapper">
                    <Select
                      mode="multiple"
                      tagRender={themeTagRender}
                      value={selectedThemes}
                      onChange={setSelectedThemes}
                      style={{ width: "100%" }}
                      options={themeOptions}
                      optionFilterProp="label"
                      className="assigned-tutor-teams"
                      maxTagCount={4}
                    />
                  </div>
                </div>

                <div className="assigned-teams-wrapper">
                  <div className="assign-teams-label">Assigned Teams</div>
                  <div className="teams-selection-wrapper">
                    <Select
                      mode="multiple"
                      tagRender={tagRender}
                      value={selectedTeams}
                      onChange={setSelectedTeams}
                      style={{ width: "100%" }}
                      options={teamOptions.map((team) => ({
                        value: team.value, // This is the string value ("Team 5")
                        // label: (
                        //   <div className={`assigned-team-widget ${team.theme}`}>
                        //     {team.label}
                        //   </div>
                        // ),
                        label: team.label,
                        // The theme is included in the team object we'll look up in tagRender
                      }))}
                      optionFilterProp="label"
                      className="assigned-tutor-teams"
                    />

                    {/* <div className="no-teams-yet-wrapper">
                      <div className="no-teams-content">NO TEAMS ASSIGNED</div>
                    </div> */}
                  </div>
                </div>

                {/* <div className="tutor-themes">
                  {selectedThemes.map((theme, idx) => (
                    <span key={idx} className={`assigned-team-widget ${themeOptions.find(t => t.value === theme)?.theme || ''}`}>{theme}</span>
                  ))}
                </div> */}
              </div>
              <div className="new-tutor-btns-wrapper">
                <button className="save-tutor-cancel" onClick={() => { setOpen(false); resetForm(); }}>Cancel</button>
                <button className="save-tutor-save" onClick={handleSaveTutor}>Save Tutor</button>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Tutors;
