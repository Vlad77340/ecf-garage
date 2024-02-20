import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";

function CommentsList() {
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/comments")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch(console.error);
  }, []);

  const handleEdit = (comment) => {
    setEditingComment(comment);
  };

  const handleDelete = (commentId) => {
    fetch(`http://localhost:5000/api/comments/${commentId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setComments(
            comments.filter((comment) => comment.ID_Commentaire !== commentId)
          );
        }
      })
      .catch(console.error);
  };

  const handleAdd = () => {
    setEditingComment({});
  };

  const handleSubmit = (comment) => {
    const method = editingComment.ID_Commentaire ? "PUT" : "POST";
    const url = editingComment.ID_Commentaire
      ? `http://localhost:5000/api/comments/${editingComment.ID_Commentaire}`
      : "http://localhost:5000/api/comments";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then(() => {
        fetch("http://localhost:5000/api/comments")
          .then((response) => response.json())
          .then((data) => setComments(data))
          .catch(console.error);
        setEditingComment(null);
      })
      .catch(console.error);
  };

  return editingComment ? (
    <CommentForm
      comment={editingComment}
      onSubmit={handleSubmit}
      onCancel={() => setEditingComment(null)}
    />
  ) : (
    <div>
      <h2>Comments</h2>
      <button onClick={handleAdd}>Add a Comment</button>
      {comments.map((comment) => (
        <div key={comment.ID_Commentaire}>
          {comment.Text} by {comment.Author}
          <button onClick={() => handleEdit(comment)}>Edit</button>
          <button onClick={() => handleDelete(comment.ID_Commentaire)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
