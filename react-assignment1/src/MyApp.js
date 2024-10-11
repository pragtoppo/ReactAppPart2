import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() {
   const [characters, setCharacters] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => i !== index);
      setCharacters(updated);
   }

   function updateList(person) {
      setCharacters([...characters, person]);
   }

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

   async function makePostCall(person){
      try {
         const response = await axios.post('http://localhost:5000/users', person);
         return response;
      }
      catch (error) {
         console.log(error);
         return false;
      }
   }

   function updateList(person) { 
      makePostCall(person).then( result => {
      if (result && result.status === 200)
         setCharacters([...characters, person] );
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
