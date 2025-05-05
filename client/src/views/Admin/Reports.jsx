import React, { useState } from "react";
import { Tabs, Tag, Button, Card, Statistic, Row, Col, message } from "antd";
import { FilePdfOutlined, FileTextOutlined, VideoCameraOutlined, CheckCircleTwoTone, CloseCircleTwoTone, ClockCircleOutlined } from "@ant-design/icons";
import "./reports.scss";

const themes = [
  { name: "Education", key: "ed", color: "#eaf4ff" },
  { name: "Environnement", key: "env", color: "#e6f7e6" },
  { name: "Health", key: "health", color: "#fff6e6" },
  { name: "Culture & Sport", key: "other", color: "#f3eaff" },
];

const reportTypes = [
  { key: "article", label: "Article", icon: <FileTextOutlined /> },
  { key: "affiche", label: "Affiche", icon: <FilePdfOutlined /> },
  { key: "video", label: "Vidéo", icon: <VideoCameraOutlined /> },
];

// Generate fake data
const fakeTeams = [
  {
    id: 1,
    name: "Team 23",
    theme: "ed",
    reports: [
      { type: "article", file: "article_team23.pdf", status: "approved", date: "2024-05-01" },
      { type: "affiche", file: "affiche_team23.pdf", status: "pending", date: "2024-05-02" },
      { type: "video", file: "video_team23.mp4", status: "rejected", date: "2024-05-03" },
    ],
  },
  {
    id: 2,
    name: "Team 45",
    theme: "env",
    reports: [
      { type: "article", file: "article_team45.pdf", status: "pending", date: "2024-05-01" },
      { type: "affiche", file: "affiche_team45.pdf", status: "approved", date: "2024-05-02" },
      { type: "video", file: "video_team45.mp4", status: "pending", date: "2024-05-03" },
    ],
  },
  {
    id: 3,
    name: "Team 12",
    theme: "health",
    reports: [
      { type: "article", file: "article_team12.pdf", status: "rejected", date: "2024-05-01" },
      { type: "affiche", file: "affiche_team12.pdf", status: "approved", date: "2024-05-02" },
      { type: "video", file: "video_team12.mp4", status: "approved", date: "2024-05-03" },
    ],
  },
  {
    id: 4,
    name: "Team 31",
    theme: "other",
    reports: [
      { type: "article", file: "article_team31.pdf", status: "pending", date: "2024-05-01" },
      { type: "affiche", file: "affiche_team31.pdf", status: "pending", date: "2024-05-02" },
      { type: "video", file: "video_team31.mp4", status: "pending", date: "2024-05-03" },
    ],
  },
];

const statusIcons = {
  approved: <CheckCircleTwoTone twoToneColor="#52c41a" />,
  rejected: <CloseCircleTwoTone twoToneColor="#ff4d4f" />,
  pending: <ClockCircleOutlined style={{ color: '#faad14' }} />,
};

const Reports = () => {
  const [teams, setTeams] = useState(fakeTeams);
  const [view, setView] = useState("type");

  // Analytics
  const allReports = teams.flatMap(team => team.reports.map(r => ({ ...r, team: team.name, theme: team.theme })));
  const total = allReports.length;
  const approved = allReports.filter(r => r.status === "approved").length;
  const rejected = allReports.filter(r => r.status === "rejected").length;
  const pending = allReports.filter(r => r.status === "pending").length;

  // Approve/Reject handlers
  const updateReportStatus = (teamId, type, newStatus) => {
    setTeams(prev => prev.map(team =>
      team.id === teamId
        ? {
            ...team,
            reports: team.reports.map(r =>
              r.type === type ? { ...r, status: newStatus } : r
            ),
          }
        : team
    ));
    message.success(`Report ${newStatus}`);
  };

  // By Type View
  const renderByType = () => (
    <div className="reports-by-type">
      {reportTypes.map(rt => (
        <Card key={rt.key} title={<span>{rt.icon} {rt.label}</span>} className="report-type-card">
          {allReports.filter(r => r.type === rt.key).length === 0 ? (
            <div className="no-reports">No reports</div>
          ) : (
            allReports.filter(r => r.type === rt.key).map((r, idx) => (
              <div key={idx} className="report-row">
                <Tag color={themes.find(t => t.key === r.theme)?.color || "#eee"}>
                  {r.team}
                </Tag>
                <span className="report-file">{r.file}</span>
                <span className="report-status">
                  {statusIcons[r.status]} <span className={`status-text ${r.status}`}>{r.status}</span>
                </span>
                <span className="report-date">{r.date}</span>
                {r.status === "pending" && (
                  <>
                    <Button size="small" type="primary" onClick={() => updateReportStatus(teams.find(t => t.name === r.team).id, r.type, "approved")}>Approve</Button>
                    <Button size="small" danger style={{ marginLeft: 8 }} onClick={() => updateReportStatus(teams.find(t => t.name === r.team).id, r.type, "rejected")}>Reject</Button>
                  </>
                )}
              </div>
            ))
          )}
        </Card>
      ))}
    </div>
  );

  // By Team View
  const renderByTeam = () => (
    <div className="reports-by-team">
      {teams.map(team => (
        <Card key={team.id} title={<span><Tag color={themes.find(t => t.key === team.theme)?.color || "#eee"}>{team.name}</Tag></span>} className="team-card">
          {team.reports.map((r, idx) => (
            <div key={idx} className="report-row">
              <span className="report-type"><b>{reportTypes.find(rt => rt.key === r.type)?.label}</b></span>
              <span className="report-file">{r.file}</span>
              <span className="report-status">
                {statusIcons[r.status]} <span className={`status-text ${r.status}`}>{r.status}</span>
              </span>
              <span className="report-date">{r.date}</span>
              {r.status === "pending" && (
                <>
                  <Button size="small" type="primary" onClick={() => updateReportStatus(team.id, r.type, "approved")}>Approve</Button>
                  <Button size="small" danger style={{ marginLeft: 8 }} onClick={() => updateReportStatus(team.id, r.type, "rejected")}>Reject</Button>
                </>
              )}
            </div>
          ))}
        </Card>
      ))}
    </div>
  );

  return (
    <div className="reports-dashboard-wrapper">
      <Row gutter={16} className="analytics-row">
        <Col span={6}><Statistic title="Total Reports" value={total} /></Col>
        <Col span={6}><Statistic title="Approved" value={approved} valueStyle={{ color: '#52c41a' }} /></Col>
        <Col span={6}><Statistic title="Rejected" value={rejected} valueStyle={{ color: '#ff4d4f' }} /></Col>
        <Col span={6}><Statistic title="Pending" value={pending} valueStyle={{ color: '#faad14' }} /></Col>
      </Row>
      <div className="view-toggle">
        <Tabs
          defaultActiveKey="type"
          activeKey={view}
          onChange={setView}
          items={[
            { key: "type", label: "By Type", children: renderByType() },
            { key: "team", label: "By Team", children: renderByTeam() },
          ]}
        />
      </div>
    </div>
  );
};

export default Reports;
