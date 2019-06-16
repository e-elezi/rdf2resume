import endpoint from "../api/endpoint";
import { Save_CV, FETCH_CV, UPDATE_CV } from "./types";

// export const saveCV = formValues =>  (dispatch, getState) => {
//     //const { userId } = getState().auth;
//     //const response = await endpoint.post("/cv", { ...formValues, userId });
    
//     dispatch({ type: Save_CV, payload: "Successful" });
//   };
  
//   export const fetchendpoint = () =>  dispatch => {
//     //const response = await endpoint.get("/cv");
//     dispatch({ type: FETCH_CV, payload:  });
//   };
  
//   export const fetchStream = id => async dispatch => {
//     const response = await endpoint.get(`/cv/${id}`);
//     dispatch({ type: FETCH_STREAM, payload: response.data });
//   };
  
//   export const editStream = (id, formValues) => async dispatch => {
//     const response = await endpoint.patch(`/cv/${id}`, formValues);
//     dispatch({ type: EDIT_STREAM, payload: response.data });
//     history.push("/");
//   };
