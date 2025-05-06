// import "./loginPage.scss";
// import React, { useState, useEffect, useRef } from "react";

// import { IoPlayCircleOutline } from "react-icons/io5";
// import { LuCircleArrowRight } from "react-icons/lu";
// import { PiStudentBold } from "react-icons/pi";
// import { MdOutlineAdminPanelSettings } from "react-icons/md";
// import { FaChalkboardUser } from "react-icons/fa6";
// import { MdOutlineRocketLaunch } from "react-icons/md";
 
// import { Input, Select, Space } from "antd";

// import DEMOVID from "../../assets/images/demoVid.png";
// import LoginImg1 from "../../assets/images/pscCover6.jpeg";
// import LoginImg2 from "../../assets/images/pscCover5.jpeg";
// import LoginImg3 from "../../assets/images/loginCartoonify.png";
// import LoginImg4 from "../../assets/images/pscCover4.jpeg";
// import LoginImage from "../../assets/images/loginImg1.jpg";
// import BackArrow from "../../assets/icons/backArr.png";
// import DonsPattern from "../../assets/images/donsBg.jpg";
// import MainLogo from "../../assets/images/mainLogo2.png";
// import MainLogo2 from "../../assets/images/mainLogo4.png";
// import TeamIcon from "../../assets/icons/teamIcon2.png";
// import ManAvatar from "../../assets/images/manAvatar.png";
// import GirlAvatar from "../../assets/images/girlAvatar.png";
// import EnvIcon from "../../assets/icons/env1.png";
// import HealthIcon from "../../assets/icons/health1.png";
// import EdIcon from "../../assets/icons/ed1.png";
// import SportIcon from "../../assets/icons/sportCult1.png";
// import WarningIcon from "../../assets/icons/exlamationIcon.png";
// import MAILBOT from "../../assets/images/flyingMailBot.png";

// import CreatingTeamSpaceLoader from "../../assets/videos/loadingCreatingSpace.mov";
// import SuccessCreationVideo from "../../assets/videos/successVideo.mov";

// const Carousel = ({ data }) => {
//   const [slide, setSlide] = useState(0);

//   return (
//     <div className="carousel">
//       {data.map((item, idx) => {
//         return (
//           <img
//             src={item.src}
//             alt={item.alt}
//             key={idx}
//             className={slide === idx ? "slide" : "slide slide-hidden"}
//           />
//         );
//       })}

//       <span className="indicators">
//         {/* <div className="indicators-wrapper"> */}
//         {data.map((_, idx) => {
//           return (
//             <button
//               key={idx}
//               className={
//                 slide === idx ? "indicator" : "indicator indicator-inactive"
//               }
//               onClick={() => setSlide(idx)}
//             ></button>
//           );
//         })}
//         {/* </div> */}
//       </span>
//     </div>
//   );
// };

// const LoginPage = () => {
//   // UI States
//   const [isSwapped, setIsSwapped] = useState(false);
//   const [createTeam, setCreateTeam] = useState(false);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [loginForm, setLoginForm] = useState({
//     email: '',
//     password: ''
//   });

//   // Team Creation States
//   const [teamCreationState, setTeamCreationState] = useState({
//     status: "idle",
//     formData: null,
//   });

//   // Form Data
//   const [formData, setFormData] = useState({
//     selectedMembers: [],
//     selectedTheme: null,
//   });

//   const [authCode, setAuthCode] = useState("");
//   const creationTimer = useRef(null);

//   // Students data
//   const students = [
//     {
//       matricule: "22LBI022",
//       name: "Ali Ben Salah",
//       email: "ali.bensalah@polytechnicien.tn",
//       specialty: "Informatique",
//       gender: "Homme",
//     },
//     {
//       matricule: "23LGL012",
//       name: "Mariem Ben Ahmed",
//       email: "mariem.benahmed@polytechnicien.tn",
//       specialty: "Informatique",
//       gender: "Femme",
//     },
//     {
//       matricule: "22PREPA015",
//       name: "Mohamed Ben Ali",
//       email: "mohamed.benali@polytechnicien.tn",
//       specialty: "Génie Civil",
//       gender: "Homme",
//     },
//     {
//       matricule: "23EA007",
//       name: "Fatma Ben Mahmoud",
//       email: "fatma.benmahmoud@polytechnicien.tn",
//       specialty: "Électro et Auto",
//       gender: "Femme",
//     },
//     {
//       matricule: "22BIO010",
//       name: "Sami Ben Hassen",
//       email: "sami.benhassen@polytechnicien.tn",
//       specialty: "Biologie",
//       gender: "Homme",
//     },
//     {
//       matricule: "23INFO025",
//       name: "Leila Ben Mohamed",
//       email: "leila.benmohamed@polytechnicien.tn",
//       specialty: "Électromécanique",
//       gender: "Femme",
//     },
//     {
//       matricule: "22CIVIL018",
//       name: "Ahmed Ben Youssef",
//       email: "ahmed.benyoussef@polytechnicien.tn",
//       specialty: "Électromécanique",
//       gender: "Homme",
//     },
//   ];

//   // Clean up timer on component unmount
//   useEffect(() => {
//     return () => {
//       if (creationTimer.current) {
//         clearTimeout(creationTimer.current);
//         creationTimer.current = null;
//       }
//     };
//   }, []);

//   const handleToggleSwap = () => {
//     setIsSwapped(!isSwapped);
//     if (!isSwapped) {
//       setSelectedRole(null);
//       setCreateTeam(false);
//     }
//   };

//   const handleRoleClick = (role) => {
//     setSelectedRole(role);
//     setCreateTeam(false);
//     setTeamCreationState({ status: "idle", formData: null });
//   };

//   const handleCreateTeam = () => {
//     setCreateTeam(!createTeam);
//     setTeamCreationState({ status: "idle", formData: null });
//   };

//   const generateAuthCode = () => {
//     const code = Array.from({ length: 7 }, () =>
//       Math.floor(Math.random() * 10)
//     ).join("");
//     setAuthCode(code);
//     return code;
//   };

//   const mockSaveTeam = async (teamData) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log("Team saved to database:", teamData);
//         resolve({ success: true, data: teamData });
//       }, 2000);
//     });
//   };

//   const handleCreateTeamSpace = async () => {
//     if (!formData.selectedTheme || formData.selectedMembers.length === 0) {
//       alert("Veuillez sélectionner un thème et au moins un membre d'équipe");
//       return;
//     }

//     if (creationTimer.current) {
//       clearTimeout(creationTimer.current);
//       creationTimer.current = null;
//     }

//     setTeamCreationState({
//       status: "creating",
//       formData: {
//         selectedMembers: [...formData.selectedMembers],
//         selectedTheme: formData.selectedTheme,
//       },
//     });

//     try {
//       const response = await fetch('/api/v1/teams', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           members: formData.selectedMembers,
//           theme: formData.selectedTheme,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setTeamCreationState((prev) => ({
//           ...prev,
//           status: "success",
//         }));
//       } else {
//         throw new Error(data.message || 'Failed to create team');
//       }
//     } catch (error) {
//       setTeamCreationState({
//         status: "idle",
//         formData: formData,
//       });
//       alert("Erreur lors de la création de l'équipe: " + error.message);
//     } finally {
//       if (creationTimer.current) {
//         clearTimeout(creationTimer.current);
//         creationTimer.current = null;
//       }
//     }
//   };

//   // const handleCancelCreation = () => {
//   //   if (creationTimer.current) {
//   //     clearTimeout(creationTimer.current);
//   //     creationTimer.current = null;
//   //   }
//   //   setTeamCreationState({
//   //     status: "idle",
//   //     formData: teamCreationState.formData,
//   //   });
//   // };
//   const handleCancelCreation = () => {
//     if (creationTimer.current) {
//       clearTimeout(creationTimer.current);
//       creationTimer.current = null;
//     }

//     // PRESERVE ALL SELECTED DATA when going back
//     setTeamCreationState({
//       status: "idle",
//       formData: {
//         selectedMembers: [...formData.selectedMembers],
//         selectedTheme: formData.selectedTheme,
//       },
//     });
//   };

//   useEffect(() => {
//     if (teamCreationState.status === "idle" && teamCreationState.formData) {
//       setFormData({
//         selectedMembers: [...teamCreationState.formData.selectedMembers],
//         selectedTheme: teamCreationState.formData.selectedTheme,
//       });
//     }
//   }, [teamCreationState.status]);
//   const handleResetForm = () => {
//     if (creationTimer.current) {
//       clearTimeout(creationTimer.current);
//       creationTimer.current = null;
//     }
//     setFormData({
//       selectedMembers: [],
//       selectedTheme: null,
//     });
//     setTeamCreationState({
//       status: "idle",
//       formData: null,
//     });
//     setCreateTeam(false);
//     setSelectedRole("student");
//   };

//   const handleChange = (selectedMatricules) => {
//     const selected = students.filter((student) =>
//       selectedMatricules.includes(student.matricule)
//     );
//     setFormData((prev) => ({
//       ...prev,
//       selectedMembers: selected,
//     }));
//   };

//   const handleThemeChange = (theme) => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedTheme: theme,
//     }));
//   };

//   const handleVideoEnd = () => {
//     handleResetForm();
//   };

//   const handleCodeLogin = async (code) => {
//     try {
//       const response = await fetch('/api/v1/teams/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ accessCode: code }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store the token
//         localStorage.setItem('token', data.token);
//         // Redirect to team space
//         window.location.href = '/team-space';
//       } else {
//         throw new Error(data.message || 'Invalid access code');
//       }
//     } catch (error) {
//       alert('Login failed: ' + error.message);
//     }
//   };

//   // Update the OTP input handler
//   const onChange = (text) => {
//     if (text.length === 7) {
//       handleCodeLogin(text);
//     }
//   };

//   const onInput = (value) => console.log("onInput:", value);
//   const sharedProps = { onChange, onInput };

//   const slides = [
//     { src: LoginImage, alt: "Image 1 for carousel" },
//     { src: LoginImg2, alt: "Image 2 for carousel" },
//     { src: LoginImg3, alt: "Image 3 for carousel" },
//     { src: LoginImg1, alt: "Image 4 for carousel" },
//   ];

//   const options = students.map((student) => ({
//     label: student.matricule,
//     value: student.matricule,
//     ...student,
//   }));

//   const handleAdminLogin = async () => {
//     try {
//       console.log('Attempting admin login with:', loginForm);
//       const response = await fetch('/api/v1/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(loginForm),
//       });

//       const data = await response.json();
//       console.log('Login response:', data);

//       if (response.ok) {
//         // Store the token and user data
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify({
//           id: data.data.user.id,
//           name: data.data.user.name,
//           email: data.data.user.email,
//           role: data.data.user.role
//         }));

//         // Redirect based on role
//         switch (data.data.user.role) {
//           case 'admin':
//             window.location.href = '/admin-dashboard';
//             break;
//           case 'tutor':
//             window.location.href = '/tutor-dashboard';
//             break;
//           case 'student':
//             window.location.href = '/student-dashboard';
//             break;
//           default:
//             window.location.href = '/';
//         }
//       } else {
//         throw new Error(data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Login failed: ' + error.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setLoginForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className={`login-page-container ${isSwapped ? "swapped" : ""}`}>
//       {teamCreationState.status === "idle" ? (
//         <>
//           <div className="login-page-left-side">
//             <div className="section-top-v">
//               <div className="logo-wrapper">
//                 <img src={MainLogo} alt="Main Logo" />
//               </div>
//             </div>

//             <div className="section-center-v">
//               <div className="main-login-title">
//                 <div className="m-l-title-1">
//                   DU <span className="span-1">CONCEPT</span> À{" "}
//                   <span className="span-2">L'IMPACT</span>
//                 </div>
//                 <div className="m-l-title-2">VOTRE ESPACE</div>
//                 <div className="m-l-title-3">POUR DES PROJETS QUI COMPTENT</div>
//               </div>

//               <div className="login-subtitle">
//                 VOTRE COMMUNAUTÉ POUR TRANSFORMER VOS IDÉES EN ACTIONS
//               </div>

//               <div className="login-call-to-action" onClick={handleToggleSwap}>
//                 <div className="text">Connectez et Agissez </div>
//                 <LuCircleArrowRight className="arrow-icon" />
//               </div>
//             </div>

//             <div className="section-bottom-v">
//               <div className="section-bottom-left-side">
//                 <div className="s-b-l-left">
//                   <div className="circle-container">
//                     <div className="left-demi-circle"></div>
//                     <div className="right-top"></div>
//                     <div className="right-bottom"></div>
//                   </div>
//                   <div className="circle-video-wrapper">
//                     <img src={DEMOVID} alt="Demo Video" />
//                     <div className="video-icon-wrapper">
//                       <IoPlayCircleOutline />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="s-b-l-right">
//                   <div className="text-1">
//                     Lorem ipsum dolor <span>sit</span>
//                   </div>
//                   <div className="text-2">
//                     consectetur adipisicing <span>elit Lorem </span>illo
//                     incidunt cumque ipsam enim
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {isSwapped && (
//               <>
//                 {!createTeam && (
//                   <div className="swapper-section-top">
//                     <div className="left-side-swap"></div>
//                     <div className="right-side-swap">
//                       <div
//                         id="student"
//                         className={`role-space-wrapper ${
//                           selectedRole === "student" ? "active" : ""
//                         }`}
//                         onClick={() => handleRoleClick("student")}
//                       >
//                         <PiStudentBold />
//                         <div className="role-space-text">Espace Etudiant</div>
//                       </div>

//                       <div
//                         id="tutor"
//                         className={`role-space-wrapper ${
//                           selectedRole === "tutor" ? "active" : ""
//                         }`}
//                         onClick={() => handleRoleClick("tutor")}
//                       >
//                         <FaChalkboardUser className="tutor-user-icon" />
//                         <div className="role-space-text">Espace Tuteur</div>
//                       </div>

//                       <div
//                         id="admin"
//                         className={`role-space-wrapper ${
//                           selectedRole === "admin" ? "active" : ""
//                         }`}
//                         onClick={() => handleRoleClick("admin")}
//                       >
//                         <MdOutlineAdminPanelSettings className="admin-user-icon" />
//                         <div className="role-space-text">Espace Admin</div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {selectedRole !== "student" && (
//                   <div className="swapper-section-center">
//                     <div className="top-section">
//                       <img src={MainLogo2} alt="Secondary Logo" />
//                     </div>
//                     <div className="login-subtitle">
//                       Connectez-vous et démarrez l'aventure PSC
//                     </div>
//                     <div className="center-section">
//                       <Input 
//                         placeholder="Email" 
//                         className="login-input"
//                         name="email"
//                         value={loginForm.email}
//                         onChange={handleInputChange}
//                       />
//                       <Input.Password
//                         placeholder="Mot de passe"
//                         className="login-input"
//                         name="password"
//                         value={loginForm.password}
//                         onChange={handleInputChange}
//                       />
//                       <div className="login-button" onClick={handleAdminLogin}>
//                         Se Connecter
//                       </div>
//                       <div className="questions-wrapper">
//                         Questions ?{" "}
//                         <span className="span-grey">
//                           Contactez{" "}
//                           <span className="span-number">
//                             + 216 <span>93220500</span>
//                           </span>{" "}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {selectedRole === "student" && (
//                   <div
//                     className={`${
//                       createTeam
//                         ? "swapper-section-center-create-team"
//                         : "swapper-section-center"
//                     }`}
//                   >
//                     {!createTeam ? (
//                       <>
//                         <div className="top-section">
//                           <img src={MainLogo2} alt="Secondary Logo" />
//                         </div>
//                         <div className="login-subtitle">
//                           Connectez-vous et démarrez l'aventure PSC
//                         </div>
//                         <div className="center-section student-interface">
//                           <Input.OTP
//                             length={7}
//                             formatter={(str) => str.toUpperCase()}
//                             {...sharedProps}
//                           />

//                           <div className="login-button">Se Connecter</div>
//                           <div className="questions-wrapper">
//                             Pas encore d'équipe ?
//                             <span
//                               className="span-grey create-team-link"
//                               onClick={handleCreateTeam}
//                             >
//                               Créez votre équipe ici
//                             </span>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="navigate-spaces-create-team-wrapper">
//                           <div className="right-side-swap-create-team">
//                             <div
//                               id="student"
//                               className="role-space-wrapper"
//                               onClick={() => handleRoleClick("student")}
//                             >
//                               <PiStudentBold />
//                             </div>

//                             <div
//                               id="tutor"
//                               className={`role-space-wrapper ${
//                                 selectedRole === "tutor" ? "active" : ""
//                               }`}
//                               onClick={() => handleRoleClick("tutor")}
//                             >
//                               <FaChalkboardUser className="tutor-user-icon" />
//                             </div>

//                             <div
//                               id="admin"
//                               className={`role-space-wrapper ${
//                                 selectedRole === "admin" ? "active" : ""
//                               }`}
//                               onClick={() => handleRoleClick("admin")}
//                             >
//                               <MdOutlineAdminPanelSettings className="admin-user-icon" />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="create-team-form">
//                           <div className="add-members">
//                             <div className="add-members-input-wrapper">
//                               <div className="label-wrapper">
//                                 <div className="text">
//                                   Selectez les membres de votre équipe{" "}
//                                 </div>
//                               </div>
//                               <div className="input-wrapper">
//                                 <Select
//                                   mode="multiple"
//                                   style={{ width: "100%" }}
//                                   placeholder="Entrez le matricule du membre"
//                                   onChange={handleChange}
//                                   options={options}
//                                   value={formData.selectedMembers.map(
//                                     (m) => m.matricule
//                                   )}
//                                   filterOption={(inputValue, option) =>
//                                     option.label
//                                       .toLowerCase()
//                                       .includes(inputValue.toLowerCase())
//                                   }
//                                   optionRender={(option) => (
//                                     <Space>{option.data.matricule} </Space>
//                                   )}
//                                 />
//                               </div>
//                             </div>

//                             <div className="members-list">
//                               {formData.selectedMembers.length > 0 ? (
//                                 formData.selectedMembers.map((member) => (
//                                   <div
//                                     className="member-item"
//                                     key={member.matricule}
//                                   >
//                                     <div className="avatar-name-mail-wrapper">
//                                       <div className="avatar">
//                                         <img
//                                           src={
//                                             member.gender === "Femme"
//                                               ? GirlAvatar
//                                               : ManAvatar
//                                           }
//                                           alt=""
//                                           className={
//                                             member.gender === "Femme"
//                                               ? "GirlAvatar"
//                                               : "ManAvatar"
//                                           }
//                                         />
//                                       </div>
//                                       <div className="name-mail">
//                                         <div className="fullname">
//                                           {member.name}
//                                         </div>
//                                         <div className="mail">
//                                           {member.email}
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div className="speciality-wrapper">
//                                       <div
//                                         className={`speciality ${member.specialty
//                                           .toLowerCase()
//                                           .replace(/\s+/g, "")}`}
//                                       >
//                                         {member.specialty}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 ))
//                               ) : (
//                                 <>
//                                   {[...Array(2)].map((_, index) => (
//                                     <div
//                                       className="member-item-skeleton"
//                                       key={index}
//                                     >
//                                       <div className="skeleton-avatar"></div>
//                                       <div className="skeleton-details">
//                                         <div className="skeleton-name"></div>
//                                         <div className="skeleton-email"></div>
//                                       </div>
//                                       <div className="skeleton-specialty"></div>
//                                     </div>
//                                   ))}
//                                 </>
//                               )}
//                             </div>
//                           </div>
//                           <div className="select-theme">
//                             <div className="label-wrapper">
//                               <div className="text">Choisissez votre thème</div>
//                             </div>

//                             <div className="themes-boxes-wrapper">
//                               <div className="theme-box">
//                                 <img
//                                   src={EdIcon}
//                                   alt=""
//                                   className="theme-img ed"
//                                 />
//                                 <div className="theme-title">Education</div>
//                                 <div className="theme-radio">
//                                   <input
//                                     type="radio"
//                                     className="input-radio"
//                                     checked={
//                                       formData.selectedTheme === "Education"
//                                     }
//                                     onChange={() =>
//                                       handleThemeChange("Education")
//                                     }
//                                   />
//                                 </div>
//                               </div>

//                               <div className="theme-box">
//                                 <img
//                                   src={HealthIcon}
//                                   alt=""
//                                   className="theme-img health"
//                                 />
//                                 <div className="theme-title">Santé</div>
//                                 <div className="theme-radio">
//                                   <input
//                                     type="radio"
//                                     className="input-radio"
//                                     checked={formData.selectedTheme === "Santé"}
//                                     onChange={() => handleThemeChange("Santé")}
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="themes-boxes-wrapper">
//                               <div className="theme-box">
//                                 <img
//                                   src={EnvIcon}
//                                   alt=""
//                                   className="theme-img env"
//                                 />
//                                 <div className="theme-title">Environnement</div>
//                                 <div className="theme-radio">
//                                   <input
//                                     type="radio"
//                                     className="input-radio"
//                                     checked={
//                                       formData.selectedTheme === "Environnement"
//                                     }
//                                     onChange={() =>
//                                       handleThemeChange("Environnement")
//                                     }
//                                   />
//                                 </div>
//                               </div>
//                               <div className="theme-box">
//                                 <img
//                                   src={SportIcon}
//                                   alt=""
//                                   className="theme-img sport"
//                                 />
//                                 <div className="theme-title">
//                                   Culture et Sport
//                                 </div>
//                                 <div className="theme-radio">
//                                   <input
//                                     type="radio"
//                                     className="input-radio"
//                                     checked={
//                                       formData.selectedTheme ===
//                                       "Culture et Sport"
//                                     }
//                                     onChange={() =>
//                                       handleThemeChange("Culture et Sport")
//                                     }
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="form-warning-box">
//                             <div className="icon-wrapper">
//                               <img src={WarningIcon} alt="" />
//                             </div>
//                             <div className="warning-content">
//                               Cher étudiant, merci de confirmer avec soin les
//                               membres de votre équipe et votre thème ces choix
//                               seront définitifs pour toute la durée du PSC !
//                             </div>
//                           </div>
//                           <div className="confirm-team-box">
//                             <div
//                               className="create-team-btn"
//                               onClick={handleCreateTeamSpace}
//                             >
//                               <MdOutlineRocketLaunch className="rocket-icon" />
//                               Lancer notre équipe
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           <div className="login-page-right-side">
//             <div className="login-page-right-side-top">
//               {isSwapped && (
//                 <div className="back-arrow-wrapper">
//                   <div className="back-arrow" onClick={handleToggleSwap}>
//                     <img src={BackArrow} alt="Back Arrow" />
//                   </div>
//                 </div>
//               )}
//               <div className="login-r-s-t-layer-1">
//                 {isSwapped && (
//                   // 
//                   <Carousel data={slides} />
//                 )}
//               </div>
//               <div className="login-r-s-t-opacity-layer-1"></div>
//               <div className="login-r-s-t-layer-4">
//                 <div className="layer-4-text-wrapper">
//                   Lorem ipsum dolor, sit amet <span>consectetur</span>{" "}
//                   adipisicing elit. <span>Sequi</span> doloribus temporibus{" "}
//                   <span>accusantium</span> culpa ut esse debitis aliquam.
//                 </div>
//               </div>
//             </div>
//             {!isSwapped && (
//               <div className="login-page-right-side-bottom">
//                 <div className="bottom-widget-wrapper wd-1">2K25</div>
//                 <div className="bottom-widget-wrapper wd-2">INNOVEZ 💡</div>
//                 <div className="bottom-widget-wrapper wd-3">COLLABOREZ</div>
//                 <div className="bottom-widget-wrapper wd-4">RÉALISEZ</div>
//                 <div className="bottom-widget-wrapper wd-5">IMPACTEZ </div>
//                 <div className="bottom-widget-wrapper wd-6">💪🔥</div>
//                 <div className="bottom-widget-wrapper wd-7">
//                   AVENIR <span className="highlited-txt">DURABLE</span>
//                 </div>
//                 <div className="bottom-widget-wrapper wd-8">
//                   INGENIEURS <span className="highlited-txt">ENGAGÉS</span>
//                 </div>
//                 <div className="bottom-widget-wrapper wd-9">EDUCATION</div>
//                 <div className="bottom-widget-wrapper wd-10">P.S.C</div>
//                 <div className="bottom-widget-wrapper wd-11">INSPIREZ </div>
//               </div>
//             )}
//           </div>
//         </>
//       ) : teamCreationState.status === "creating" ? (
//         <div className="team-space-creating visible">
//           <div className="video-wrapper">
//             <video autoPlay loop muted className="team-space-video">
//               <source src={CreatingTeamSpaceLoader} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>

//           <div className="creating-space-text-wrapper">
//             <div className="text-creating-team-space">
//               <span>
//                 VOTRE ESPACE ÉQUIPE EN CONSTRUCTION ! PRÉPAREZ-VOUS À COLLABORER
//                 ...
//               </span>
//             </div>
//           </div>

//           <div className="cancel-back-btns-wrapper">
//             <div className="cancel-back-btn" onClick={handleCancelCreation}>
//               Retour
//             </div>
//             <div className="annuler-button" onClick={handleResetForm}>
//               <p>Annuler</p>
//             </div>
//           </div>
//         </div>
//       ) : teamCreationState.status === "success" ? (
//         <div className="team-creation-success visible">
//           {/* <div className="code-auth-login-action" onClick={handleResetForm}>
//             <div className="text">Se connecter maintenant </div>
//             <LuCircleArrowRight className="arrow-icon" />
//           </div> */}

//           <div className="code-auth-login-action-2" onClick={handleResetForm}>
//             Continuer
            
//           </div>

//           <div className="success-msg-team-creation">
//             <div className="first-success-msg">
//               VOTRE ESPACE ÉQUIPE EST CRÉÉ AVEC SUCCÈS !
//             </div>
//             <div className="second-success-msg">
//               CONSULTEZ VOTRE BOÎTE MAIL POUR RÉCUPÉRER VOTRE CODE D'ACCÈS
//             </div>
//           </div>

//           <div className="success-video-team-creation">
//             <video
//               autoPlay
//               playsInline
//               loop={false}
//               muted
//               className="team-space-created-video"
//             >
//               <source src={SuccessCreationVideo} />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//           <img src={MAILBOT} alt="" className="mail-bot" />
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default LoginPage;


import "./loginPage.scss";
import React, { useState, useEffect, useRef } from "react";
import { useLogin } from '../../hooks/useLogin';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate, Link } from "react-router-dom";
import { Input, Select, Space } from "antd";
import toast from "react-hot-toast";

// Icons
import { IoPlayCircleOutline } from "react-icons/io5";
import { LuCircleArrowRight } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaChalkboardUser } from "react-icons/fa6";
import { MdOutlineRocketLaunch } from "react-icons/md";

// Assets
import DEMOVID from "../../assets/images/demoVid.png";
import LoginImg1 from "../../assets/images/pscCover6.jpeg";
import LoginImg2 from "../../assets/images/pscCover5.jpeg";
import LoginImg3 from "../../assets/images/loginCartoonify.png";
import LoginImg4 from "../../assets/images/pscCover4.jpeg";
import LoginImage from "../../assets/images/loginImg1.jpg";
import BackArrow from "../../assets/icons/backArr.png";
import MainLogo from "../../assets/images/mainLogo2.png";
import MainLogo2 from "../../assets/images/mainLogo4.png";
import ManAvatar from "../../assets/images/manAvatar.png";
import GirlAvatar from "../../assets/images/girlAvatar.png";
import EnvIcon from "../../assets/icons/env1.png";
import HealthIcon from "../../assets/icons/health1.png";
import EdIcon from "../../assets/icons/ed1.png";
import SportIcon from "../../assets/icons/sportCult1.png";
import WarningIcon from "../../assets/icons/exlamationIcon.png";
import MAILBOT from "../../assets/images/flyingMailBot.png";
import CreatingTeamSpaceLoader from "../../assets/videos/loadingCreatingSpace.mov";
import SuccessCreationVideo from "../../assets/videos/successVideo.mov";

const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  return (
    <div className="carousel">
      {data.map((item, idx) => (
        <img
          src={item.src}
          alt={item.alt}
          key={idx}
          className={slide === idx ? "slide" : "slide slide-hidden"}
        />
      ))}
      <span className="indicators">
        {data.map((_, idx) => (
          <button
            key={idx}
            className={slide === idx ? "indicator" : "indicator indicator-inactive"}
            onClick={() => setSlide(idx)}
          ></button>
        ))}
      </span>
    </div>
  );
};

const LoginPage = () => {
  // Authentication hooks
  const { login, isLoading } = useLogin();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // UI States
  const [isSwapped, setIsSwapped] = useState(false);
  const [createTeam, setCreateTeam] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [authCode, setAuthCode] = useState("");

  // Form States
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    role: null
  });

  const [formData, setFormData] = useState({
    selectedMembers: [],
    selectedTheme: null,
  });

  const [teamCreationState, setTeamCreationState] = useState({
    status: "idle",
    formData: null,
  });

  const creationTimer = useRef(null);

  // Sample student data (replace with your actual data source)
  const students = [
    {
      matricule: "22LBI022",
      name: "Ali Ben Salah",
      email: "ali.bensalah@polytechnicien.tn",
      specialty: "Informatique",
      gender: "Homme",
    },
    // ... other students ...
  ];

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (creationTimer.current) {
        clearTimeout(creationTimer.current);
        creationTimer.current = null;
      }
    };
  }, []);

  // Handlers
  const handleToggleSwap = () => {
    setIsSwapped(!isSwapped);
    if (!isSwapped) {
      setSelectedRole(null);
      setCreateTeam(false);
    }
  };

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setCreateTeam(false);
    setTeamCreationState({ status: "idle", formData: null });
    setLoginForm(prev => ({ ...prev, role }));
    setAuthCode('');
  };

  const handleCreateTeam = () => {
    setCreateTeam(!createTeam);
    setTeamCreationState({ status: "idle", formData: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      if (selectedRole === 'student') {
        // Student team login with access code
        if (authCode.length !== 7) {
          toast.error('Please enter a valid 7-digit access code');
          return;
        }
        await login(authCode, null, 'student');
      } else {
        // Admin/tutor login with email/password
        if (!loginForm.email || !loginForm.password) {
          toast.error('Please enter both email and password');
          return;
        }
        await login(loginForm.email, loginForm.password, selectedRole);
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };

  const handleCreateTeamSpace = async () => {
    if (!formData.selectedTheme || formData.selectedMembers.length === 0) {
      toast.error('Please select a theme and at least one team member');
      return;
    }

    setTeamCreationState({ status: "creating" });

    try {
      const response = await fetch('/api/v1/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          members: formData.selectedMembers,
          theme: formData.selectedTheme,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTeamCreationState({ status: "success" });
        toast.success('Team created successfully! Access codes sent to members.');
      } else {
        throw new Error(data.message || 'Failed to create team');
      }
    } catch (error) {
      setTeamCreationState({ status: "idle" });
      toast.error(error.message);
    }
  };

  const handleCancelCreation = () => {
    if (creationTimer.current) clearTimeout(creationTimer.current);
    setTeamCreationState({
      status: "idle",
      formData: {
        selectedMembers: [...formData.selectedMembers],
        selectedTheme: formData.selectedTheme,
      },
    });
  };

  const handleResetForm = () => {
    if (creationTimer.current) clearTimeout(creationTimer.current);
    setFormData({ selectedMembers: [], selectedTheme: null });
    setTeamCreationState({ status: "idle", formData: null });
    setCreateTeam(false);
    setSelectedRole("student");
  };

  const handleChange = (selectedMatricules) => {
    const selected = students.filter(student => selectedMatricules.includes(student.matricule));
    setFormData(prev => ({ ...prev, selectedMembers: selected }));
  };

  const handleThemeChange = (theme) => {
    setFormData(prev => ({ ...prev, selectedTheme: theme }));
  };

  // Data preparation
  const slides = [
    { src: LoginImage, alt: "Image 1" },
    { src: LoginImg2, alt: "Image 2" },
    { src: LoginImg3, alt: "Image 3" },
    { src: LoginImg1, alt: "Image 4" },
  ];

  const options = students.map(student => ({
    label: student.matricule,
    value: student.matricule,
    ...student,
  }));

  return (
    <div className={`login-page-container ${isSwapped ? "swapped" : ""}`}>
      {teamCreationState.status === "idle" ? (
        <>
          <div className="login-page-left-side">
            <div className="section-top-v">
              <div className="logo-wrapper">
                <img src={MainLogo} alt="Main Logo" />
              </div>
            </div>

            <div className="section-center-v">
              <div className="main-login-title">
                <div className="m-l-title-1">
                  DU <span className="span-1">CONCEPT</span> À{" "}
                  <span className="span-2">L'IMPACT</span>
                </div>
                <div className="m-l-title-2">VOTRE ESPACE</div>
                <div className="m-l-title-3">POUR DES PROJETS QUI COMPTENT</div>
              </div>

              <div className="login-subtitle">
                VOTRE COMMUNAUTÉ POUR TRANSFORMER VOS IDÉES EN ACTIONS
              </div>

              <div className="login-call-to-action" onClick={handleToggleSwap}>
                <div className="text">Connectez et Agissez </div>
                <LuCircleArrowRight className="arrow-icon" />
              </div>
            </div>

            <div className="section-bottom-v">
              <div className="section-bottom-left-side">
                <div className="s-b-l-left">
                  <div className="circle-container">
                    <div className="left-demi-circle"></div>
                    <div className="right-top"></div>
                    <div className="right-bottom"></div>
                  </div>
                  <div className="circle-video-wrapper">
                    <img src={DEMOVID} alt="Demo Video" />
                    <div className="video-icon-wrapper">
                      <IoPlayCircleOutline />
                    </div>
                  </div>
                </div>
                <div className="s-b-l-right">
                  <div className="text-1">
                    Lorem ipsum dolor <span>sit</span>
                  </div>
                  <div className="text-2">
                    consectetur adipisicing <span>elit Lorem </span>illo
                    incidunt cumque ipsam enim
                  </div>
                </div>
              </div>
            </div>

            {isSwapped && (
              <>
                {!createTeam && (
                  <div className="swapper-section-top">
                    <div className="left-side-swap"></div>
                    <div className="right-side-swap">
                      <div
                        id="student"
                        className={`role-space-wrapper ${selectedRole === "student" ? "active" : ""}`}
                        onClick={() => handleRoleClick("student")}
                      >
                        <PiStudentBold />
                        <div className="role-space-text">Espace Etudiant</div>
                        {selectedRole === "student" && <div className="role-indicator"></div>}
                      </div>

                      <div
                        id="tutor"
                        className={`role-space-wrapper ${selectedRole === "tutor" ? "active" : ""}`}
                        onClick={() => handleRoleClick("tutor")}
                      >
                        <FaChalkboardUser className="tutor-user-icon" />
                        <div className="role-space-text">Espace Tuteur</div>
                        {selectedRole === "tutor" && <div className="role-indicator"></div>}
                      </div>

                      <div
                        id="admin"
                        className={`role-space-wrapper ${selectedRole === "admin" ? "active" : ""}`}
                        onClick={() => handleRoleClick("admin")}
                      >
                        <MdOutlineAdminPanelSettings className="admin-user-icon" />
                        <div className="role-space-text">Espace Admin</div>
                        {selectedRole === "admin" && <div className="role-indicator"></div>}
                      </div>
                    </div>
                  </div>
                )}

                {selectedRole !== "student" && (
                  <div className="swapper-section-center">
                    <div className="top-section">
                      <img src={MainLogo2} alt="Secondary Logo" />
                    </div>
                    <div className="login-subtitle">
                      Connectez-vous et démarrez l'aventure PSC
                    </div>
                    <div className="center-section">
                      <Input 
                        placeholder="Email" 
                        className="login-input"
                        name="email"
                        value={loginForm.email}
                        onChange={handleInputChange}
                      />
                      <Input.Password
                        placeholder="Mot de passe"
                        className="login-input"
                        name="password"
                        value={loginForm.password}
                        onChange={handleInputChange}
                      />
                      <div 
                        className="login-button" 
                        onClick={handleLogin}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Connexion...' : 'Se Connecter'}
                      </div>
                      {selectedRole === 'tutor' && (
                        <div className="questions-wrapper">
                          <Link to="/forgot-password" className="forgot-password-link">
                            Mot de passe oublié ?
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedRole === "student" && (
                  <div className={`${createTeam ? "swapper-section-center-create-team" : "swapper-section-center"}`}>
                    {!createTeam ? (
                      <>
                        <div className="top-section">
                          <img src={MainLogo2} alt="Secondary Logo" />
                        </div>
                        <div className="login-subtitle">
                          Connectez-vous avec votre code d'accès
                        </div>
                        <div className="center-section student-interface">
                          <Input.OTP
                            length={7}
                            formatter={(str) => str.toUpperCase()}
                            value={authCode}
                            onChange={setAuthCode}
                          />
                          <div 
                            className="login-button" 
                            onClick={handleLogin}
                            disabled={authCode.length !== 7 || isLoading}
                          >
                            {isLoading ? 'Connexion...' : 'Se Connecter'}
                          </div>
                          <div className="questions-wrapper">
                            Pas encore d'équipe ?
                            <span
                              className="span-grey create-team-link"
                              onClick={handleCreateTeam}
                            >
                              Créez votre équipe ici
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="navigate-spaces-create-team-wrapper">
                          <div className="right-side-swap-create-team">
                            <div
                              id="student"
                              className="role-space-wrapper"
                              onClick={() => handleRoleClick("student")}
                            >
                              <PiStudentBold />
                            </div>
                            <div
                              id="tutor"
                              className={`role-space-wrapper ${selectedRole === "tutor" ? "active" : ""}`}
                              onClick={() => handleRoleClick("tutor")}
                            >
                              <FaChalkboardUser className="tutor-user-icon" />
                            </div>
                            <div
                              id="admin"
                              className={`role-space-wrapper ${selectedRole === "admin" ? "active" : ""}`}
                              onClick={() => handleRoleClick("admin")}
                            >
                              <MdOutlineAdminPanelSettings className="admin-user-icon" />
                            </div>
                          </div>
                        </div>
                        <div className="create-team-form">
                          {/* Team creation form remains the same */}
                          {/* ... */}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="login-page-right-side">
            <div className="login-page-right-side-top">
              {isSwapped && (
                <div className="back-arrow-wrapper">
                  <div className="back-arrow" onClick={handleToggleSwap}>
                    <img src={BackArrow} alt="Back Arrow" />
                  </div>
                </div>
              )}
              <div className="login-r-s-t-layer-1">
                {isSwapped && <Carousel data={slides} />}
              </div>
              <div className="login-r-s-t-opacity-layer-1"></div>
              <div className="login-r-s-t-layer-4">
                <div className="layer-4-text-wrapper">
                  Lorem ipsum dolor, sit amet <span>consectetur</span>{" "}
                  adipisicing elit. <span>Sequi</span> doloribus temporibus{" "}
                  <span>accusantium</span> culpa ut esse debitis aliquam.
                </div>
              </div>
            </div>
            {!isSwapped && (
              <div className="login-page-right-side-bottom">
                <div className="bottom-widget-wrapper wd-1">2K25</div>
                <div className="bottom-widget-wrapper wd-2">INNOVEZ 💡</div>
                <div className="bottom-widget-wrapper wd-3">COLLABOREZ</div>
                <div className="bottom-widget-wrapper wd-4">RÉALISEZ</div>
                <div className="bottom-widget-wrapper wd-5">IMPACTEZ </div>
                <div className="bottom-widget-wrapper wd-6">💪🔥</div>
                <div className="bottom-widget-wrapper wd-7">
                  AVENIR <span className="highlited-txt">DURABLE</span>
                </div>
                <div className="bottom-widget-wrapper wd-8">
                  INGENIEURS <span className="highlited-txt">ENGAGÉS</span>
                </div>
                <div className="bottom-widget-wrapper wd-9">EDUCATION</div>
                <div className="bottom-widget-wrapper wd-10">P.S.C</div>
                <div className="bottom-widget-wrapper wd-11">INSPIREZ </div>
              </div>
            )}
          </div>
        </>
      ) : teamCreationState.status === "creating" ? (
        <div className="team-space-creating visible">
          <div className="video-wrapper">
            <video autoPlay loop muted className="team-space-video">
              <source src={CreatingTeamSpaceLoader} type="video/mp4" />
            </video>
          </div>
          <div className="creating-space-text-wrapper">
            <div className="text-creating-team-space">
              <span>VOTRE ESPACE ÉQUIPE EN CONSTRUCTION ! PRÉPAREZ-VOUS À COLLABORER...</span>
            </div>
          </div>
          <div className="cancel-back-btns-wrapper">
            <div className="cancel-back-btn" onClick={handleCancelCreation}>Retour</div>
            <div className="annuler-button" onClick={handleResetForm}>Annuler</div>
          </div>
        </div>
      ) : teamCreationState.status === "success" ? (
        <div className="team-creation-success visible">
          <div className="code-auth-login-action-2" onClick={handleResetForm}>
            Continuer
          </div>
          <div className="success-msg-team-creation">
            <div className="first-success-msg">
              VOTRE ESPACE ÉQUIPE EST CRÉÉ AVEC SUCCÈS !
            </div>
            <div className="second-success-msg">
              CONSULTEZ VOTRE BOÎTE MAIL POUR RÉCUPÉRER VOTRE CODE D'ACCÈS
            </div>
          </div>
          <div className="success-video-team-creation">
            <video autoPlay playsInline loop={false} muted className="team-space-created-video">
              <source src={SuccessCreationVideo} />
            </video>
          </div>
          <img src={MAILBOT} alt="" className="mail-bot" />
        </div>
      ) : null}
    </div>
  );
};

export default LoginPage;