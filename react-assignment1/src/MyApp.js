import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() {
   const [characters, setCharacters] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   // Function to fetch all users from the backend
   async function fetchAll() {
      try {
         const response = await axios.get('http://localhost:5000/users');
         return response.data.users_list;
      } catch (error) {
         console.log(error);
         setError('Failed to fetch users.');
         return false;
      }
   }

   // useEffect to call fetchAll on component mount
   useEffect(() => {
      const loadData = async () => {
         const result = await fetchAll();
         if (result) {
            setCharacters(result);
         }
         setLoading(false);
      };
      loadData();
   }, []);

   // If loading, display a loading message
   if (loading) {
      return <div>Loading...</div>;
   }

   // If there is an error, display an error message
   if (error) {
      return <div>{error}</div>;
   }

   // Function to remove a character both from the frontend and backend
   async function removeOneCharacter(index) {
      const character = characters[index];
      
      try {
         // Make DELETE request to the backend
         const response = await axios.delete(`http://localhost:5000/users/${character.id}`);
         
         if (response.status === 204) {
            // If successful, update the state to remove the character
            const updated = characters.filter((_, i) => i !== index);
            setCharacters(updated);
         } else if (response.status === 404) {
            console.error('User not found');
            setError('User not found');
         }
      } catch (error) {
         console.error('Error deleting user:', error);
         setError('Failed to delete user.');
      }
   }

   async function makePostCall(person) {
      try {
         const response = await axios.post('http://localhost:5000/users', person);
         return response;
      } catch (error) {
         console.log(error);
         return false;
      }
   }

   function updateList(person) {
      makePostCall(person).then(result => {
         if (result && result.status === 201) {
            setCharacters([...characters, result.data]);
         }
      });
   }

   return (
      <div className="container">
         <Table characterData={characters} removeCharacter={removeOneCharacter} />
         <Form handleSubmit={updateList} />
      </div>
   );
}

export default MyApp;
