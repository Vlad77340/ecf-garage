import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import UsersList from "./UsersList";
import ServicesList from "./ServicesList";
import CarsList from "./CarsList";
import CommentsList from "./CommentsList";
import HoursList from "./HoursList";

function DashboardPage() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Tableau de Bord</h1>
      <UsersList />
      <ServicesList />
      <CarsList />
      <CommentsList />
      <HoursList />
    </div>
  );
}

export default DashboardPage;
