import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import {Person}  from "./models/personModel.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());

// app.get('/', (request, response)=>{
// console.log(request);
// return response.status(234);
// })

// //Route for creating a new person
// app.post('/persons', async (request, response) =>{
//     try {
//         if(
//             !request.body.name ||
//             !request.body.age ||
//             !request.body.favoriteFoods
//         ) {
//             return response.status(400).send({
//                 message: 'send all required fields: name, age, favoriteFoods'
//             })
//         }
//         const newPerson ={
//             name: request.body.name,
//             age: request.body.age,
//             favoriteFoods: request.body.favoriteFoods
//         }

//             const person = await Person.create(newPerson)
//          return response.status(200).send(person)
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// })

createdPerson();
async function createdPerson() {
try {
    const newPerson = await Person.create({
        name: "Johnathan Dora",
        age: 30,
        favoriteFoods: ["egg", "Burger"],
      });
    
      console.log(newPerson)
} catch (error) {
    console.log(error.message)
}
}
manyPerson()
async function manyPerson(){
    try {
        const people = await Person.create([
            { name: 'Alice', age: 25, favoriteFoods: ['Pasta', 'Salad'] },
            { name: 'Bob', age: 35, favoriteFoods: ['Steak', 'Sushi'] },
            {name: 'cosmas', age: 60, favoriteFoods: ['oat', 'spag']},
            {name: 'ada', age: 90, favoriteFoods: ['chiken', 'turkey']},
        ])
        console.log(people)
    } catch (error) {
        console.log(error.message);
    }

}



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  //Use model.find() to Search Your Database
//Find all the people having a given name, using Model.find() -> [Person]

// cosmas()
// async function cosmas(){
//     try {
//         const findCosmas = await Person.find({name: 'cosmas', age: 60, favoriteFoods: ['oat', 'spag']}).exec();
//         console.log(findCosmas)
//     } catch (error) {
//         console.log(error.message);
//     }
// }

//Use model.findOne() to Return a Single Matching Document from Your Database
// Find just one person which has a certain food in the person's favorites, using Model.findOne() -> Person. Use the function argument food as a search key.

// findAPerson()
// async function findAPerson(){
//     try {
//         const findOnePerson = await Person.findOne({name: 'ada', age: 90, favoriteFoods: ['chiken', 'turkey']}).exec();
//         console.log(findOnePerson)
//     } catch (error) {
//         console.log(error.message);
//     }
// }


// Use model.findById() to Search Your Database By _id
// Find the (only!!) person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.

// findAPersonId()
// async function findAPersonId(){
//     try {
//         const findPersonById = await Person.findById({_id :'655487dec6fb3a9c5fda7263'});
//         console.log(findPersonById)
//     } catch (error) {
//         console.log(error.message);
//     }
// }


// Perform Classic Updates by Running Find, Edit, then Save
// Find a person by _id ( use any of the above methods ) with the parameter personId as a search key. Add "hamburger" to the list of the person's favoriteFoods (you can use Array.push()). Then - inside the find callback - save() the updated Person
// Note: This may seem tricky, if, in your Schema, you declared favoriteFoods as an Array, without specifying the type (i.e. [String]). In that case, favoriteFoods defaults to Mixed type, and you have to manually mark it as edited using document.markModified('edited-field'). See Mongoose 

// findEditThenSave()
// async function findEditThenSave(){
//     try {
//         const foodToAdd = 'hamburger'
//         const findASinglePerson = await Person.findById({_id:'65548a1f120b40845c04fd1b'}).data.favoriteFoods.push(foodToAdd).data.save();
//         console.log(findASinglePerson)

//     } catch (error) {
//         console.log(error.message)
//     }
// }

// async function updatePersonFavoriteFoods(personId) {
//     try {
//       // Find the person by _id
//       const person = await Person.findById(personId);
  
//       if (!person) {
//         console.log('Person not found');
//         return;
//       }
  
//       // Modify the favoriteFoods array
//       person.favoriteFoods.push('hamburger');
  
//       // Mark the favoriteFoods array as modified
//       person.markModified('favoriteFoods');
  
//       // Save the updated person
//       await person.save();
  
//       console.log('Person updated successfully:', person);
//     } catch (error) {
//       console.error('Error updating person:', error.message);
//     }
//   }
  

//   const personIdToUpdate = '655496bf4b6b938938066fa7';
//   updatePersonFavoriteFoods(personIdToUpdate);



// Perform New Updates on a Document Using model.findOneAndUpdate()
// Find a person by Name and set the person's age to 20. Use the function parameter personName as a search key.
// Note: You should return the updated document. To do that you need to pass the options document { new: true } as the 3rd argument to findOneAndUpdate(). By default, these methods return the unmodified object.

// async function updatePersonAgeByName(personName) {
//     try {
//       // Find the person by name and update the age
//       const updatedPerson = await Person.findOneAndUpdate(
//         { name: 'Bob' },
//         { $set: { age: 20 } },
//         { new: true } // Return the updated document
//       );
  
//       if (!updatedPerson) {
//         console.log('Person not found');
//         return;
//       }
  
//       console.log('Person updated successfully:', updatedPerson);
//       return updatedPerson;
//     } catch (error) {
//       console.error('Error updating person:', error.message);
//     }
//   }
  
  
//   const personNameToUpdate = 'Bob';
//   updatePersonAgeByName(personNameToUpdate);

// Delete One Document Using model.findByIdAndRemove
// Delete one person by the person's _id. You should use one of the methods findByIdAndRemove() or findOneAndRemove(). They are like the previous update methods. They pass the removed document to the DB. As usual, use the function argument personId as the search key.

// async function deletePersonById(personId) {
//     try {
//       // Find the person by _id and remove them
//       const removedPerson = await Person.findByIdAndRemove(personId);
  
//       if (!removedPerson) {
//         console.log('Person not found');
//         return;
//       }
  
//       console.log('Person deleted successfully:', removedPerson);
//       return removedPerson;
//     } catch (error) {
//       console.error('Error deleting person:', error.message);
//     }
//   }
  

//   const personIdToDelete = '6554bdee919a7c36b35c544c';
//   deletePersonById(personIdToDelete);




// MongoDB and Mongoose - Delete Many Documents with model.remove()
// Delete all the people whose name is “Mary”, using Model.remove(). Pass it to a query document with the name field set, and of course, do a callback.
// Note: The Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected. Don’t forget to pass it to the done() callback, since we use it in tests.



// async function deletePeopleByName(nameToDelete) {
//     try {
//       // Use Model.remove() to delete all people with the given name
//       const result = await Person.remove({ name: nameToDelete });
  
//       if (result.ok) {
//         console.log(`${result.n} person(s) with name "${nameToDelete}" deleted successfully`);
//       } else {
//         console.log('Error deleting people');
//       }
//     } catch (error) {
//       console.error('Error deleting people:', error.message);
//     }
//   }
//   const nameToDelete = 'cosmas';
//   deletePeopleByName(nameToDelete);