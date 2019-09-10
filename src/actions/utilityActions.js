import endpoint from "../api/endpoint";
import {
  fetchAllCountries,
  fetchMainProperties,
  fetchBaseProperties
} from "../utilities/utilityQueries";
import {
  FETCH_ALL_COMPANY_SIZES,
  FETCH_ALL_IMS,
  FETCH_ALL_INDUSTRIES,
  FETCH_ALL_REGIONS,
  FETCH_ALL_WEBSITES,
  FETCH_ALL_PATENTS,
  FETCH_ALL_COUNTRIES,
  FETCH_ALL_CV_CAREER_LEVELS,
  FETCH_ALL_CV_JOB_MODES,
  FETCH_ALL_EDU_DEGREES,
  FETCH_ALL_GENDERS,
  FETCH_ALL_LANGUAGE_SELF_ASSESSMENT_PROPERTIES,
  FETCH_ALL_OTHER_CV_INFO_TYPES,
  FETCH_ALL_SKILL_CATEGORIES,
  FETCH_MAIN_PROPERTIES,
  FETCH_ALL_TITLE_PROPERTIES,
  TOGGLE_SPINNER,
  UPDATE_ERROR,
  UPDATE_LANGUAGE
} from "./types";

export const fetchCountries = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchAllCountries()) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_COUNTRIES,
    payload: response.data.results.bindings
  });
};

export const fetchSkillCategories = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:SkillCategoryProperty')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_SKILL_CATEGORIES,
    payload: response.data.results.bindings
  });
};

export const updateError = (value) => {
  return {
    type: UPDATE_ERROR,
    payload: value
  };
};

export const fetchCVCareerLevels = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:CVCareerLevel')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_CV_CAREER_LEVELS,
    payload: response.data.results.bindings
  });
};

export const fetchCompanySizes = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:CompanySize')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_COMPANY_SIZES,
    payload: response.data.results.bindings
  });
};

export const fetchCVJobModes = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:CVJobMode')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_CV_JOB_MODES,
    payload: response.data.results.bindings
  });
};

export const fetchEduDegrees = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:EduDegree')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_EDU_DEGREES,
    payload: response.data.results.bindings
  });
};

export const fetchLanguageSkillSelfAssessmentProperties = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:LanguageSkillProficiencyProperty')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_LANGUAGE_SELF_ASSESSMENT_PROPERTIES,
    payload: response.data.results.bindings
  });
};

export const fetchTitleProperties = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:TitleProperty')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_TITLE_PROPERTIES,
    payload: response.data.results.bindings
  });
};

export const fetchGenders = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:GenderProperty')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_GENDERS,
    payload: response.data.results.bindings
  });
};

export const fetchOtherCVInfoTypes = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:OtherCVInfoType')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_OTHER_CV_INFO_TYPES,
    payload: response.data.results.bindings
  });
};

export const fetchAllIMTypess = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:InstantMessagingTypeProperty')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_IMS,
    payload: response.data.results.bindings
  });
};

export const fetchAllIndustryTypess = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:IndustryType')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_INDUSTRIES,
    payload: response.data.results.bindings
  });
};

export const fetchAllRegionss = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:RegionProperty')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_REGIONS,
    payload: response.data.results.bindings
  });
};

export const fetchAllWebsiteTypess = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:WebsiteTypeProperty')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_WEBSITES,
    payload: response.data.results.bindings
  });
};

export const fetchAllPatentStatusess = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchBaseProperties('mybase0:StatusProperty')) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_PATENTS,
    payload: response.data.results.bindings
  });
};

export const fetchMainPropertiess = (object) => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchMainProperties(object)) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_MAIN_PROPERTIES,
    payload: {
      data: response.data.results.bindings,
      object: object
    }
  });
};

export const toggleSpinner = (showSpinnerBoolean) =>{
  return {
    type: TOGGLE_SPINNER,
    payload: showSpinnerBoolean
  }
}

export const updateLanguage = (value) =>{
  return {
    type: UPDATE_LANGUAGE,
    payload: value
  }
}