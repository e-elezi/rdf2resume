import {
  FETCH_ALL_COMPANY_SIZES,
  FETCH_ALL_COUNTRIES,
  FETCH_ALL_CV_CAREER_LEVELS,
  FETCH_ALL_CV_JOB_MODES,
  FETCH_ALL_EDU_DEGREES,
  FETCH_ALL_GENDERS,
  FETCH_ALL_LANGUAGE_SELF_ASSESSMENT_PROPERTIES,
  FETCH_ALL_OTHER_CV_INFO_TYPES,
  FETCH_ALL_SELF_ASSESSMENT_PROPERTIES,
  FETCH_ALL_TITLE_PROPERTIES
} from "../actions/types";

const INITIAL_STATE = {
  countryValues: [],
  genderValues: [],
  jobModeValues: [],
  careerLevelValues: [],
  selfAssessmentValues: [],
  languageSelfAssessmentValues: [],
  companySizeValues: [],
  otherCVInfoValues: [],
  titleValues: [],
  eduDegreeValues: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_COMPANY_SIZES:
      return { ...state, companySizeValues: action.payload };
    case FETCH_ALL_COUNTRIES:
      return { ...state, countryValues: action.payload };
    case FETCH_ALL_CV_CAREER_LEVELS:
      return { ...state, careerLevelValues: action.payload };
    case FETCH_ALL_CV_JOB_MODES:
      return { ...state, jobModeValues: action.payload };
    case FETCH_ALL_EDU_DEGREES:
      return { ...state, eduDegreeValues: action.payload };
    case FETCH_ALL_GENDERS:
      return { ...state, genderValues: action.payload };
    case FETCH_ALL_LANGUAGE_SELF_ASSESSMENT_PROPERTIES:
      return { ...state, languageSelfAssessmentValues: action.payload };
    case FETCH_ALL_OTHER_CV_INFO_TYPES:
      return { ...state, otherCVInfoValues: action.payload };
    case FETCH_ALL_SELF_ASSESSMENT_PROPERTIES:
      return { ...state, selfAssessmentValues: action.payload };
    case FETCH_ALL_TITLE_PROPERTIES:
      return { ...state, titleValues: action.payload };
    default:
      return state;
  }
};
