const express = require('express');
const app = express();
const pets = require('./helper.js');

const port = process.env.PORT || 3000;

app.get("/", (req, res)=> {
    res.send(`<h1>Adopt A Pet</h1>
    <p>Browse through the links below to find your new furry friend:</p>
    <ul>
    <li><a href="/animals/dogs">Dogs</a></li>
    <li><a href="/animals/cats">Cats</a></li>
    <li><a href="/animals/rabbits">Rabbits</a></li>
    </ul>`);
});

app.get("/animals", (req, res) => {
    const petType = Object.keys(pets);
    let petsList = " ";
    petType.forEach(pet => {
        petsList+=`<li>${pet.name}</li>`
    });
    res.send(`<ul>${petsList}</ul>`)
});

app.get("/animals/:pet_type", (req, res) => {
    const { pet_type } = req.params;
    let petsList="";
    pets[pet_type].forEach(animal =>      
    petsList+=`<li><a href="${pet_type}/${pets[pet_type].indexOf(animal)}">${animal.name}</a></li>`)
    res.send(`<ul>${petsList}</ul>`);
});

app.get("/animals/:pet_type/:pet_id", (req, res) => {
    const { pet_id, pet_type} = req.params;
    // const petType = pets[pet_type];
    // res.send(`<h1>${petType[pet_id].name}</h1>`);
    // const t = req.params.pet_type;
    // const i = req.params.pet_id;
    const pet = pets[pet_type][pet_id];
    
    let html = `${pet.name}'s page!
    <img src="${pet.url}" alt=${pet.name} />
    <p> ${pet.description}</p>
    <ul>
    <li>${pet.breed}</li>
    <li>${pet.age}</li>
    </ul>`;

    res.send(html);

})



/*
for(pet in Object.keys(pets)) {
    pet.map(individualAnimal => {
        res.send()
    })
}
*/



app.listen(port, ()=> console.log(`Server is listening on port ${port}`));



