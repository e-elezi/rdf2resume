import endpoint from "../api/endpoint";
import { fetchCVQuery, fetchAboutCV } from "../utilities/utilityQueries";
import { Save_CV, FETCH_CV, UPDATE_CV } from "./types";

// export const saveCV = formValues =>  (dispatch, getState) => {
//     //const { userId } = getState().auth;
//     //const response = await endpoint.post("/cv", { ...formValues, userId });

//     dispatch({ type: Save_CV, payload: "Successful" });
//   };

const queries = {
  fetch_cv:
    'prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n ?cv\n  WHERE {\n ?cv a my0:CV;\n my0:aboutPerson ?person.\n ?person my0:firstName "Enkeleda";\n my0:lastName "Elezi".\n }'
};

export const fetchendpoint = (firstName, lastName) => async dispatch => {
  let queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchCVQuery(firstName, lastName)) +
    "&format=json";
  console.log(queryUrl);
  let response = await endpoint.get(queryUrl);

  let cvURI = response.data.results.bindings[0].cv.value;
  console.log(cvURI);
  queryUrl =
    "http://localhost:3030/resume/query" +
    "?query=" +
    encodeURIComponent(fetchAboutCV(cvURI)) +
    "&format=json";
  console.log(queryUrl);
  response = await endpoint.get(queryUrl);
  console.log(response.data);
  dispatch({
    type: FETCH_CV,
    payload: response
  });
};

//   export const fetchStream = id => async dispatch => {
//     const response = await endpoint.get(`/cv/${id}`);
//     dispatch({ type: FETCH_STREAM, payload: response.data });
//   };

//   export const editStream = (id, formValues) => async dispatch => {
//     const response = await endpoint.patch(`/cv/${id}`, formValues);
//     dispatch({ type: EDIT_STREAM, payload: response.data });
//     history.push("/");
//   };
