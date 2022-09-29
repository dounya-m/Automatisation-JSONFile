'use strict'

const validJson = document.getElementById('valid_json');
const invalidJson = document.getElementById('invalid_json');
const jsonInput = document.getElementById('json_input');
const main = document.getElementById('main');
let check = false;

jsonInput.addEventListener('keyup', function(e) {
 //check if there is data first
 if(this.value !== '') {
  //check if json is valid json
  try {
   JSON.parse(this.value);
  } catch (error) {
   validJson.classList.add('hidden');
   invalidJson.classList.remove('hidden');
   return;
  }
 }
 //make json valid otherwise
 invalidJson.classList.add('hidden');
 validJson.classList.remove('hidden');

 ///////////////////////build dom tree based of json object////////////////////////////////
 const objectConverted = JSON.parse(this.value);
 //check if there is some data to build the parent div
 if(Object.values(objectConverted).length > 0 && check === false) {
  var parent = document.createElement('div');
  parent.classList.add('p-3', 'bg-slate-600', 'rounded-sm', 'border', 'border-gray-300', 'text-gray-100', 'tracking-wider','parent'); 
  main.appendChild(parent);
  check = true;
 }
 // console.log(Object.values(objectConverted));
  //loop though parent and append child to it
  Object.values(objectConverted).forEach(el=> {
   //read premitives first
   if(typeof el !== 'object' || el === null) {
    const p = document.createElement('p');
    p.textContent = el;
    document.querySelector('.parent').appendChild(p);
    console.log(el);
   }
  })
 console.log('#######');
})