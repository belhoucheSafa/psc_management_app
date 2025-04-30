import React from "react";
import "./teams.scss";

import { Progress } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Tooltip } from "antd";

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

const teamsData = [
  {
    number: "01",
    theme: "ed",
    date: "Fev 18, 2025",
    groupName: "TEAM-PSC01",
    students: ["A", "K", "S", "Y"],
    tutor: { initial: "A", name: "Mr.Ahmed Ben Soltan" },
    reports: [true, true, false, false], 
  },
  {
    number: "02",
    theme: "env",
    date: "Mar 01, 2025",
    groupName: "TEAM-PSC02",
    students: ["L", "M", "N", "Z" , "N" , "A"],
    tutor: { initial: "M", name: "Ms.Maya Trabelsi" },
    reports: [true, true, true, false], 
  },
  {
    number: "03",
    theme: "health",
    date: "Jan 20, 2025",
    groupName: "TEAM-PSC03",
    students: ["T", "B", "C"],
    tutor: { initial: "T", name: "Dr.Tariq Khalladi" },
    reports: [true, true, true, true], 
  },
  {
    number: "04",
    theme: "other",
    date: "Avr 12, 2025",
    groupName: "TEAM-PSC04",
    students: ["R", "H", "W", "J" , "S" , "K" , "A"],
    tutor: { initial: "H", name: "Ms.Hana Bahri" },
    reports: [true, false, false, false], 
  },
];

const Teams = () => {
  return (
    <div className="teams-wrapper">
      <div className="teams-section-top">
        <div className="teams-section-top-nav">
          <div className="teams-s-t-nav-widget">
            <div className="teams-s-t-nav-widget-top">
              <BsDiagram2 />
            </div>
            <div className="teams-s-t-nav-widget-bottom">widget</div>
          </div>

          <div className="teams-s-t-nav-widget">
            <div className="teams-s-t-nav-widget-top">
              <BsDiagram2 />
            </div>
            <div className="teams-s-t-nav-widget-bottom">widget</div>
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

            <div className="t-s-t-n-w-c-2"></div>
          </div>

          <div className="teams-s-t-nav-widget">
            <div className="teams-s-t-nav-widget-top">
              <BsDiagram2 />
            </div>
            <div className="teams-s-t-nav-widget-bottom">widget</div>
          </div>

          <div className="teams-s-t-nav-widget">
            <div className="teams-s-t-nav-widget-top">
              <BsDiagram2 />
            </div>
            <div className="teams-s-t-nav-widget-bottom">widget</div>
          </div>
        </div>
      </div>
      <div className="teams-section-bottom-wrapper">
        <div className="teams-section-bottom">
          <div className="teams-section-bottom-nav">
            <div className="teams-section-bottom-nav-top">
              <div className="teams-management-title">MANAGE TEAMS</div>
              <div className="teams-add-button">
                <HiUserGroup className="add-team-icon" />
                New Team
              </div>
            </div>
            <div className="teams-section-bottom-nav-bottom">
              <div className="themes-widgets-wrapper">
                <div className="widget-wrapper active">
                  <HiRectangleGroup className="widget-wrapper-icon-all-grps" />
                  All Teams
                </div>
                <div className="widget-wrapper ed">
                  <LiaSchoolSolid className="widget-wrapper-icon" />
                  Education
                </div>
                <div className="widget-wrapper env">
                  <RiRecycleLine className="widget-wrapper-icon" /> Enviroment
                </div>
                <div className="widget-wrapper health">
                  <LiaHeartbeatSolid className="widget-wrapper-icon-health" />
                  Health
                </div>
                <div className="widget-wrapper other">
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

          <div className="teams-section-bottom-teams-cards-wrapper">
            {teamsData.map((team, index) => (
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
                    <HiDotsVertical className="menu-dots" />
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
                              {student}
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
                        <span>4</span>
                      </div>
                    </div>
                    <div className="progresses-wrapper">
                      <Progress
                        steps={4}
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
