import React, { useState } from "react";

function CommentForm({ comment = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    text: comment.text || "",
  });

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
        Texte:{" "}
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
        ></textarea>
      </label>
      <button type="submit">Sauvegarder</button>
      <button type="button" onClick={onCancel}>
        Annuler
      </button>
    </form>
  );
}

export default CommentForm;
