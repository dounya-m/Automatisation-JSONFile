"use strict";

const validJson = document.getElementById("valid_json");
const invalidJson = document.getElementById("invalid_json");
const jsonInput = document.getElementById("json_input");
const main = document.getElementById("main");

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
    ///////////////////////build dom tree based of json object////////////////////////////////
    JSONCrack(JSON.parse(this.value));
  }
  //make json valid otherwise
  invalidJson.classList.add("hidden");
  validJson.classList.remove("hidden");
});

function JSONCrack(obj) {
  if (typeof obj === "object" && !Array.isArray(obj)) {
    //create primitives object and onject of objects
    const primitivesObject = {};
    const objectOfObjects = {};
    //seperate primitives and objects
    for (const key in obj) {
      if (typeof obj[key] !== "object" || obj[key] === null)
        primitivesObject[key] = obj[key];
      else objectOfObjects[key] = obj[key];
    }
    //if we don't have primitives
    if (Object.keys(primitivesObject).length === 0) {
      if (!document.getElementById("object-parent-circle")) {
        //remove square if exist
        if (document.getElementById("object-parent-square"))
          document.getElementById("object-parent-square").remove();
        //create circle
        const circleParent = document.createElement("div");
        circleParent.setAttribute("id", "object-parent-circle");
        circleParent.classList.add("object-parent-circle");
        main.appendChild(circleParent);
      }
    } 
    //if we have primitives
    else {
      if (!document.getElementById("object-parent-square")) {
        //remove circle if exist
        if (document.getElementById("object-parent-circle"))
          document.getElementById("object-parent-circle").remove();
        //create square
        const squareParent = document.createElement("div");
        squareParent.setAttribute("id", "object-parent-square");
        squareParent.classList.add("object-parent-square");
        main.appendChild(squareParent);
      }
      //push primitives to squar
      const StingOfJson = JSON.stringify(primitivesObject)
        .replace("{", "")
        .replace("}", "")
        .replaceAll('"', "")
        .replaceAll(",", "</br>")
        .replaceAll(":", " :  ");
      document.getElementById("object-parent-square").innerHTML = StingOfJson;
    }
    //if we have objects inside our object
    if(Object.keys(objectOfObjects).length > 0) LoopThoughtObjects(objectOfObjects);
  }
}


function LoopThoughtObjects(objectOfObjects,parentName = 'firstLayer') {
  //create layer
  if(!document.getElementById(parentName)) {
    const layer = document.createElement('div');
    layer.classList.add('layer');
    layer.setAttribute('id',parentName)
    main.appendChild(layer);
  }
  //fill layer
  for(const key in objectOfObjects) {
    //create subLayer
    console.log(parentName+ ' -----> ',objectOfObjects);
  }
}



// const obj = {
//  1: {
//  1.1: {
//  values: { employeeName: "John Doe", employeeId: 27, good: "good" },
//  },
//  },
//  2: {
//  2.1: {
//  parent: 1,
//  key: "salary",
//  values: { junary: "400000INR", fibrary: "500000INR", march: "650000INR" },
//  },
//  2.2: {
//  parent: 1,
//  key: "interest",
//  // ---- if isArray(element) take all elements and display it -----
//  values: ["crossfit", "english", { movies: "superman", animes: "boruto" }],
//  },
//  2.3: {
//  parent: 1,
//  key: "address",
//  values: { city: "Mumbai", state: "Maharashtra", country: "India" },
//  },
//  },
//  3: {
//  3.1: {
//  parent: 2.3,
//  key: "locality",
//  values: { address1: "1600 pebble road", address2: "Nearby XYZ Bank" },
//  },
//  },
//  };
