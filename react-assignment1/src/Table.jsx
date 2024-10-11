import React from 'react';

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>ID</th> {/* Added the ID column */}
          <th>Name</th>
          <th>Job</th>
          <th>Actions</th> {/* Added a column for the delete button */}
        </tr>
      </thead>
    );
}

function TableBody(props) {
    const rows = props.characterData.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.id}</td> {/* Displaying the ID */}
          <td>{row.name}</td>
          <td>{row.job}</td>
          <td>
            <button onClick={() => props.removeCharacter(index)}>Delete</button> {/* Delete button */}
          </td>
        </tr>
      );
    });

    return <tbody>{rows}</tbody>;
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
    </table>
  );
}

export default Table;
