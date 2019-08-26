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
  UPDATE_OTHER_INFO,
  CREATE_IM,
  UPDATE_IM,
  REMOVE_IM,
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
  UPDATE_SKILLS,
  UPDATE_CV
} from "../actions/types";
import { 
  // getDataOfId, 
  getDataOfType, 
  // setDataOfId, 
  createObjInGraph,
  updateObjInGraph,
  removeObjInGraph,
  setDataOfId
 } from '../utilities/utilityFunctions';

export function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'Nxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

// var id_CV = generateUUID();
// var id_aboutPerson = generateUUID();
// var id_personAddress = generateUUID();
// var id_target = generateUUID();
// var id_CommunicationSkills = generateUUID();
// var id_OrganisationalSkills = generateUUID();
// var id_JobRelatedSkills = generateUUID();
// var id_DigitalSkills = generateUUID();

const INITIAL_STATE = {
  "my0:hasReference": [],
  "my0:hasWorkHistory": [],
  "my0:cvLastUpdated": "",
  "my0:cvIsConfidential": false,
  "my0:cvCopyright": "",
  "my0:cvNotes": "",
  "my0:hasCourse": [],
  "my0:aboutPerson": {
    "my0:hasNationality": [],
    "my0:firstName": "",
    "my0:lastName": "",
    "my0:hasInstantMessaging": [],
    "my0:dateOfBirth": "",
    "@type": "my0:Person",
    "my0:email": "",
    "my0:photo": "",
    "my0:title": "",
    "my0:driversLicence": "",
    "my0:website": "",
    "my0:hasCitizenship": [],
    "my0:address": {
      "@type": "my0:Address",
      "my0:country": "",
      "my0:postalCode": "",
      "my0:street": "",
      "my0:city": ""
    },
    "my0:hasTelephoneNumber": [],
    "my0:gender": ""
  },
  "my0:hasSkill": [
  {
    "@type": "my0:CommunicationSkills",
    "my0:skillDescription": ""
  },
  {
    "@type": "my0:OrganisationalSkills",
    "my0:skillDescription": ""
  },
  {
    "@type": "my0:JobRelatedSkills",
    "my0:skillDescription": ""
  },
  {
    "my0:otherDigitalSkills": "",
    "@type": "my0:DigitalSkills",
    "my0:informationProcessing": "",
    "my0:problemSolving": "",
    "my0:hasICTCertificate": false,
    "my0:safety": "",
    "my0:contentCreation": "",
    "my0:communication": ""
  }],
  "@type": "my0:CV",
  "my0:target": {
    "my0:targetJobDescription": "",
    "my0:targetJobTitle": "",
    "my0:targetCompanyIndustry": [],
    "my0:targetSalaryCurrency": "",
    "my0:weeksNoticePeriod": "",
    "my0:targetCompanyCountry": [],
    "my0:conditionWillTravel": true,
    "my0:targetJobMode": "",
    "my0:conditionWillRelocate": true,
    "my0:targetSalaryRange": "",
    "my0:targetCompanySize": "",
    "@type": "my0:Target",
    "my0:targetJobCareerLevel": "",
    "my0:targetCompanyLocality": "",
    "my0:targetCompanyDescription": ""
    },
    "my0:hasOtherInfo": [],
    "my0:cvTitle": "",
    "my0:hasEducation": [],
    "my0:cvIsActive": true,
    "@context": {
      "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
      "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      "country": "http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#",
      "my0": "http://example.com/rdf2resume_ontology.rdf#",
      "xsd": "http://www.w3.org/2001/XMLSchema#",
      "mybase0": "http://example.com/rdf2resume_base_ontology.rdf#"
    }
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
      return { ...state["my0:hasOtherInfo"], ..._.mapKeys(action.payload, "id") };
    case CREATE_OTHER_INFO:
      let otherinfos = {...state};
      otherinfos['my0:hasOtherInfo'].push(action.payload);
      return otherinfos;
    case UPDATE_OTHER_INFO:
      let updateotherinfos = {...state};
      updateotherinfos['my0:hasOtherInfo'][action.payload.index] = action.payload.object;
      return updateotherinfos;
    case REMOVE_OTHER_INFO:
      let removedotherinfo = {...state}['my0:hasOtherInfo'];
      let removedotherinfos = _.filter(removedotherinfo, function(item, index) { return index !== action.payload; });
      return { ...state, "my0:hasOtherInfo": removedotherinfos };
    case CREATE_REFERENCE:
      let references = {...state};
      references['my0:hasReference'].push(action.payload);
      return references;
    case UPDATE_REFERENCE:
      let updatereferences = {...state};
      updatereferences['my0:hasReference'][action.payload.index] = action.payload.object;
      return updatereferences;
    case REMOVE_REFERENCE:
      let removereference = {...state}['my0:hasReference'];
      let removereferences = _.filter(removereference, function(item, index) { return index !== action.payload; });
      return { ...state, "my0:hasReference": removereferences };
    case CREATE_WORK_HISTORY:
      let workhistories = {...state};
      workhistories['my0:hasWorkHistory'].push(action.payload);
      return workhistories;
    case UPDATE_WORK_HISTORY:
      let updateworkhistories = {...state};
      updateworkhistories['my0:hasWorkHistory'][action.payload.index] = action.payload.object;
      return updateworkhistories;
    case REMOVE_WORK_HISTORY:
      let removeworkhistory = {...state}['my0:hasWorkHistory'];
      let removeworkhistorys = _.filter(removeworkhistory, function(item, index) { return index !== action.payload; });
      return { ...state, "my0:hasWorkHistory": removeworkhistorys };
    case CREATE_EDUCATION:
      let educations = {...state};
      educations['my0:hasEducation'].push(action.payload);
      return educations;
    case UPDATE_EDUCATION:
      let updateeducations = {...state};
      updateeducations['my0:hasEducation'][action.payload.index] = action.payload.object;
      return updateeducations;
    case REMOVE_EDUCATION:
      let removeeducation = {...state}['my0:hasEducation'];
      let removeeducations = _.filter(removeeducation, function(item, index) { return index !== action.payload; });
      return { ...state, "my0:hasEducation": removeeducations };
    case CREATE_COURSE:
      let courses = {...state};
      courses['my0:hasCourse'].push(action.payload);
      return courses;
    case UPDATE_COURSE:
      let updatecourses = {...state};
      updatecourses['my0:hasCourse'][action.payload.index] = action.payload.object;
      return updatecourses;
    case REMOVE_COURSE:
      let removecourses = {...state}['my0:hasCourse'];
      let removecoursess = _.filter(removecourses, function(item, index) { return index !== action.payload; });
      return { ...state, "my0:hasCourse": removecoursess };
    case CREATE_OTHER_SKILL:
      let otherskills = {...state};
      otherskills['my0:hasSkill'].push(action.payload);
      return otherskills;
    case UPDATE_OTHER_SKILL:
      let updatedskill = {...state};
      updatedskill['my0:hasSkill'][action.payload.index] = action.payload.object;
      return updatedskill;
    case REMOVE_OTHER_SKILL:
      let removedskills = {...state}['my0:hasSkill'];
      let removedskillss = _.filter(removedskills, function(item, index) { return index !== action.payload; });
      return { ...state, "my0:hasSkill": removedskillss };
    case UPDATE_ABOUT_CV:
      let aboutcv = { ...state};
      aboutcv["my0:" + action.payload.id] = action.payload.value;
      return aboutcv;
    case UPDATE_ABOUT_PERSON:
      let aboutperson = { ...state};
      if(action.payload.secondLevel && action.payload.secondLevel !== undefined){
        aboutperson['my0:aboutPerson']["my0:" + action.payload.secondLevel]["my0:" + action.payload.id] = action.payload.value;
      } else {
        aboutperson['my0:aboutPerson']["my0:" + action.payload.id] = action.payload.value;
      }
      return aboutperson;
    case UPDATE_SKILLS:
      let updatedSkills = {...state};
      updatedSkills['my0:hasSkill'] = action.payload; 
      return updatedSkills;
    case UPDATE_TARGET:
        let updatetarget = { ...state};
        updatetarget['my0:target']["my0:" + action.payload.id] = action.payload.value;
        return updatetarget;
    case UPDATE_CV:
      return { ...action.payload};
    case CREATE_IM:
      let ap = { ...state};
      ap['my0:aboutPerson']['my0:hasInstantMessaging'].push(
        {
          "@type": "my0:InstantMessaging",
          "my0:instantMessagingName": "",
          "my0:instantMessagingUsername": ""
        }
      );
      return ap;
    case UPDATE_IM:
      let uap = { ...state};
      uap['my0:aboutPerson']['my0:hasInstantMessaging'][action.payload.id][action.payload.name] = action.payload.value;
      return uap;
    case REMOVE_IM:
      let removedim = {...state}['my0:aboutPerson'];
      let removedims = _.filter(removedim['my0:hasInstantMessaging'], function(item, index) { return index !== action.payload; });
      removedim['my0:hasInstantMessaging'] = removedims;
      return { ...state, "my0:aboutPerson": removedim };
    default:
      return state;
  }
};
