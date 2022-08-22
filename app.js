const express = require('express');
const app = express();
const path = require('path');
const { allowedNodeEnvironmentFlags } = require('process');
const pets = require('./helper');


const port = process.env.PORT || 3000;

app.get("/", (req, res)=> {
    res.send(`<h1>Adopt a Pet</h1>

    <p> Browse through the links below to find your new furry friend </p>
    <ul>
        <a href="/animals/dogs"><li>Dogs</li></a>
        <a href="/animals/cats"><li>Cats</li></a>
        <a href="/animals/rabbits"><li>Rabbits</li></a>
    </ul>
    `);
});
//object with 3 properties and properties wiht array

// for (const [index, animal] of pets[petType].entries()) {
//     console.log(animal.name, "has index:", index);

app.get("/animals", (req, res) => {
    const allPets = Object.keys(pets);
    let allNames = "";
    allPets.forEach((name) =>
      pets[name].forEach(
        (pet, index) =>
          (allNames += `<a href=/animals/${name}/${index}><li>${pet.name}</li></a>`)
      )
    );
    res.send(allNames);
  });

app.get("/animals/:pet_type", (req, res) => {
    const { pet_type } = req.params;
  
   //loop over the pets[pet_type] and add a li with the name of the animals as text and add this to the html 
    // let postList+=`<li>pet.name</li>`
    // const petType = pets[pet_type];

    let petsList = "";

    pets[pet_type].forEach((pet, index) => {
        petsList+=`<li><a href="/animals/${pet_type}/${index}">${pet.name}</a></li>`
    });
    res.send(`<ul>${petsList}</ul>`);
   
})

app.get("/animals/:pet_type/:pet_id", (req, res) => {
    const { pet_id, pet_type} = req.params;
    const petType = pets[pet_type];
    // res.send(petType[pet_id].name);
    res.send(`<h1>${petType[pet_id].name}</h1>
    <img src=${petType[pet_id].url}>
    <p>${petType[pet_id].description}</p>
    <ul>
        <li>${petType[pet_id].breed}</li>
        <li>${petType[pet_id].age}</li>
    </ul>
    `)
    
})

app.listen(port, ()=> console.log(`Server is listening on port ${port}`));

