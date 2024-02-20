import React, { useState } from "react";
import "./CommentSection.css";

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newPseudo, setNewPseudo] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !newPseudo.trim()) return;

    setComments([...comments, { pseudo: newPseudo, text: newComment }]);
    setNewComment("");
    setNewPseudo("");
  };

  return (
    <div className="comment-section">
      <h3>Commentaires</h3>
      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          id="pseudo"
          name="pseudo"
          value={newPseudo}
          onChange={(e) => setNewPseudo(e.target.value)}
          placeholder="Votre Nom..."
          autoComplete="name"
        />
        <textarea
          id="comment"
          name="comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajoutez un commentaire..."
          autoComplete="off"
        />
        <button type="submit">Envoyer</button>
      </form>
      <div className="comments">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.pseudo}</strong>: {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
