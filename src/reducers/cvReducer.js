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
  REMOVE_COURSE
} from "../actions/types";

const INITIAL_STATE = {
  cv: {},
  aboutCV: {},
  aboutPerson: {},
  target: {},
  education: {},
  courses: {},
  skills: [],
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
    default:
      return state;
  }
};
