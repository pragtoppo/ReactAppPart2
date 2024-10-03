import React, { useState } from 'react';
import Table from './Table';
import Form from './Form';

function MyApp() {
   const [characters, setCharacters] = useState([]);

   function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => i !== index);
      setCharacters(updated);
   }

   function updateList(person) {
      setCharacters([...characters, person]);
   }

   return (
      <div className="container">
         <Table characterData={characters} removeCharacter={removeOneCharacter} />
         {/* Add the Form component to allow adding new characters */}
         <Form handleSubmit={updateList} />
      </div>
   );
}

export default MyApp;
