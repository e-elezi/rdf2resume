export const getLabelFromURI = uri => {
  let uriIndex = uri.lastIndexOf("#");
  return uri.substring(uriIndex);
};

export function getDataOfType(data, type) {
  let graphs = data["@graph"];
  let length = graphs.length;
  for (let i = 0; i < length; i++) {
    if (graphs[i]["@type"] === type) {
      return graphs[i];
    }
  }
}

export function getDataOfId(data, id) {
  let graphs = data["@graph"];
  let length = graphs.length;
  for (let i = 0; i < length; i++) {
    if (graphs[i]["@id"] === id) {
      return graphs[i];
    }
  }
}

export function getDataArrayOfType(data, type) {
  let graphs = data["@graph"];
  let myarr = [];
  let length = graphs.length;
  for (let i = 0; i < length; i++) {
    if (graphs[i]["@type"] === type) {
      myarr.push(graphs[i]);
    }
  }
  return myarr;
}

function replaceEmptyProperties(data) {
  let hasCourse = false;
  let hasEducation = false;
  let hasWork = false;
  let hasReference = false;
  let hasPatent = false;
  let hasPublication = false;
  let hasProject = false;
  let hasHonorAward = false;
  let hasSkill = false;
  let hasOtherInfo = false;
  let hasNationality = false;
  let hasInstantMessaging = false;
  let hasCitizenship = false;
  let hasWebsite = false;
  let targetCompanyField = false;
  let targetCountry = false;
  let targetRegion = false;
  for (let x in data) {
    //check if it has course
    if (x === "my0:hasCourse") {
      hasCourse = true;
    } else if (x === "my0:hasPublication") {
      hasPublication = true;
    } else if (x === "my0:hasProject") {
      hasProject = true;
    } else if (x === "my0:hasPatent") {
      hasPatent = true;
    } else if (x === "my0:hasHonorAward") {
      hasHonorAward = true;
    } else if (x === "my0:hasSkill") {
      hasSkill = true;
    } else if (x === "my0:hasEducation") {
      hasEducation = true;
    } else if (x === "my0:hasReference") {
      hasReference = true;
    } else if (x === "my0:hasWorkHistory") {
      hasWork = true;
    } else if (x === "my0:hasOtherInfo") {
      hasOtherInfo = true;
    } else if (x === "my0:hasTarget") {
      for (let y in data[x]) {
        if (y === "my0:targetCompanyField") {
          targetCompanyField = true;
        } else if (y === "my0:targetCountry") {
          targetCountry = true;
        } else if (y === "my0:targetRegion") {
          targetRegion = true;
        }
      }
    } else if (x === "my0:aboutPerson") {
      for (let y in data[x]) {
        if (y === "my0:hasNationality") {
          hasNationality = true;
        } else if (y === "my0:hasCitizenship") {
          hasCitizenship = true;
        } else if (y === "my0:hasInstantMessaging") {
          hasInstantMessaging = true;
        } else if (y === "my0:hasWebsite") {
          hasWebsite = true;
        }
      }
    }
  }
  if (!hasCourse) {
    data["my0:hasCourse"] = [];
  }
  if (!hasSkill) {
    data["my0:hasSkill"] = [];
  }
  if (!hasPublication) {
    data["my0:hasPublication"] = [];
  }
  if (!hasProject) {
    data["my0:hasProject"] = [];
  }
  if (!hasPatent) {
    data["my0:hasPatent"] = [];
  }
  if (!hasHonorAward) {
    data["my0:hasHonorAward"] = [];
  }
  if (!hasEducation) {
    data["my0:hasEducation"] = [];
  }
  if (!hasWork) {
    data["my0:hasWorkHistory"] = [];
  }
  if (!hasReference) {
    data["my0:hasReference"] = [];
  }
  if (!hasOtherInfo) {
    data["my0:hasOtherInfo"] = [];
  }
  if (!hasWebsite) {
    data["my0:aboutPerson"]["my0:hasWebsite"] = [];
  }
  if (!hasInstantMessaging) {
    data["my0:aboutPerson"]["my0:hasInstantMessaging"] = [];
  }
  if (!hasCitizenship) {
    data["my0:aboutPerson"]["my0:hasCitizenship"] = [];
  }
  if (!hasNationality) {
    data["my0:aboutPerson"]["my0:hasNationality"] = [];
  }
  if (!targetCompanyField) {
    data["my0:hasTarget"]["my0:targetCompanyField"] = [];
  }
  if (!targetCountry) {
    data["my0:hasTarget"]["my0:targetCountry"] = [];
  }
  if (!targetRegion) {
    data["my0:hasTarget"]["my0:targetRegion"] = [];
  }
  return data;
}

export function parseJSONLDTOJSON(data) {
  var obj = {};
  obj["@context"] = data["@context"];
  let cv = getDataOfType(data, "my0:CV");
  //main cv properties
  for (let x in cv) {
    if (x !== "@id") {
      //check if property is linked to an object
      if (cv[x]["@id"]) {
        let newobj = getDataOfId(data, cv[x]["@id"]);
        if (x === "my0:aboutPerson" || x === "my0:hasTarget") {
          obj[x] = {};
          for (let y in newobj) {
            if (y !== "@id") {
              //check if property is linked to an object
              if (newobj[y]["@id"]) {
                let subnewobj = getDataOfId(data, newobj[y]["@id"]);
                if (y === "my0:hasInstantMessaging" || y === "my0:hasWebsite") {
                  obj[x][y] = [];
                  let objc = {};
                  for (let z in subnewobj) {
                    if (z !== "@id") {
                      objc[z] = subnewobj[z];
                    }
                  }
                  obj[x][y].push(objc);
                } else {
                  obj[x][y] = {};
                  for (let z in subnewobj) {
                    if (z !== "@id") {
                      obj[x][y][z] = subnewobj[z];
                    }
                  }
                }
                //else check property leads to an array
              } else if (Array.isArray(newobj[y])) {
                let length = newobj[y].length;
                obj[x][y] = [];
                let arrayIsOkay = false;
                for (let i = 0; i < length; i++) {
                  if (newobj[y][i]["@id"]) {
                    let subnewobj = getDataOfId(data, newobj[y][i]["@id"]);
                    let objc = {};
                    for (let z in subnewobj) {
                      if (z !== "@id") {
                        objc[z] = subnewobj[z];
                      }
                    }
                    obj[x][y].push(objc);
                  } else {
                    arrayIsOkay = true;
                  }
                }
                if (arrayIsOkay) {
                  obj[x][y] = newobj[y];
                }
                //else its a simple property
              } else {
                if (
                  y === "my0:hasNationality" ||
                  y === "my0:hasCitizenship" ||
                  y === "my0:targetCountry" ||
                  y === "my0:targetRegion" ||
                  y === "my0:targetCompanyField"
                ) {
                  obj[x][y] = [];
                  obj[x][y].push(newobj[y]);
                } else {
                  obj[x][y] = newobj[y];
                }
              }
            }
          }
        } else {
          //all the hasSkill, hasReference etc properties which might have only one individual
          obj[x] = [];
          let objx = {};
          for (let y in newobj) {
            if (y !== "@id") {
              //check if property leads to another object
              if (newobj[y]["@id"]) {
                let subnewobj = getDataOfId(data, newobj[y]["@id"]);
                objx[y] = {};
                for (let z in subnewobj) {
                  if (z !== "@id") {
                    if (subnewobj[z]["@id"]) {
                      let subsubnewobj = getDataOfId(data, subnewobj[z]["@id"]);
                      objx[y][z] = {};
                      for (let d in subsubnewobj) {
                        if (d !== "@id") {
                          if (subsubnewobj[d]["@id"]) {
                            let subsubsubnewobj = getDataOfId(
                              data,
                              subsubnewobj[d]["@id"]
                            );
                            objx[y][z][d] = {};
                            for (let e in subsubsubnewobj) {
                              if (e !== "@id") {
                                objx[y][z][d][e] = subsubsubnewobj[e];
                              }
                            }
                          } else {
                            if (
                              d === "@type" &&
                              subsubnewobj[d].indexOf("Address") >= 0
                            ) {
                              objx[y][z][d] = "my0:Address";
                            } else {
                              objx[y][z][d] = subsubnewobj[d];
                            }
                          }
                        }
                      }
                    } else {
                      objx[y][z] = subnewobj[z];
                    }
                  }
                }
              } else {
                objx[y] = newobj[y];
              }
            }
          }
          obj[x].push(objx);
        }
        //else check property leads to an array
      } else if (Array.isArray(cv[x])) {
        obj[x] = [];
        let length = cv[x].length;
        for (let i = 0; i < length; i++) {
          let item = cv[x][i];
          let objx = {};
          //check if property leads to an object
          if (item["@id"]) {
            let newobj = getDataOfId(data, item["@id"]);
            for (let y in newobj) {
              if (y !== "@id") {
                if (newobj[y]["@id"]) {
                  let subnewobj = getDataOfId(data, newobj[y]["@id"]);
                  objx[y] = {};
                  for (let z in subnewobj) {
                    if (z !== "@id") {
                      if (subnewobj[z]["@id"]) {
                        let subsubnewobj = getDataOfId(
                          data,
                          subnewobj[z]["@id"]
                        );
                        objx[y][z] = {};
                        for (let d in subsubnewobj) {
                          if (d !== "@id") {
                            if (subsubnewobj[d]["@id"]) {
                              let subsubsubnewobj = getDataOfId(
                                data,
                                subsubnewobj[d]["@id"]
                              );
                              objx[y][z][d] = {};
                              for (let e in subsubsubnewobj) {
                                if (e !== "@id") {
                                  objx[y][z][d][e] = subsubsubnewobj[e];
                                }
                              }
                            } else {
                              if (
                                d === "@type" &&
                                subsubnewobj[d].indexOf("Address") >= 0
                              ) {
                                objx[y][z][d] = "my0:Address";
                              } else {
                                objx[y][z][d] = subsubnewobj[d];
                              }
                            }
                          }
                        }
                      } else {
                        objx[y][z] = subnewobj[z];
                      }
                    }
                  }
                } else {
                  objx[y] = newobj[y];
                }
              }
            }
          }
          obj[x].push(objx);
        }
        //else is just a straightforward property
      } else {
        obj[x] = cv[x];
      }
    }
  }

  //checking if some empty properties are removed after converting
  obj = replaceEmptyProperties(obj);
  console.log(obj);
  return obj;
}

export function getNameFromURI(uri) {
  let ind = uri.lastIndexOf("/");
  let ind2 = uri.lastIndexOf("#");
  if (ind2 > ind) {
    return uri.substr(ind2 + 1);
  } else {
    return uri.substr(ind + 1);
  }
}

export const saveLabel = {
  en: "Save",
  fr: "Enregistrer",
  de: "Speichern",
  it: "Salva"
};

export const updateLabel = {
  en: "Update",
  fr: "Mise à jour",
  de: "Aktualisieren",
  it: "Aggiorna"
};

export const resetLabel = {
  en: "Reset",
  fr: "Réinitialiser",
  de: "Zurücksetzen",
  it: "Reset"
};

export const cancelLabel = {
  en: "Cancel",
  fr: "Annuler",
  de: "Abbrechen",
  it: "Annulla"
};

export const warningLabel = {
  en: "Warning!",
  fr: "Attention!",
  de: "Achtung!",
  it: "Attenzione!"
};

export const warningText = {
  en: "You can't submit, without fixing errors.",
  de: "Du kannst nicht einreichen, ohne Fehler zu beheben.",
  fr: "Vous ne pouvez pas soumettre, sans corriger les erreurs.",
  it: "Non è possibile presentare, senza correggere gli errori."
};

export const startDate = {
  en: "Date needs to be in the past!",
  fr: "La date doit se situer dans le passé!",
  de: "Das Datum muss in der Vergangenheit liegen!",
  it: "La data deve essere nel passato!"
};

export const endDate = {
  en: "End date can not be further in the past than start date!",
  fr: "La date de fin ne peut pas être plus éloignée de la date de début !",
  de:
    "Das Enddatum darf nicht weiter in der Vergangenheit liegen als das Anfangsdatum!",
  it: "La data di fine non può essere più lontana della data di inizio!"
};
