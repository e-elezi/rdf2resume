import axios from "axios";

export const getLabelFromURI = uri => {
  let uriIndex = uri.lastIndexOf("#");
  return uri.substring(uriIndex);
};

// export const processInitialEndpointData = (head, results) => {
//   let varNames = head.vars;
//   results = results.bindings;
// };

export const handleUpload = async data => {
  const response = await axios.post("/submit_form", data);
  return response;
};

export const processDataBeforeSubmit = cvData => {
  let education = Object.values(cvData.education);
  cvData.education = education;
  let courses = Object.values(cvData.courses);
  cvData.courses = courses;
  let workHistory = Object.values(cvData.workHistory);
  cvData.workHistory = workHistory;
  let references = Object.values(cvData.references);
  cvData.references = references;
  let otherInfo = Object.values(cvData.otherInfo);
  cvData.otherInfo = otherInfo;
  let OtherSkills = Object.values(cvData.skills.OtherSkills);
  cvData.skills.OtherSkills = OtherSkills;
  //console.log(handleUpload(cvData));
};
