import React, { useState } from "react";

function UserForm({ user = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input name="nom" value={formData.nom || ""} onChange={handleChange} />
      </label>
      <label>
        Prénom:
        <input
          name="prenom"
          value={formData.prenom || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        mdp:
        <input name="mdp" value={formData.mdp || ""} onChange={handleChange} />
      </label>
      <label>
        role:
        <input
          name="role"
          value={formData.role || ""}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Sauvegarder</button>
      <button type="button" onClick={onCancel}>
        Annuler
      </button>
    </form>
  );
}

export default UserForm;
