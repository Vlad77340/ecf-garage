import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then(setUsers)
      .catch(console.error);
  }

  function handleDelete(userId) {
    fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchUsers();
        }
      })
      .catch(console.error);
  }

  function handleEdit(user) {
    setEditingUser(user);
  }

  function handleAdd() {
    setEditingUser({});
  }

  function handleSubmit(user) {
    const method = user.ID_User ? "PUT" : "POST";
    const endpoint = user.ID_User
      ? `http://localhost:5000/api/users/${user.ID_User}`
      : `http://localhost:5000/api/users`;

    fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(() => {
        fetchUsers();
        setEditingUser(null);
      })
      .catch(console.error);
  }

  return editingUser ? (
    <UserForm
      user={editingUser}
      onSubmit={handleSubmit}
      onCancel={() => setEditingUser(null)}
    />
  ) : (
    <div>
      <h2>Liste des Utilisateurs</h2>
      <button onClick={handleAdd}>Ajouter un utilisateur</button>
      {users.map((user) => (
        <div key={user.ID_User}>
          {user.Nom} - {user.Prenom} - {user.Email}
          <button onClick={() => handleEdit(user)}>Modifi</button>
          <button onClick={() => handleDelete(user.ID_User)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
}

export default UsersList;
