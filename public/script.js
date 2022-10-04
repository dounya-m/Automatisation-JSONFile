"use strict";

const validJson = document.getElementById("valid_json");
const invalidJson = document.getElementById("invalid_json");
const jsonInput = document.getElementById("json_input");
const mainElement = document.getElementById("mainEl");

jsonInput.addEventListener("keyup", function (e) {
  //check if there is data first
  if (this.value.trim() !== "") {
    //check if json is valid json
    try {
      JSON.parse(this.value);
    } catch (error) {
      validJson.classList.add("hidden");
      invalidJson.classList.remove("hidden");
      return;
    }
    ///////////////////////solve the problem////////////////////////////////
    const object = JSON.parse(this.value);
    const tree = jsonToTree(object);
    //create the tree
    treeTOhtml(tree);
  }
  //make json valid otherwise
  invalidJson.classList.add("hidden");
  validJson.classList.remove("hidden");
});

function jsonToTree(object) {
  // get the chosen data type
  function getDataType(object, type) {
    const result = {};
    for (const key in object) {
      const element = object[key];
      if (
        typeOfElement(element, false) === type &&
        key !== "parent" &&
        key !== "type"
      ) {
        result[key] = element;
      }
    }
    if (!Object.keys(result).length) return false;
    return result;
  }
  // get the element type
  function typeOfElement(element, strictComparison) {
    let boolean = true;
    if (strictComparison) {
      boolean = !Array.isArray(element);
    }
    if (typeof element === "object" && element !== null && boolean) {
      return "object";
    } else if (Array.isArray(element)) {
      return "array";
    } else {
      return "primitive";
    }
  }
  // set infos
  function setInfos(object, parent) {
    for (const key in object) {
      const element = object[key];
      if (typeOfElement(element, false) === "object") {
        element["parent"] = parent;
        element["type"] = typeOfElement(element, true);
        element["key"] = key;
      }
    }
  }
  function main(object) {
    if (i === 1) {
      setInfos(object, 1);
      tree["1"] = {
        1.1: {
          values: getDataType(object, "primitive"),
        },
      };
      i++;
      object = getDataType(object, "object");
    }
    if (object) {
      let obj2 = {};
      tree[i] = {};
      for (const key in object) {
        const ij = i + "." + j;
        const element = object[key];
        if (getDataType(element, "object")) {
          const helper = getDataType(element, "object");
          for (const key1 in helper) {
            const ele = helper[key];
            [obj2[key1]] = Object.values(helper);
          }
        }
        let values;
        if (typeOfElement(element, true) === "array") {
          values = {
            ...getDataType(element, "primitive"),
            ...getDataType(element, "object"),
          };
        } else {
          values = getDataType(element, "primitive");
        }
        setInfos(element, ij);
        tree[i][ij] = {
          parent: element.parent,
          key: key,
          values: values,
        };
        j++;
      }
      j = 1;
      i++;
      if (Object.values(obj2).length) main(obj2);
    }
  }
  const tree = {};
  let i = 1;
  let j = 1;
  main(object);
  return tree;
}

function treeTOhtml(tree) {
  console.log(tree);
}

//loop through tree and create layer each time
// loop through sublayers and create div and append it to it's layer
// loop inside sublayers and for each one create node (key:example) and append it to sublayer
//create ctn for values and append it to sublayer
//loop again through values and for each one create paragraph and append it to ctn
