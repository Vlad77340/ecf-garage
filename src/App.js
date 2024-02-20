import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthProvider } from "./components/AuthContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Services from "./components/Services";
import Cars from "./components/Cars";
import Contact from "./components/Contact";
import LoginForm from "./components/LoginForm";
import MyCarousel from "./components/MyCarousel";
import CommentSection from "./components/CommentSection";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <main>
          <Header />
          <MyCarousel />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <DashboardPage />
                  <Home />
                  <Cars />
                  <Services />
                  <CommentSection />
                </>
              }
            />
            <Route path="/Services" element={<Services />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboardPage" element={<DashboardPage />} />
          </Routes>

          <Footer />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
