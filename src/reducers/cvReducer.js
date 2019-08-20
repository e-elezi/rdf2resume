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

const INITIAL_STATE = {
  "@context": {
    "my0" : "http://example.com/rdf2resume_ontology.rdf#",
    "mybase0" : "http://example.com/rdf2resume_base_ontology.rdf#",
    "country" : "http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#"
  },
  "@type" : "my0:CV",
  "my0:cvTitle" : "",
  "my0:cvNotes" : "",
  "my0:cvIsActive" : true,
  "my0:cvIsConfidential" : false,
  "my0:cvLastUpdated" : "",
  "my0:cvCopyright" : "",
  "my0:aboutPerson" : {
    "@type": "my0:Person",
    "my0:firstName" : "",
    "my0:lastName" : "",
    "my0:photo" : "",
    "my0:hasCitizenship" : [],
    "my0:hasNationality" : [],
    "my0:website" : "",
    "my0:dateOfBirth" : "",
    "my0:gender" : "",
    "my0:driversLicence" : "",
    "my0:hasTelephoneNumber" : [],
    "my0:email" : "",
    "my0:title" : "",
    "my0:hasInstantMessaging" : [],
    "my0:address" : {
      "@type": "my0:Address",
      "my0:city" : "",
      "my0:country" : "",
      "my0:street" : "",
      "my0:postalCode" : ""
    }
  },
  "my0:target": {
    "@type" : "my0:Target",
    "my0:targetCompanySize" : "",
    "my0:targetSalaryCurrency" : "",
    "my0:targetCompanyIndustry" : [],
    "my0:targetJobCareerLevel" : "",
    "my0:targetJobMode" : "",
    "my0:weeksNoticePeriod" : "",
    "my0:targetJobTitle" : "",
    "my0:conditionWillTravel" : false,
    "my0:conditionWillRelocate" : false,
    "my0:targetJobDescription" : "",
    "my0:targetCompanyDescription" : "",
    "my0:targetCompanyLocality" : "",
    "my0:targetCompanyCountry" : [],
    "my0:targetSalaryRange" : ""
  },
  "my0:hasOtherInfo": [],
  "my0:hasReference": [],
  "my0:hasEducation": [],
  "my0:hasCourse" : [],
  "my0:hasWorkHistory": [],
  "my0:hasSkill" : [
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
      "@type": "my0:DigitalSkills",
      "my0:hasICTCertificate": false,
      "my0:otherDigitalSkills": "",
      "my0:informationProcessing": "",
      "my0:communication": "",
      "my0:contentCreation": "",
      "my0:safety": "",
      "my0:problemSolving": ""
    },
  ]
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
      let otherInfos = [
        ...state["my0:hasOtherInfo"],
        action.payload
      ];
      return { ...state, "my0:hasOtherInfo": otherInfos };
    case UPDATE_OTHER_INFO:
      otherInfos = [
        ...state["my0:hasOtherInfo"]
      ];
      otherInfos[action.payload.i] = action.payload.other;
      return { ...state, "my0:hasOtherInfo": otherInfos };
    case REMOVE_OTHER_INFO:
      let kot = _.filter(state["my0:hasOtherInfo"], function(item, index) { return index !== action.payload; });
      return { ...state, "my0:hasOtherInfo": kot };
    case CREATE_REFERENCE:
      let myreferences = [
        ...state["my0:hasReference"],
        action.payload
      ];
      return { ...state, "my0:hasReference": myreferences };
    case UPDATE_REFERENCE:
      let myupdatereferences = [
        ...state["my0:hasReference"]
      ];
      myupdatereferences[action.payload.i] = action.payload.reference;
      return { ...state, "my0:hasReference": myupdatereferences };
    case REMOVE_REFERENCE:
      let removedreferences = _.filter(state["my0:hasReference"], function(item, index) { return index !== action.payload; });
      return { ...state, "my0:hasReference": removedreferences };
    case CREATE_WORK_HISTORY:
      let myworks = [
        ...state["my0:hasWorkHistory"],
        action.payload
      ];
      return { ...state, "my0:hasWorkHistory": myworks };
    case UPDATE_WORK_HISTORY:
      let updateworks = [
        ...state["my0:hasWorkHistory"]
      ];
      updateworks[action.payload.i] = action.payload.work;
      return { ...state, "my0:hasWorkHistory": updateworks };
    case REMOVE_WORK_HISTORY:
      let removedwork = _.filter(state["my0:hasWorkHistory"], function(item, index) { return index !== action.payload; });
      return { ...state, "my0:hasWorkHistory": removedwork };
    case CREATE_EDUCATION:
      let myedu = [
        ...state["my0:hasEducation"],
        action.payload
      ];
      return { ...state, "my0:hasEducation": myedu };
    case UPDATE_EDUCATION:
      let updateedu = [
        ...state["my0:hasEducation"]
      ];
      updateedu[action.payload.i] = action.payload.edu;
      return { ...state, "my0:hasEducation": updateedu };
    case REMOVE_EDUCATION:
      let removededu = _.filter(state["my0:hasEducation"], function(item, index) { return index !== action.payload; });
      return { ...state, "my0:hasEducation": removededu };
    case CREATE_COURSE:
      let mycourse = [
        ...state["my0:hasCourse"],
        action.payload
      ];
      return { ...state, "my0:hasCourse": mycourse };
    case UPDATE_COURSE:
      let updatecourse = [
        ...state["my0:hasCourse"]
      ];
      updatecourse[action.payload.i] = action.payload.course;
      return { ...state, "my0:hasCourse": updatecourse };
    case REMOVE_COURSE:
      let removecourse = _.filter(state["my0:hasCourse"], function(item, index) { return index !== action.payload; });
      return { ...state, "my0:hasCourse": removecourse };
    case CREATE_OTHER_SKILL:
      let myskills = [
        ...state["my0:hasSkill"], action.payload.value
      ];
      return { ...state, "my0:hasSkill": myskills };
    case UPDATE_OTHER_SKILL:
      let myupdateskills = [
        ...state["my0:hasSkill"]
      ];
      myupdateskills[action.payload.i] = action.payload.skill;
      return { ...state, "my0:hasSkill": myupdateskills };
    case REMOVE_OTHER_SKILL:
      let myremoveotherskills = _.filter(state["my0:hasSkill"], function(item, index) { return index !== action.payload; });
      return { ...state, "my0:hasSkill": myremoveotherskills };
    case UPDATE_ABOUT_CV:
      let cv = { ...state };
      cv["my0:" + action.payload.id] = action.payload.value;
      return cv;
    case UPDATE_ABOUT_PERSON:
      let aboutperson = { ...state["my0:aboutPerson"]};
      if (action.payload.super)
        aboutperson["my0:" + action.payload.super]["my0:" + action.payload.id] =
          action.payload.value;
      else aboutperson["my0:" + action.payload.id] = action.payload.value;
      return { ...state, "my0:aboutPerson": aboutperson };
    case UPDATE_SKILLS:
      return { ...state, "my0:hasSkill": action.payload.value };
    case UPDATE_TARGET:
      let mytarget = { ...state["my0:target"] };
      mytarget["my0:" + action.payload.id] = action.payload.value;
      return { ...state, "my0:target":mytarget};
    case UPDATE_CV:
      return { ...action.payload};
    default:
      return state;
  }
};
