import _ from "lodash";

import {
  FETCH_CV,
  FETCH_ABOUT_CV,
  FETCH_TARGET,
  FETCH_ABOUT_PERSON,
  FETCH_COURSES,
  FETCH_EDUCATION,
  FETCH_OTHER_INFO,
  FETCH_REFERENCES,
  FETCH_SKILLS,
  FETCH_WORK_HISTORY,
  CREATE_OTHER_INFO,
  REMOVE_OTHER_INFO,
  UPDATE_OTHER_INFO,
  CREATE_REFERENCE,
  UPDATE_REFERENCE,
  REMOVE_REFERENCE,
  CREATE_WORK_HISTORY,
  UPDATE_WORK_HISTORY,
  REMOVE_WORK_HISTORY,
  CREATE_EDUCATION,
  UPDATE_EDUCATION,
  REMOVE_EDUCATION,
  CREATE_COURSE,
  UPDATE_COURSE,
  REMOVE_COURSE,
  CREATE_OTHER_SKILL,
  UPDATE_OTHER_SKILL,
  REMOVE_OTHER_SKILL,
  UPDATE_ABOUT_CV,
  UPDATE_ABOUT_PERSON,
  UPDATE_TARGET,
  UPDATE_COMMUNICATION_SKILLS,
  UPDATE_JOB_RELATED_SKILLS,
  UPDATE_ORGANISATIONAL_SKILLS,
  UPDATE_OTHER_LANGUAGES_SKILL,
  UPDATE_MOTHER_TONGUE,
  UPDATE_DS_CC,
  UPDATE_DS_CERTIFICATE,
  UPDATE_DS_CO,
  UPDATE_DS_INFO_PROC,
  UPDATE_DS_OTHER,
  UPDATE_DS_PS,
  UPDATE_DS_SAFETY
} from "../actions/types";

const INITIAL_STATE = {
  cv: {},
  aboutCV: {},
  aboutPerson: {},
  target: {},
  education: {},
  courses: {},
  skills: {
    CommunicationSkills: {
      label: "Communication Skills",
      description: ""
    },
    OrganisationalSkills: {
      label: "Organisational Skills",
      description: ""
    },
    JobRelatedSkills: {
      label: "Job Related Skills",
      description: ""
    },
    DigitalSkills: {
      label: "Digital Skills",
      hasICTCertificate: "",
      otherDigitalSkills: "",
      informationProcessing: {
        label: "Information Processing",
        value: ""
      },
      communication: {
        label: "Communication",
        value: ""
      },
      contentCreation: {
        label: "Content Creation",
        value: ""
      },
      safety: {
        label: "Safety",
        value: ""
      },
      problemSolving: {
        label: "Problem Solving",
        value: ""
      }
    },
    LanguageSkill: {
      MotherTongue: [],
      OtherLanguages: []
    },
    OtherSkills: {
      // 1: {
      //   skillName: "",
      //   skillDescription: "",
      //   skillLevel: "",
      //   skillLastUsed: "",
      //   skillYearsExperience: "",
      //   skillHasCertificate: true,
      //   id: 1
      // }
    }
  },
  references: {},
  workHistory: {},
  otherInfo: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CV:
      return { ...state, cv: action.payload };
    case FETCH_ABOUT_CV:
      return { ...state, aboutCV: action.payload };
    case FETCH_ABOUT_PERSON:
      return { ...state, aboutPerson: action.payload };
    case FETCH_TARGET:
      return { ...state, target: action.payload };
    case FETCH_EDUCATION:
      return { ...state, education: action.payload };
    case FETCH_COURSES:
      return { ...state, courses: action.payload };
    case FETCH_WORK_HISTORY:
      return { ...state, workHistory: action.payload };
    case FETCH_SKILLS:
      return { ...state, skills: action.payload };
    case FETCH_REFERENCES:
      return { ...state, references: action.payload };
    case FETCH_OTHER_INFO:
      return { ...state.otherInfo, ..._.mapKeys(action.payload, "id") };
    case CREATE_OTHER_INFO:
      let otherInfos = {
        ...state.otherInfo,
        [action.payload.id]: action.payload
      };
      return { ...state, otherInfo: otherInfos };
    case UPDATE_OTHER_INFO:
      otherInfos = {
        ...state.otherInfo,
        [action.payload.id]: action.payload
      };
      return { ...state, otherInfo: otherInfos };
    case REMOVE_OTHER_INFO:
      let kot = _.omit(state.otherInfo, action.payload);
      return { ...state, otherInfo: kot };
    case CREATE_REFERENCE:
      let myreferences = {
        ...state.references,
        [action.payload.id]: action.payload
      };
      return { ...state, references: myreferences };
    case UPDATE_REFERENCE:
      let myupdatereferences = {
        ...state.references,
        [action.payload.id]: action.payload
      };
      return { ...state, references: myupdatereferences };
    case REMOVE_REFERENCE:
      let removedreferences = _.omit(state.references, action.payload);
      return { ...state, references: removedreferences };
    case CREATE_WORK_HISTORY:
      let myworks = {
        ...state.workHistory,
        [action.payload.id]: action.payload
      };
      return { ...state, workHistory: myworks };
    case UPDATE_WORK_HISTORY:
      let updateworks = {
        ...state.workHistory,
        [action.payload.id]: action.payload
      };
      return { ...state, workHistory: updateworks };
    case REMOVE_WORK_HISTORY:
      let removedwork = _.omit(state.workHistory, action.payload);
      return { ...state, workHistory: removedwork };
    case CREATE_EDUCATION:
      let myedu = {
        ...state.education,
        [action.payload.id]: action.payload
      };
      return { ...state, education: myedu };
    case UPDATE_EDUCATION:
      let updateedu = {
        ...state.education,
        [action.payload.id]: action.payload
      };
      return { ...state, education: updateedu };
    case REMOVE_EDUCATION:
      let removededu = _.omit(state.education, action.payload);
      return { ...state, education: removededu };
    case CREATE_COURSE:
      let mycourse = {
        ...state.courses,
        [action.payload.id]: action.payload
      };
      return { ...state, courses: mycourse };
    case UPDATE_COURSE:
      let updatecourse = {
        ...state.courses,
        [action.payload.id]: action.payload
      };
      return { ...state, courses: updatecourse };
    case REMOVE_COURSE:
      let removecourse = _.omit(state.courses, action.payload);
      return { ...state, courses: removecourse };
    case CREATE_OTHER_SKILL:
      let myskills = {
        ...state.skills
      };
      let myotherskills = {
        ...myskills.OtherSkills,
        [action.payload.id]: action.payload
      };
      myskills.OtherSkills = myotherskills;
      return { ...state, skills: myskills };
    case UPDATE_OTHER_SKILL:
      let myupdateskills = {
        ...state.skills
      };
      let myupdateotherskills = {
        ...myupdateskills.OtherSkills,
        [action.payload.id]: action.payload
      };
      myupdateskills.OtherSkills = myupdateotherskills;
      return { ...state, skills: myupdateskills };
    case REMOVE_OTHER_SKILL:
      let myremoveskills = {
        ...state.skills
      };
      let myremoveotherskills = _.omit(
        myremoveskills.OtherSkills,
        action.payload
      );
      myremoveskills.OtherSkills = myremoveotherskills;
      return { ...state, skills: myremoveskills };
    case UPDATE_ABOUT_CV:
      return { ...state, aboutCV: action.payload };
    case UPDATE_ABOUT_PERSON:
      return { ...state, aboutPerson: action.payload };
    case UPDATE_TARGET:
      return { ...state, target: action.payload };
    case UPDATE_COMMUNICATION_SKILLS:
      let mycoskills = {
        ...state.skills
      };
      mycoskills.CommunicationSkills.description = action.payload;
      return { ...state, skills: mycoskills };
    case UPDATE_JOB_RELATED_SKILLS:
      let myjoskills = {
        ...state.skills
      };
      myjoskills.JobRelatedSkills.description = action.payload;
      return { ...state, skills: myjoskills };
    case UPDATE_ORGANISATIONAL_SKILLS:
      let myoskills = {
        ...state.skills
      };
      myoskills.OrganisationalSkills.description = action.payload;
      return { ...state, skills: myoskills };
    case UPDATE_OTHER_LANGUAGES_SKILL:
      let myolskills = {
        ...state.skills
      };
      myolskills.LanguageSkill.OtherLanguages = action.payload;
      return { ...state, skills: myolskills };
    case UPDATE_MOTHER_TONGUE:
      let mymtskills = {
        ...state.skills
      };
      mymtskills.LanguageSkill.MotherTongue = action.payload;
      return { ...state, skills: mymtskills };
    case UPDATE_DS_CC:
      let myccskills = {
        ...state.skills
      };
      myccskills.DigitalSkills.contentCreation = action.payload;
      return { ...state, skills: myccskills };
    case UPDATE_DS_CERTIFICATE:
      let mycertskills = {
        ...state.skills
      };
      mycertskills.DigitalSkills.hasICTCertificate = action.payload;
      return { ...state, skills: mycertskills };
    case UPDATE_DS_CO:
      let myc0skills = {
        ...state.skills
      };
      myc0skills.DigitalSkills.communication = action.payload;
      return { ...state, skills: myc0skills };
    case UPDATE_DS_INFO_PROC:
      let myinfoprocskills = {
        ...state.skills
      };
      myinfoprocskills.DigitalSkills.informationProcessing = action.payload;
      return { ...state, skills: myinfoprocskills };
    case UPDATE_DS_OTHER:
      let myotherssskills = {
        ...state.skills
      };
      myotherssskills.DigitalSkills.otherDigitalSkills = action.payload;
      return { ...state, skills: myotherssskills };
    case UPDATE_DS_PS:
      let mypssskills = {
        ...state.skills
      };
      mypssskills.DigitalSkills.problemSolving = action.payload;
      return { ...state, skills: mypssskills };
    case UPDATE_DS_SAFETY:
      let mysafetyskills = {
        ...state.skills
      };
      mysafetyskills.DigitalSkills.safety = action.payload;
      return { ...state, skills: mysafetyskills };
    default:
      return state;
  }
};
