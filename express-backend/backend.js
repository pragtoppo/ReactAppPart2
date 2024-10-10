// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspiring actress',
       },
       {
          id: 'zap555',
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
}

// Get users by name and/or job
app.get('/users', (req, res) => {
   const name = req.query.name;
   const job = req.query.job;

   let result = users['users_list'];

   if (name !== undefined && job !== undefined) {
       result = findUserByNameAndJob(name, job);
   } else if (name !== undefined) {
       result = findUserByName(name);
   }

   res.send({ users_list: result });
});

// Find users by name
const findUserByName = (name) => { 
   return users['users_list'].filter((user) => user.name === name); 
}

// Find users by name and job
const findUserByNameAndJob = (name, job) => {
   return users['users_list'].filter((user) => user.name === name && user.job === job);
}

// Add new user
app.post('/users', (req, res) => {
   const userToAdd = req.body;
   addUser(userToAdd);
   res.status(200).end();
});

function addUser(user) {
   users['users_list'].push(user);
}

// Delete a user by id
app.delete('/users/:id', (req, res) => {
   const id = req.params.id;
   const result = deleteUserById(id);

   if (result) {
       res.status(204).end(); // No Content on successful delete
   } else {
       res.status(404).send({ message: 'User not found' });
   }
});

// Function to delete user by id
function deleteUserById(id) {
   const index = users['users_list'].findIndex((user) => user.id === id);

   if (index !== -1) {
       users['users_list'].splice(index, 1);
       return true;
   }
   return false;
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
