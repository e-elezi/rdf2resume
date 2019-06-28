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
  UPDATE_SKILLS
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

export const createWorkHistory = formValues => {
  return {
    type: CREATE_WORK_HISTORY,
    payload: formValues
  };
};

export const updateWorkHistory = formValues => {
  return {
    type: UPDATE_WORK_HISTORY,
    payload: formValues
  };
};

export const removeWorkHistory = index => {
  return {
    type: REMOVE_WORK_HISTORY,
    payload: index
  };
};

export const createEducation = formValues => {
  return {
    type: CREATE_EDUCATION,
    payload: formValues
  };
};

export const updateEducation = formValues => {
  return {
    type: UPDATE_EDUCATION,
    payload: formValues
  };
};

export const removeEducation = index => {
  return {
    type: REMOVE_EDUCATION,
    payload: index
  };
};

export const createCourse = formValues => {
  return {
    type: CREATE_COURSE,
    payload: formValues
  };
};

export const updateCourse = formValues => {
  return {
    type: UPDATE_COURSE,
    payload: formValues
  };
};

export const removeCourse = index => {
  return {
    type: REMOVE_COURSE,
    payload: index
  };
};

export const createOtherSkill = formValues => {
  return {
    type: CREATE_OTHER_SKILL,
    payload: formValues
  };
};

export const updateOtherSkill = formValues => {
  return {
    type: UPDATE_OTHER_SKILL,
    payload: formValues
  };
};

export const removeOtherSkill = index => {
  return {
    type: REMOVE_OTHER_SKILL,
    payload: index
  };
};

export const updateAboutCV = formValues => {
  return {
    type: UPDATE_ABOUT_CV,
    payload: formValues
  }
}

export const updateAboutPerson = formValues => {
  return {
    type: UPDATE_ABOUT_PERSON,
    payload: formValues
  }
}

export const updateSkills = formValues => {
  return {
    type: UPDATE_SKILLS,
    payload: formValues
  }
}

export const updateTarget = formValues => {
  return {
    type: UPDATE_TARGET,
    payload: formValues
  }
}