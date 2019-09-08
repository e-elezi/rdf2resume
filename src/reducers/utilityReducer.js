import {
  FETCH_ALL_COMPANY_SIZES,
  FETCH_ALL_COUNTRIES,
  FETCH_ALL_CV_CAREER_LEVELS,
  FETCH_ALL_CV_JOB_MODES,
  FETCH_ALL_EDU_DEGREES,
  FETCH_ALL_GENDERS,
  FETCH_ALL_IMS,
  FETCH_ALL_INDUSTRIES,
  FETCH_ALL_PATENTS,
  FETCH_ALL_REGIONS,
  FETCH_ALL_WEBSITES,
  FETCH_ALL_LANGUAGE_SELF_ASSESSMENT_PROPERTIES,
  FETCH_ALL_OTHER_CV_INFO_TYPES,
  FETCH_ALL_SELF_ASSESSMENT_PROPERTIES,
  FETCH_ALL_TITLE_PROPERTIES,
  TOGGLE_SPINNER,
  UPDATE_LANGUAGE,
  FETCH_MAIN_PROPERTIES
} from "../actions/types";

const INITIAL_STATE = {
  ims: [],
  industries: [],
  patents: [],
  regions: [],
  websites: [],
  'my0:CV': [],
  'my0:Person': [],
  'my0:WorkHistory': [],
  'my0:Education': [],
  'my0:Organization': [],
  'my0:Address': [],
  'my0:Publication': [],
  'my0:Patent': [],
  'my0:Project': [],
  'my0:Reference': [],
  'my0:Skill': [],
  'my0:Course': [],
  'my0:OtherInfo': [],
  'my0:Website': [],
  'my0:InstantMessaging': [],
  'my0:HonorAward': [],
  'my0:Target': [],
  countryValues: [],
  genderValues: [],
  jobModeValues: [],
  careerLevelValues: [],
  selfAssessmentValues: [],
  languageSelfAssessmentValues: [],
  companySizeValues: [],
  otherCVInfoValues: [],
  titleValues: [],
  eduDegreeValues: [],
  showSpinner: false,
  language: 'en'
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
    case TOGGLE_SPINNER:
        return { ...state, showSpinner: action.payload };
    case UPDATE_LANGUAGE:
        return { ...state, language: action.payload };
    case FETCH_ALL_IMS:
        return { ...state, ims: action.payload };
    case FETCH_ALL_INDUSTRIES:
        return { ...state, industries: action.payload };
    case FETCH_ALL_WEBSITES:
        return { ...state, websites: action.payload };
    case FETCH_ALL_REGIONS:
        return { ...state, regions: action.payload };
    case FETCH_ALL_PATENTS:
        return { ...state, patents: action.payload };
    case FETCH_MAIN_PROPERTIES:
        return { ...state,  [action.payload.object]: action.payload.data };
    default:
      return state;
  }
};
