import endpoint from "../api/endpoint";
import {
  fetchAllCVCareerLevels,
  fetchAllCVJobModes,
  fetchAllCompanySizes,
  fetchAllCountries,
  fetchAllEduDegrees,
  fetchAllGenders,
  fetchAllLanguageSkillSelfAssessmentProperties,
  fetchAllOtherCVInfoTypes,
  fetchAllSelfAssessmentProperties,
  fetchAllTitleProperties
} from "../utilities/utilityQueries";
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
  FETCH_ALL_TITLE_PROPERTIES,
  TOGGLE_SPINNER
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

export const fetchCVCareerLevels = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchAllCVCareerLevels()) +
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
    encodeURIComponent(fetchAllCompanySizes()) +
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
    encodeURIComponent(fetchAllCVJobModes()) +
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
    encodeURIComponent(fetchAllEduDegrees()) +
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
    encodeURIComponent(fetchAllLanguageSkillSelfAssessmentProperties()) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_LANGUAGE_SELF_ASSESSMENT_PROPERTIES,
    payload: response.data.results.bindings
  });
};

export const fetchSelfAssessmentProperties = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchAllSelfAssessmentProperties()) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_SELF_ASSESSMENT_PROPERTIES,
    payload: response.data.results.bindings
  });
};

export const fetchTitleProperties = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchAllTitleProperties()) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  console.log(response);
  dispatch({
    type: FETCH_ALL_TITLE_PROPERTIES,
    payload: response.data.results.bindings
  });
};

export const fetchGenders = () => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchAllGenders()) +
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
    encodeURIComponent(fetchAllOtherCVInfoTypes()) +
    "&format=json";
  let response = await endpoint.get(queryUrl);
  dispatch({
    type: FETCH_ALL_OTHER_CV_INFO_TYPES,
    payload: response.data.results.bindings
  });
};

export const toggleSpinner = (showSpinnerBoolean) =>{
  return {
    type: TOGGLE_SPINNER,
    payload: showSpinnerBoolean
  }
}