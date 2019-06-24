// import endpoint from "../api/endpoint";
// import {
//   fetchCVQuery,
//   fetchAboutCV,
//   fetchAboutPerson
// } from "../utilities/utilityQueries";
// import {
//   FETCH_CV,
//   FETCH_ABOUT_CV,
//   FETCH_ABOUT_PERSON
//   //FETCH_COURSES,
//   //FETCH_EDUCATION,
//   //FETCH_OTHER_INFO,
//   //FETCH_REFERENCES,
//   //FETCH_SKILLS,
//   //FETCH_TARGET,
//   //FETCH_WORK_HISTORY
// } from "./types";

// export const fetchCVURI = (firstName, lastName) => async dispatch => {
//   let queryUrl =
//     "http://localhost:3030/resume/query" +
//     "?query=" +
//     encodeURIComponent(fetchCVQuery(firstName, lastName)) +
//     "&format=json";
//   let response = await endpoint.get(queryUrl);
//   let cvURI = response.data.results.bindings[0].cv.value;
//   dispatch({
//     type: FETCH_CV,
//     payload: cvURI
//   });
// };

// export const fetchABoutCVInfo = () => async (dispatch, getState) => {
//   const { cv } = getState().cv;
//   console.log(getState().cv, cv);
//   let queryUrl =
//     "http://localhost:3030/resume/query" +
//     "?query=" +
//     encodeURIComponent(fetchAboutCV(cv)) +
//     "&format=json";
//   let response = await endpoint.get(queryUrl);
//   console.log(response);
//   dispatch({
//     type: FETCH_ABOUT_CV,
//     payload: response.data.results.bindings[0]
//   });
// };

// export const fetchAboutPersonInfo = () => async (dispatch, getState) => {
//   const { cv } = getState().cv;
//   console.log(getState().cv, cv);
//   let queryUrl =
//     "http://localhost:3030/resume/query" +
//     "?query=" +
//     encodeURIComponent(fetchAboutPerson(cv)) +
//     "&format=json";
//   let response = await endpoint.get(queryUrl);
//   console.log(response.data.results.bindings);
//   dispatch({
//     type: FETCH_ABOUT_PERSON,
//     payload: response.data.results.bindings[0]
//   });
// };

import {
  CREATE_OTHER_INFO,
  UPDATE_OTHER_INFO,
  REMOVE_OTHER_INFO,
  CREATE_REFERENCE,
  UPDATE_REFERENCE,
  REMOVE_REFERENCE
} from "./types";

export const createOtherInfo = formValues => {
  return {
    type: CREATE_OTHER_INFO,
    payload: formValues
  };
};

export const updateOtherInfo = formValues => {
  return {
    type: UPDATE_OTHER_INFO,
    payload: formValues
  };
};

export const removeOtherInfo = index => {
  return {
    type: REMOVE_OTHER_INFO,
    payload: index
  };
};

export const createReference = formValues => {
  return {
    type: CREATE_REFERENCE,
    payload: formValues
  };
};

export const updateReference = formValues => {
  return {
    type: UPDATE_REFERENCE,
    payload: formValues
  };
};

export const removeReference = index => {
  return {
    type: REMOVE_REFERENCE,
    payload: index
  };
};
