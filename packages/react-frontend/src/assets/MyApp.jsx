import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
    }

    useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json.users_list))
      .catch((error) => console.log(error));
  }, []);

  function removeOneCharacter(indexToRemove) {
    const user = characters[indexToRemove];
    const id = user.id;

    deleteUser(id)
      .then((res) => {
        if (res.status !== 204) throw new Error("Delete failed");
        setCharacters(characters.filter((_, i) => i !== indexToRemove));
      })
      .catch((error) => console.log(error));
  }


  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    });
  }

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status !== 201) throw new Error("Insert failed");
        return res.json();
      })
      .then((createdUser) => {
        setCharacters([...characters, createdUser]);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );

}

export default MyApp;