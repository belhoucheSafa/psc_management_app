import React, { useState } from "react";
import { toast } from "sonner";
import "./settingsAdmin.scss";
import { VscSettings } from "react-icons/vsc";
import { LuSettings2 } from "react-icons/lu";
import { TbSettingsShare } from "react-icons/tb";
import { TbPresentationAnalytics } from "react-icons/tb";
import { IoSettingsOutline, IoSaveOutline } from "react-icons/io5";
import { TbSettingsCog } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TbRocket } from "react-icons/tb";
import { TbSettingsCode } from "react-icons/tb";
 
import SETTINGICON from "../../assets/icons/settingsIcon2.webp";

const SettingsAdmin = () => {
    // State for form values
    const [programName, setProgramName] = useState("Scientific and Cultural Project");
    const [academicYear, setAcademicYear] = useState("2024-2025");
    const [institutionName, setInstitutionName] = useState("National School of Engineers");
    const [programDescription, setProgramDescription] = useState(
        "The Scientific and Cultural Project (PSC) is a mandatory program for first-year engineering students. It aims to introduce them to collaborative work and project management around various themes."
    );
    const [autoAssignTutors, setAutoAssignTutors] = useState(true);
    const [autoNotifications, setAutoNotifications] = useState(true);

    // State for themes management
    const [themes, setThemes] = useState([
        "AI & Environment",
        "Urban Mobility",
        "Connected Health",
        "Digital Education",
        "Smart City",
        "Renewable Energy",
        "Sustainable Agriculture",
        "Cybersecurity"
    ]);
    const [newTheme, setNewTheme] = useState("");

    // State for team criteria
    const [minMembers, setMinMembers] = useState(4);
    const [maxMembers, setMaxMembers] = useState(6);
    const [minSpecialties, setMinSpecialties] = useState(2);
    const [allowSameYear, setAllowSameYear] = useState(true);
    const [autoValidation, setAutoValidation] = useState(true);

    const [activeTab, setActiveTab] = useState("general");

    const handleAddTheme = () => {
        if (newTheme.trim() !== "") {
            setThemes([...themes, newTheme]);
            setNewTheme("");
        }
    };

    const handleRemoveTheme = (index) => {
        const updatedThemes = [...themes];
        updatedThemes.splice(index, 1);
        setThemes(updatedThemes);
    };

    const handleSaveGeneral = () => {
        toast.success("Changes saved successfully");
    };

    const handleSaveThemes = () => {
        toast.success("Themes saved successfully");
    };

    const handleSaveCriteria = () => {
        toast.success("Team criteria saved successfully");
    };

    const handleExport = () => {
        toast.success("Data export initiated");
    };

    const handleImport = () => {
        toast.success("Data import initiated");
    };

    const handleReset = () => {
        toast.success("Reset completed successfully");
    };

    const handleSaveSettings = () => {
        toast.success("Settings saved successfully");
    };

    return (
        <div className="settings-admin-container-1">
            <div className="settings-admin-container">
                

                <div className="settings-admin-title">
                    <div className="badge"></div>
                    <div className="icon">
                        <img src={SETTINGICON} alt="" />
                    </div>
                    <div className="title-wrapper">
                        <div className="title">PSC CONFIGURATION PANEL</div>
                        <p className="settings-subtitle">MANAGE CORE SYSTEM SETTINGS AND OPTIMIZE PLATFORM BEHAVIOR</p>
                    </div>
                </div>

                <div className="custom-tabs">
                    <div className="tabs-list">
                        <div
                            className={`tab-trigger ${activeTab === "general" ? "active" : ""}`}
                            onClick={() => setActiveTab("general")}
                        >
                            <TbSettingsCog className="tab-icon" />
                            GENERAL
                        </div>
                        <div
                            className={`tab-trigger ${activeTab === "themes" ? "active" : ""}`}
                            onClick={() => setActiveTab("themes")}
                        >
                            <TbRocket className="tab-icon" />
                            THEMES
                        </div>
                        <div
                            className={`tab-trigger ${activeTab === "criteria" ? "active" : ""}`}
                            onClick={() => setActiveTab("criteria")}
                        >
                            <HiOutlineUserGroup className="tab-icon" />
                            TEAM CRITERIA
                        </div>
                        <div
                            className={`tab-trigger ${activeTab === "admin" ? "active" : ""}`}
                            onClick={() => setActiveTab("admin")}
                        >
                            <TbSettingsCode className="tab-icon" />
                            ADVANCED SETTINGS
                        </div>
                    </div>

                    <div className="tab-content-wrapper">
                        {/* General Tab Content */}
                        <div className={`tab-content ${activeTab === "general" ? "active" : ""}`}>
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-title">General Settings</h2>
                                    <p className="card-subtitle">Global PSC platform configuration</p>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="programName">
                                            Program Name
                                        </label>
                                        <input
                                            id="programName"
                                            type="text"
                                            className="form-input"
                                            value={programName}
                                            onChange={(e) => setProgramName(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="academicYear">
                                            Academic Year
                                        </label>
                                        <input
                                            id="academicYear"
                                            type="text"
                                            className="form-input"
                                            value={academicYear}
                                            onChange={(e) => setAcademicYear(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="institutionName">
                                            Institution Name
                                        </label>
                                        <input
                                            id="institutionName"
                                            type="text"
                                            className="form-input"
                                            value={institutionName}
                                            onChange={(e) => setInstitutionName(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="programDescription">
                                            Program Description
                                        </label>
                                        <textarea
                                            id="programDescription"
                                            className="form-textarea"
                                            value={programDescription}
                                            onChange={(e) => setProgramDescription(e.target.value)}
                                            rows={5}
                                        />
                                    </div>

                                    <div className="switch-container">
                                        <div>
                                            <p className="switch-label">Automatic tutor assignment to teams</p>
                                            <p className="switch-description">Automatically assign tutors to teams based on theme compatibility</p>
                                        </div>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={autoAssignTutors}
                                                onChange={() => setAutoAssignTutors(!autoAssignTutors)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>

                                    <div className="switch-container">
                                        <div>
                                            <p className="switch-label">Automatic deadline notifications</p>
                                            <p className="switch-description">Send automatic notifications for upcoming deadlines</p>
                                        </div>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={autoNotifications}
                                                onChange={() => setAutoNotifications(!autoNotifications)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button onClick={handleSaveGeneral} className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Themes Tab Content */}
                        <div className={`tab-content ${activeTab === "themes" ? "active" : ""}`}>
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-title">Project Themes</h2>
                                    <p className="card-subtitle">Manage available themes for PSC teams</p>
                                </div>

                                <div className="card-body">
                                    <div className="theme-tags">
                                        {themes.map((theme, index) => (
                                            <div key={index} className="theme-tag">
                                                <span className="theme-tag-text">{theme}</span>
                                                <button
                                                    className="theme-tag-remove"
                                                    onClick={() => handleRemoveTheme(index)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="theme-input-group">
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={newTheme}
                                            onChange={(e) => setNewTheme(e.target.value)}
                                            placeholder="Enter a new theme"
                                        />
                                        <button onClick={handleAddTheme} className="btn btn-outline">
                                            Add Theme
                                        </button>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button onClick={handleSaveThemes} className="btn btn-primary">
                                        Save Themes
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Team Criteria Tab Content */}
                        <div className={`tab-content ${activeTab === "criteria" ? "active" : ""}`}>
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-title">Team Formation Criteria</h2>
                                    <p className="card-subtitle">Configure team formation rules and validation</p>
                                </div>

                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="minMembers">
                                            Minimum Team Members
                                        </label>
                                        <input
                                            id="minMembers"
                                            type="number"
                                            className="form-input"
                                            value={minMembers}
                                            onChange={(e) => setMinMembers(parseInt(e.target.value))}
                                            min="2"
                                            max="8"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="maxMembers">
                                            Maximum Team Members
                                        </label>
                                        <input
                                            id="maxMembers"
                                            type="number"
                                            className="form-input"
                                            value={maxMembers}
                                            onChange={(e) => setMaxMembers(parseInt(e.target.value))}
                                            min="2"
                                            max="8"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="minSpecialties">
                                            Minimum Required Specialties
                                        </label>
                                        <input
                                            id="minSpecialties"
                                            type="number"
                                            className="form-input"
                                            value={minSpecialties}
                                            onChange={(e) => setMinSpecialties(parseInt(e.target.value))}
                                            min="1"
                                            max="5"
                                        />
                                    </div>

                                    <div className="switch-container">
                                        <div>
                                            <p className="switch-label">Allow same year students</p>
                                            <p className="switch-description">Allow students from the same year to form teams</p>
                                        </div>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={allowSameYear}
                                                onChange={() => setAllowSameYear(!allowSameYear)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>

                                    <div className="switch-container">
                                        <div>
                                            <p className="switch-label">Automatic team validation</p>
                                            <p className="switch-description">Automatically validate teams that meet all criteria</p>
                                        </div>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={autoValidation}
                                                onChange={() => setAutoValidation(!autoValidation)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button onClick={handleSaveCriteria} className="btn btn-primary">
                                        Save Criteria
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Administration Tab Content */}
                        <div className={`tab-content ${activeTab === "admin" ? "active" : ""}`}>
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-title">Administration</h2>
                                    <p className="card-subtitle">Manage platform data and settings</p>
                                </div>

                                <div className="card-body">
                                    <div className="admin-actions">
                                        <div className="admin-action-group">
                                            <h3 className="admin-action-title">Data Management</h3>
                                            <div className="admin-action-buttons">
                                                <button onClick={handleExport} className="btn btn-outline">
                                                    Export Data
                                                </button>
                                                <button onClick={handleImport} className="btn btn-outline">
                                                    Import Data
                                                </button>
                                            </div>
                                        </div>

                                        <div className="danger-zone">
                                            <h3 className="danger-title">Danger Zone</h3>
                                            <p className="danger-description">
                                                These actions are irreversible. Please proceed with caution.
                                            </p>
                                            <button onClick={handleReset} className="btn btn-destructive">
                                                Reset Platform
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsAdmin;
