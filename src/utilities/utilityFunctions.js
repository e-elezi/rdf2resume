import axios from "axios";
import _ from "lodash";

export const getLabelFromURI = uri => {
  let uriIndex = uri.lastIndexOf("#");
  return uri.substring(uriIndex);
};

export const handleUpload = async data => {
  const response = await axios.post("/submit_form", data);
  return response;
};

export const processDataBeforeSubmit = cvData => {
  console.log(handleUpload(cvData));
};


export function getDataOfType(data, type) {
  let graphs = data['@graph'];
  let length = graphs.length;
  for(let i=0; i < length; i++){
    if(graphs[i]['@type']===type){
      return graphs[i];
    }
  }
}

export function getDataOfId(data, id) {
  let graphs = data['@graph'];
  let length = graphs.length;
  for(let i=0; i < length; i++){
    if(graphs[i]['@id']===id){
      return graphs[i];
    }
  }
}

export function getDataArrayOfType(data, type) {
  let graphs = data['@graph'];
  let myarr = [];
  let length = graphs.length;
  for(let i=0; i < length; i++){
    if(graphs[i]['@type']===type){
      myarr.push(graphs[i]);
    }
  }
  return myarr;
}

export function setDataOfId(data, id, property, value) {
  let graphs = data['@graph'];
  let length = graphs.length;
  for(let i=0; i < length; i++){
    if(graphs[i]['@id']===id){
      graphs[i][property] = value;
      return data;
    }
  }
}

export function createObjInGraph(data, whereToAppend, obj) {
  //step 1 add new id to CV object
  let otherInfos = { ...data};
  let kc = getDataOfType(otherInfos, 'my0:CV');
  let kcid = kc['@id'];
  let othergraphs = otherInfos['@graph'];
  let nlengths = othergraphs.length;
  for(let i=0; i < nlengths; i++){
    if(othergraphs[i]['@id']===kcid){
      othergraphs[i][whereToAppend].push({ '@id': obj['@id'] });
    }
  }
  //step 2 create this object with this new id in graph
  othergraphs.push(obj);
  otherInfos['@graph'] = othergraphs;
  return otherInfos;
}

export function updateObjInGraph(data, obj) {
  let otherInfosU = { ...data};
  let othergraphsU = otherInfosU['@graph'];
  let nlengthU = othergraphsU.length;
  for(let i=0; i < nlengthU; i++){
    if(othergraphsU[i]['@id'] === obj['@id']){
      othergraphsU[i] = obj;
    }
  }
  otherInfosU['@graph'] = othergraphsU;
  return otherInfosU ;
}

export function removeObjInGraph(data, property ,id) {
  let kotbj = getDataOfType(data, 'my0:CV');
  let knidd = kotbj['@id'];
  //remove obj with that id
  let kot = { ...data};
  let kotgraphs = kot['@graph'];
  let myremoveotherinfo = _.filter(kotgraphs, function(item, index) { return item['@id'] !== id; });
  
  //remove from CV obj
  let kotlength = myremoveotherinfo.length;
  for(let i=0; i<kotlength; i++){
    if(myremoveotherinfo[i]['@id']===knidd){
      let removeemkot = _.filter(myremoveotherinfo[i][property], function(item, index) { return item['@id'] !== id; });
      myremoveotherinfo[i][property] = removeemkot;
    }
  }
  kot['@graph'] = myremoveotherinfo;
  return kot;
}

var eligibleArrayProperties = [
  "my0:hasInstantMessaging",
  "my0:hasCitizenship",
  "my0:hasNationality",
  "my0:hasTelephoneNumber",
  "my0:hasCourse",
  "my0:hasEducation",
  "my0:hasSkill",
  "my0:hasOtherInfo",
  "my0:hasReference",
  "my0:hasWorkHistory",
  "my0:targetCompanyIndustry",
  "my0:targetCompanyCountry"
];

function checkIfPropertyIsArray(property){
let length = eligibleArrayProperties.length;
for(let i =0; i<length; i++) {
    if(property === eligibleArrayProperties[i]){
        return true;
    }
}
}

export function parseJSONLDTOJSON ( data ) {
  var obj = {};
  obj["@context"] = data["@context"];
  let cv = getDataOfType(data, 'my0:CV');
  // all cv properties
  for (let x in cv) {
      if(x !== '@id'){
          if(cv[x]["@id"]) {
              let newobj = getDataOfId(data, cv[x]["@id"]);
              obj[x] = {};
              for(let y in newobj) {
                  if(y !== '@id'){
                      if(newobj[y]["@id"] && Object.keys(newobj[y]).length === 1) {
                          let subnewobj = getDataOfId(data, newobj[y]["@id"]);
                          obj[x][y] = {};
                          for (let z in subnewobj) {
                              if(z !== '@id'){
                                  if(subnewobj[z]["@id"]) {
                                      let subsubnewobj = getDataOfId(data, subnewobj[z]["@id"]);
                                      obj[x][y][z] = {};
                                      for (let d in subsubnewobj) {
                                          if(d !== '@id'){
                                              if(subsubnewobj[d]["@id"]) {
                                                  let subsubsubnewobj = getDataOfId(data, subsubnewobj[d]["@id"]);
                                                  obj[x][y][z][d] = {};
                                                  for(let e in subsubsubnewobj) {
                                                      if(e !== "@id") {
                                                          obj[x][y][z][d][e] = subsubsubnewobj[e];
                                                      }
                                                  }

                                              } else {
                                                  obj[x][y][z][d] = subsubnewobj[d];
                                              }
                                          }
                                      }

                                  } else {
                                      obj[x][y][z] = subnewobj[z];
                                  }
                              }
                          }
                      } else if(checkIfPropertyIsArray(y)){
                          obj[x][y] = [];
                          obj[x][y].push(newobj[y]);

                      } else {
                          obj[x][y] = newobj[y];
                      }
                  }
              }
          } else if(Array.isArray(cv[x])) { //if property is pointing to an array
              let length = cv[x].length;
              obj[x] = [];
              for(let i = 0; i < length; i++ ) {
                  if(cv[x][i]["@id"]) {
                      let newobj = getDataOfId(data, cv[x][i]["@id"]);
                      obj[x].push({});
                      for(let y in newobj) {
                          if(y !== '@id'){
                              if(newobj[y]["@id"]) {
                                  let subnewobj = getDataOfId(data, newobj[y]["@id"]);
                                  obj[x][i][y] = {};
                                  for (let z in subnewobj) {
                                      if(z !== '@id'){
                                          if(subnewobj[z]["@id"]) {
                                              let subsubnewobj = getDataOfId(data, subnewobj[z]["@id"]);
                                              obj[x][i][y][z] = {};
                                              for (let d in subsubnewobj) {
                                                  if(d !== '@id'){
                                                      if(subsubnewobj[d]["@id"]) {
                                                          let subsubsubnewobj = getDataOfId(data, subsubnewobj[d]["@id"]);
                                                          obj[x][i][y][z][d] = {};
                                                          for(let e in subsubsubnewobj) {
                                                              if(e !== "@id") {
                                                                  obj[x][i][y][z][d][e] = subsubsubnewobj[e];
                                                              }
                                                          }

                                                      } else {
                                                          obj[x][i][y][z][d] = subsubnewobj[d];
                                                      }
                                                  }
                                              }

                                          } else {
                                              obj[x][i][y][z] = subnewobj[z];
                                          }
                                      }
                                  }
                              } else {
                                  obj[x][i][y] = newobj[y];
                              }
                          }
                      }
                  }
              }

          } else {
              obj[x] = cv[x];
          }
      }
    }
  for(let x in obj) {
      if(obj[x]['my0:hasInstantMessaging']) {
          let kot = obj[x]['my0:hasInstantMessaging'];
          obj[x]['my0:hasInstantMessaging'] = [];
          obj[x]['my0:hasInstantMessaging'].push(kot);
      }
      if(checkIfPropertyIsArray(x) && !Array.isArray(obj[x])){
          let value = obj[x];
          obj[x] = [];
          obj[x].push(value);
      }
  }
  return  obj;
}

export function getNameFromURI(uri){
  let ind = uri.lastIndexOf("/"); 
  let ind2 = uri.lastIndexOf("#");
  if(ind2 > ind){
    return uri.substr(ind2+1); 
  } else {
    return uri.substr(ind+1); 
  }
}