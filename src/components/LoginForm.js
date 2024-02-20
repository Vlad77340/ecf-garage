import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Connexion réussie:", data);
        localStorage.setItem("token", data.token);
        login(data.token);
        navigate("/DashboardPage");
      } else {
        setErrorMessage(data.message || "Erreur lors de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setErrorMessage("Erreur lors de la connexion. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Se Connecter</button>
      </form>
    </div>
  );
}

export default LoginForm;
