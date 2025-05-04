import React, { useState, useEffect } from "react";
import "./teams.scss";

import { Progress } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Divider,
  Tooltip,
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
  Select,
  Space,
  Dropdown
} from "antd";

import { HiUserGroup } from "react-icons/hi2";
import { HiRectangleGroup } from "react-icons/hi2";
import { LiaSchoolSolid } from "react-icons/lia";
import { MdOutlineLocalActivity } from "react-icons/md";
import { LiaHeartbeatSolid } from "react-icons/lia";
import { RiRecycleLine } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { LuSettings2 } from "react-icons/lu";
import { BiDotsVertical } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { BsDiagram2 } from "react-icons/bs";
import { MdOutlineFactCheck } from "react-icons/md";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TbFileExport } from "react-icons/tb";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbSettingsShare } from "react-icons/tb";
import { TbPresentationAnalytics } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlinePencilAlt } from "react-icons/hi";
import ManAvatar from "../../assets/images/manAvatar.png";
import GirlAvatar from "../../assets/images/girlAvatar.png";
import EnvIcon from "../../assets/icons/env1.png";
import HealthIcon from "../../assets/icons/health1.png";
import EdIcon from "../../assets/icons/ed1.png";
import SportIcon from "../../assets/icons/sportCult1.png";

const Teams = () => {
  const [open, setOpen] = useState(false);
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const showDrawer = () => {
    setOpen(true);
    setAddDrawerTitle("NEW TUTOR");
  };

  const onClose = () => {
    setOpen(false);
  };

  const onCloseTeamDetails = () => {
    setShowTeamDetails(false);
    setSelectedTeam(null);
  };

  // Tutors data (move to top)
  const tutors = [
    {
      id: 'A',
      name: 'Mr.Ahmed Ben Soltan',
      email: 'ahmed.bensoltan@polytechnicien.tn',
      specialty: 'Education',
      gender: 'Homme',
    },
    {
      id: 'M',
      name: 'Ms.Maya Trabelsi',
      email: 'maya.trabelsi@polytechnicien.tn',
      specialty: 'Enviroment',
      gender: 'Femme',
    },
    {
      id: 'T',
      name: 'Dr.Tariq Khalladi',
      email: 'tariq.khalladi@polytechnicien.tn',
      specialty: 'Health',
      gender: 'Homme',
    },
    {
      id: 'H',
      name: 'Ms.Hana Bahri',
      email: 'hana.bahri@polytechnicien.tn',
      specialty: 'Culture & Sport',
      gender: 'Femme',
    },
  ];
  const tutorOptions = tutors.map((tutor) => ({
    label: tutor.name,
    value: tutor.id,
    ...tutor,
  }));

  // Form Data
  const [formData, setFormData] = useState({
    selectedMembers: [],
    selectedTheme: null,
    selectedTutor: tutors[0], // Preselect recommended tutor
  });
  const handleChange = (selectedMatricules) => {
    const selected = students.filter((student) =>
      selectedMatricules.includes(student.matricule)
    );
    setFormData((prev) => ({
      ...prev,
      selectedMembers: selected,
    }));
  };

  const handleThemeChange = (theme) => {
    setFormData((prev) => ({
      ...prev,
      selectedTheme: theme,
    }));
  };

  const handleTutorChange = (tutorId) => {
    const selected = tutors.find((t) => t.id === tutorId);
    setFormData((prev) => ({
      ...prev,
      selectedTutor: selected,
    }));
  };

  // Students data
  const students = [
    {
      matricule: "22LBI022",
      name: "Ali Ben Salah",
      email: "ali.bensalah@polytechnicien.tn",
      specialty: "Informatique",
      gender: "Homme",
    },
    {
      matricule: "23LGL012",
      name: "Mariem Ben Ahmed",
      email: "mariem.benahmed@polytechnicien.tn",
      specialty: "Informatique",
      gender: "Femme",
    },
    {
      matricule: "22PREPA015",
      name: "Mohamed Ben Ali",
      email: "mohamed.benali@polytechnicien.tn",
      specialty: "Génie Civil",
      gender: "Homme",
    },
    {
      matricule: "23EA007",
      name: "Fatma Ben Mahmoud",
      email: "fatma.benmahmoud@polytechnicien.tn",
      specialty: "Électro et Auto",
      gender: "Femme",
    },
    {
      matricule: "22BIO010",
      name: "Sami Ben Hassen",
      email: "sami.benhassen@polytechnicien.tn",
      specialty: "Biologie",
      gender: "Homme",
    },
    {
      matricule: "23INFO025",
      name: "Leila Ben Mohamed",
      email: "leila.benmohamed@polytechnicien.tn",
      specialty: "Électromécanique",
      gender: "Femme",
    },
    {
      matricule: "22CIVIL018",
      name: "Ahmed Ben Youssef",
      email: "ahmed.benyoussef@polytechnicien.tn",
      specialty: "Électromécanique",
      gender: "Homme",
    },
  ];
  const options = students.map((student) => ({
    label: student.matricule,
    value: student.matricule,
    ...student,
  }));

  // Theme color mapping
  const themeColors = {
    'Education': '#89c9ff',
    'Environnement': '#afe5a6',
    'Santé': '#f4a850',
    'Culture et Sport': '#b990f5',
  };
  const selectedThemeColor = themeColors[formData.selectedTheme] || '#89c9ff';

  // Move teamsData to state
  const [teamsData, setTeamsData] = useState([
    {
      number: "01",
      theme: "ed",
      date: "Fev 18, 2025",
      groupName: "TEAM-PSC01",
      students: ["A", "K", "S", "Y"],
      tutor: { initial: "A", name: "Mr.Ahmed Ben Soltan", id: 'A' },
      reports: [true, true, false, false],
    },
    {
      number: "02",
      theme: "env",
      date: "Mar 01, 2025",
      groupName: "TEAM-PSC02",
      students: ["L", "M", "N", "Z", "N", "A"],
      tutor: { initial: "M", name: "Ms.Maya Trabelsi", id: 'M' },
      reports: [true, true, true, false],
    },
    {
      number: "03",
      theme: "health",
      date: "Jan 20, 2025",
      groupName: "TEAM-PSC03",
      students: ["T", "B", "C"],
      tutor: { initial: "T", name: "Dr.Tariq Khalladi", id: 'T' },
      reports: [true, true, true, true],
    },
    {
      number: "04",
      theme: "other",
      date: "Avr 12, 2025",
      groupName: "TEAM-PSC04",
      students: ["R", "H", "W", "J", "S", "K", "A"],
      tutor: { initial: "H", name: "Ms.Hana Bahri", id: 'H' },
      reports: [true, false, false, false],
    },
  ]);

  // Add date formatting function
  function formatDate(date) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  }

  function formatDateFR(date) {
    const months = [
      "Jan", "Fev", "Mar", "Avr", "Mai", "Juin",
      "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"
    ];
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const handleSaveTeam = () => {
    if (!formData.selectedTheme || !formData.selectedTutor || formData.selectedMembers.length === 0) {
      message.error("Please fill all required fields.");
      return;
    }
    const newTeamNumber = (teamsData.length + 1).toString().padStart(2, '0');
    let themeKey = 'other';
    if (formData.selectedTheme.toLowerCase().includes('education')) themeKey = 'ed';
    else if (formData.selectedTheme.toLowerCase().includes('environnement')) themeKey = 'env';
    else if (formData.selectedTheme.toLowerCase().includes('santé')) themeKey = 'health';
    const newTeam = {
      number: newTeamNumber,
      theme: themeKey,
      date: formatDateFR(new Date()),
      groupName: `TEAM-PSC${newTeamNumber}`,
      students: formData.selectedMembers.map(m => m.name),
      tutor: {
        initial: formData.selectedTutor.name[0],
        name: formData.selectedTutor.name,
        id: formData.selectedTutor.id
      },
      reports: [false, false, false],
    };
    setTeamsData([...teamsData, newTeam]);
    setFormData({
      selectedMembers: [],
      selectedTheme: null,
      selectedTutor: tutors[0],
    });
    onClose();
    message.success('Team added successfully!');
  };

  const filteredTeams = selectedFilter === 'all'
    ? teamsData
    : teamsData.filter(team => team.theme === selectedFilter);

  return (
    <div className="teams-wrapper">
      <div className="teams-section-top">
        <div className="teams-section-top-nav">
          <div className="teams-s-t-nav-widget">
            <div className="teams-s-t-nav-widget-top">
              <BsDiagram2 />
            </div>
            <div className="teams-s-t-nav-widget-bottom">Assign Tutors</div>
          </div>

          <div className="teams-s-t-nav-widget">
            <div className="teams-s-t-nav-widget-top">
              <IoAnalytics className="teams-analytics-icon" />
            </div>
            <div className="teams-s-t-nav-widget-bottom">Analytics</div>
          </div>

          <div className="teams-s-t-nav-widget-center">
            <Progress
              type="circle"
              percent={75}
              size={76}
              format={() => ""} // <--- Hides the inside text
              className="progress-deadline"
              strokeWidth={5}
              strokeColor={"#45b0ff"}
            />

            <div className="t-s-t-n-w-c-2">
              <span className="days-left-num">10</span>
              <span className="days-left-num">days left</span>
            </div>
          </div>

          <div className="teams-s-t-nav-widget">
            <div className="teams-s-t-nav-widget-top">
              <TbSettingsShare className="teams-settings-icon" />
            </div>
            <div className="teams-s-t-nav-widget-bottom">Teams Settings</div>
          </div>

          <div className="teams-s-t-nav-widget" onClick={showDrawer}>
            <div className="teams-s-t-nav-widget-top">
              <AiOutlineUsergroupAdd className="teams-add-icon" />
            </div>
            <div className="teams-s-t-nav-widget-bottom">New Team</div>
          </div>
        </div>
      </div>
      <div className="teams-section-bottom-wrapper">
        <div className="teams-section-bottom">
          <div className="teams-section-bottom-nav">
            <div className="teams-section-bottom-nav-top">
              <div className="teams-management-title">MANAGE TEAMS</div>
              <div className="number-of-teams-created">
                <TbFileExport className="add-team-icon" />
                {/* <span className="number-teams"> {67}</span> */}
                Export Data
              </div>
            </div>
            <div className="teams-section-bottom-nav-bottom">
              <div className="themes-widgets-wrapper">
                <div className={`widget-wrapper${selectedFilter === 'all' ? ' active' : ''}`} onClick={() => setSelectedFilter('all')}>
                  <HiRectangleGroup className="widget-wrapper-icon-all-grps" />
                  All Teams
                </div>
                <div className={`widget-wrapper ed${selectedFilter === 'ed' ? ' active' : ''}`} onClick={() => setSelectedFilter('ed')}>
                  <LiaSchoolSolid className="widget-wrapper-icon" />
                  Education
                </div>
                <div className={`widget-wrapper env${selectedFilter === 'env' ? ' active' : ''}`} onClick={() => setSelectedFilter('env')}>
                  <RiRecycleLine className="widget-wrapper-icon" /> Enviroment
                </div>
                <div className={`widget-wrapper health${selectedFilter === 'health' ? ' active' : ''}`} onClick={() => setSelectedFilter('health')}>
                  <LiaHeartbeatSolid className="widget-wrapper-icon-health" />
                  Health
                </div>
                <div className={`widget-wrapper other${selectedFilter === 'other' ? ' active' : ''}`} onClick={() => setSelectedFilter('other')}>
                  <MdOutlineLocalActivity className="widget-wrapper-icon" />{" "}
                  Culture & Sport
                </div>
              </div>
              <div className="filter-display-cards-wrapper">
                <LuSettings2 className="filter-icon" />
                <select name="filter" className="filter-select">
                  <option value="">Filter</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <Drawer
            title={null}
            onClose={onClose}
            open={open}
            className="add-new-team-drawer"
            width={430}
            height={200}
          >
            <div className="add-new-team-header"></div>

            <div className="new-team-body-wrapper">
              <div className="new-team-icon-wrapper">
                <div className="new-team-icon"
                  style={{
                    background: selectedThemeColor + '1a', // 1a for ~10% opacity
                    boxShadow: `${selectedThemeColor}2b 0px 0px 0px 1px`,
                    color: selectedThemeColor,
                  }}
                >
                  {/* <QRCode
                    className="new-team-icon-qrcode"
                    value={"fdf"}
                    style={{ borderRadius: "50%" }}
                  /> */}
                  05
                </div>
              </div>
              <div className="new-team-details-container"
                style={{
                  background: selectedThemeColor + '01', // 01 for very light transparency
                  border: `1px solid ${selectedThemeColor}2b`,
                }}
              >
                <div className="new-team-id-wrapper">TEAM ID : TEAM-PSC01</div>

                <div className="new-team-infos-wrapper">
                  <div className="admin-create-team-form">
                    <div className="add-members">
                      <div className="add-members-input-wrapper">
                        <div className="label-wrapper">
                          <div className="text">
                            Select Team Members
                          </div>
                        </div>
                        <div className="input-wrapper">
                          <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Enter student id"
                            onChange={handleChange}
                            options={options}
                            value={formData.selectedMembers.map(
                              (m) => m.matricule
                            )}
                            filterOption={(inputValue, option) =>
                              option.label
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                            }
                            optionRender={(option) => (
                              <Space>{option.data.matricule} </Space>
                            )}
                          />
                        </div>
                      </div>

                      <div className="members-list">
                        {formData.selectedMembers.length > 0 ? (
                          formData.selectedMembers.map((member) => (
                            <div className="member-item" key={member.matricule}>
                              <div className="avatar-name-mail-wrapper">
                                <div className="avatar">
                                  <img
                                    src={
                                      member.gender === "Femme"
                                        ? GirlAvatar
                                        : ManAvatar
                                    }
                                    alt=""
                                    className={
                                      member.gender === "Femme"
                                        ? "GirlAvatar"
                                        : "ManAvatar"
                                    }
                                  />
                                </div>
                                <div className="name-mail">
                                  <div className="fullname">{member.name}</div>
                                  <div className="mail">{member.email}</div>
                                </div>
                              </div>
                              <div className="speciality-wrapper">
                                <div
                                  className={`speciality ${member.specialty
                                    .toLowerCase()
                                    .replace(/\s+/g, "")}`}
                                >
                                  {member.specialty}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <>
                            {[...Array(2)].map((_, index) => (
                              <div className="member-item-skeleton" key={index}>
                                <div className="skeleton-avatar"></div>
                                <div className="skeleton-details">
                                  <div className="skeleton-name"></div>
                                  <div className="skeleton-email"></div>
                                </div>
                                <div className="skeleton-specialty"></div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="select-theme">
                      <div className="label-wrapper">
                        <div className="text">Select Theme</div>
                      </div>

                      <div className="themes-boxes-wrapper">
                        <div className="theme-box">
                          <img src={EdIcon} alt="" className="theme-img ed" />
                          <div className="theme-title">Education</div>
                          <div className="theme-radio">
                            <input
                              type="radio"
                              className="input-radio"
                              checked={formData.selectedTheme === "Education"}
                              onChange={() => handleThemeChange("Education")}
                            />
                          </div>
                        </div>

                        <div className="theme-box">
                          <img
                            src={HealthIcon}
                            alt=""
                            className="theme-img health"
                          />
                          <div className="theme-title">Health</div>
                          <div className="theme-radio">
                            <input
                              type="radio"
                              className="input-radio"
                              checked={formData.selectedTheme === "Santé"}
                              onChange={() => handleThemeChange("Santé")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="themes-boxes-wrapper">
                        <div className="theme-box">
                          <img src={EnvIcon} alt="" className="theme-img env" />
                          <div className="theme-title">Enviroment</div>
                          <div className="theme-radio">
                            <input
                              type="radio"
                              className="input-radio"
                              checked={
                                formData.selectedTheme === "Environnement"
                              }
                              onChange={() =>
                                handleThemeChange("Environnement")
                              }
                            />
                          </div>
                        </div>
                        <div className="theme-box">
                          <img
                            src={SportIcon}
                            alt=""
                            className="theme-img sport"
                          />
                          <div className="theme-title">Culture & Sport</div>
                          <div className="theme-radio">
                            <input
                              type="radio"
                              className="input-radio"
                              checked={
                                formData.selectedTheme === "Culture et Sport"
                              }
                              onChange={() =>
                                handleThemeChange("Culture et Sport")
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="assign-tutor-wrapper">
                      <div className="label-wrapper">
                        <div className="text">Assign Tutor</div>
                      </div>
                      <div className="input-wrapper">
                        <Select
                          key={formData.selectedTutor?.id || 'no-tutor'}
                          style={{ width: "100%" }}
                          placeholder="Select a tutor"
                          options={tutorOptions}
                          value={undefined}
                          onChange={handleTutorChange}
                          optionRender={(option) => {
                            const teamCount = teamsData.filter(team => team.tutor.id === option.data.id).length;
                            return (
                              <Space style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <Avatar shape="square" size={24} style={{ paddingTop: 1, fontWeight: 700, fontSize: 14, backgroundColor: option.data.gender === 'Femme' ? '#fde3cf' : '#f56a00', borderRadius: 6, color: '#fff' }}>
                                    {option.data.name[0]}
                                  </Avatar>
                                  <span style={{ fontSize: 12, fontWeight: 700, color: '#222' }}>{option.data.name}</span>
                                </span>
                                <span style={{ minWidth: 36, textAlign: 'right' }}>
                                  <span className="teams-count-badge" style={{ background: '#eef6f9', color: '#89c9ff', borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>
                                    {teamCount} teams
                                  </span>
                                </span>
                              </Space>
                            );
                          }}
                          dropdownStyle={{ minWidth: 250 }}
                        />
                      </div>
                      {formData.selectedTutor && (
                        <div className="tutor-selected-preview member-item" style={{ marginTop: 10 }}>
                          <div className="avatar-name-mail-wrapper">
                            <div className="avatar">
                              <Avatar shape="square" size={28} style={{ paddingTop: 1, fontWeight: 700, fontSize: 14, backgroundColor: formData.selectedTutor.gender === 'Femme' ? '#fde3cf' : '#f56a00' }}>
                                {formData.selectedTutor.name[0]}
                              </Avatar>
                            </div>
                            <div className="name-mail">
                              <div className="fullname">{formData.selectedTutor.name}</div>
                              <div className="mail">{formData.selectedTutor.email}</div>
                            </div>
                          </div>
                          <div className="speciality-wrapper">
                            {/* <div className="teams-count speciality" style={{ background: '#eaf4ff', color: '#3a8bfd', marginBottom: '4px' }}>
                              {teamsData.filter(team => team.tutor.id === formData.selectedTutor.id).length} teams
                            </div> */}
                            <div className="recommended-badge speciality" >Recommended</div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="new-team-btns-wrapper">
                      <button className="save-team-cancel" onClick={onClose}>Cancel</button>
                      <button className="save-team-save" onClick={handleSaveTeam}>Save Team</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Drawer>

          {/* TEAM DETAILS DRAWER */}

          <Drawer
            title={null}
            onClose={onCloseTeamDetails}
            open={showTeamDetails}
            className="team-details-drawer"
            width={480}
          >
            {selectedTeam && (
              <div className="team-details-modern-wrapper">
                {/* Header Section */}
                <div className="team-details-header-modern">
                  <div className="team-details-header-top">
                    <div className="team-title-status">
                      <h2>{selectedTeam.groupName} <span className="status-badge on-progress">On Progress</span></h2>
                      <div className="team-details-meta">
                        <span className="meta-label">Due date:</span> <span className="meta-value">{selectedTeam.date}</span>
                      </div>
                    </div>
                    <div className="team-details-actions">
                      {/* Placeholder for share/download icons if needed */}
                    </div>
                  </div>
                  <div className="team-details-header-bottom">
                    <div className="assignees">
                      <span className="meta-label">Assignees:</span>
                      <Avatar.Group size="small">
                        <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{selectedTeam.tutor.initial}</Avatar>
                      </Avatar.Group>
                      <span className="assignee-name">{selectedTeam.tutor.name}</span>
                    </div>
                    <div className="team-tags">
                      <span className={`team-tag ${selectedTeam.theme}`}>{selectedTeam.theme}</span>
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="team-details-section">
                  <div className="section-title">Description</div>
                  <div className="section-content">
                    This team is working on a project related to <b>{selectedTeam.theme}</b>. (Add more details here as needed.)
                  </div>
                </div>

                {/* Attachments Section */}
                <div className="team-details-section">
                  <div className="section-title">Attachments</div>
                  <div className="attachments-list">
                    <div className="attachment-item">
                      <span className="attachment-icon">📄</span>
                      <span className="attachment-name">Project Brief.pdf</span>
                      <span className="attachment-size">1.2 MB</span>
                      <a className="attachment-download" href="#">Download</a>
                    </div>
                    <div className="attachment-item">
                      <span className="attachment-icon">🖼️</span>
                      <span className="attachment-name">TeamLogo.png</span>
                      <span className="attachment-size">0.5 MB</span>
                      <a className="attachment-download" href="#">Download</a>
                    </div>
                  </div>
                </div>

                {/* Subtasks Section */}
                <div className="team-details-section">
                  <div className="section-title">Subtasks</div>
                  <div className="subtasks-progress">
                    <Progress percent={Math.round((selectedTeam.reports.filter(Boolean).length / selectedTeam.reports.length) * 100)} size="small" />
                    <span className="progress-text">{selectedTeam.reports.filter(Boolean).length}/{selectedTeam.reports.length} Completed</span>
                  </div>
                  <div className="subtasks-list">
                    {selectedTeam.students.map((student, idx) => (
                      <div className="subtask-item" key={idx}>
                        <input type="checkbox" checked={selectedTeam.reports[idx] || false} readOnly />
                        <span className="subtask-name">Student {student}</span>
                        {selectedTeam.reports[idx] === false && idx === 1 && (
                          <span className="subtask-blocker">Blocker: Waiting for submission</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Drawer>

          <div className="teams-section-bottom-teams-cards-wrapper">
            {filteredTeams.map((team, index) => (
              <div key={index} className="team-card-wrapper">
                <div className="team-card-top">
                  <div className={`team-number-wrapper ${team.theme}`}>
                    {team.number}
                  </div>
                  <div className="team-details-wrapper">
                    <div className="team-details-2">
                      <MdOutlineRadioButtonChecked className="date-icon" />
                      {team.date}
                    </div>
                    <div className="team-details-1">
                      <HiOutlineUserGroup className="team-detail-grp-icon" />
                      {`TEAM-PSC${team.number}`}
                    </div>
                  </div>
                  <div className="team-menu-wrapper">
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 'edit',
                            label: 'Edit Team',
                            icon: <HiOutlinePencilAlt />
                          },
                          {
                            key: 'show',
                            label: 'Show Team Details',
                            icon: <HiOutlineEye />
                          }
                        ],
                        onClick: (e) => {
                          if (e.key === 'show') {
                            setSelectedTeam(team);
                            setShowTeamDetails(true);
                          }
                        }
                      }}
                      trigger={['click']}
                      placement="bottomRight"
                    >
                      <HiDotsVertical className="menu-dots" />
                    </Dropdown>
                  </div>
                </div>
                <div className="team-card-bottom">
                  <div className="team-tutor-members">
                    <div className="members">
                      <div className="label">Students</div>
                      <div className="avatars-wrapper">
                        <Avatar.Group shape="square" size={18}>
                          {team.students.map((student, i) => (
                            <Avatar
                              key={i}
                              style={{
                                backgroundColor:
                                  i % 2 === 0 ? "#fde3cf" : "#f56a00",
                                fontSize: "10px",
                                fontWeight: "700",
                                borderRadius: "4px",
                              }}
                            >
                              {typeof student === 'string' ? student[0] : ''}
                            </Avatar>
                          ))}
                        </Avatar.Group>
                      </div>
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="tutor">
                      <div className="label">Tutor</div>
                      <div className="avatars-wrapper">
                        <Avatar.Group shape="square" size={18}>
                          <Avatar
                            style={{
                              backgroundColor: "#fde3cf",
                              fontSize: "10px",
                              fontWeight: "700",
                              borderRadius: "4px",
                            }}
                          >
                            {team.tutor.initial}
                          </Avatar>
                        </Avatar.Group>
                        <div className="tutor-name">{team.tutor.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="reports-wrapper">
                    <div className="report-title-wrapper">
                      <div className="title">
                        <MdOutlineFactCheck className="report-ticket-icon" />
                        Reports
                      </div>
                      <div className="number">
                        <span>{team.reports.filter(Boolean).length}</span>
                        <span>/</span>
                        <span>3</span>
                      </div>
                    </div>
                    <div className="progresses-wrapper">
                      <Progress
                        steps={3}
                        percent={
                          (team.reports.filter(Boolean).length / 4) * 100
                        }
                        strokeColor={team.reports.map((status) =>
                          status ? "#9cdb89" : "#f0f0f0"
                        )}
                        format={() => ""}
                        className="custom-progress"
                        strokeWidth={5}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
