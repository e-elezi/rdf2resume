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
  UPDATE_OTHER_INFO
} from "../actions/types";

const INITIAL_STATE = {
  cv: {},
  aboutCV: {},
  aboutPerson: {},
  target: {},
  education: [],
  courses: [],
  skills: [],
  references: [],
  workHistory: [],
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
    default:
      return state;
  }
};
