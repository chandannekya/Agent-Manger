import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashbord";
import HeroSection from "./pages/HeroSection";
import SignInForm from "./Component/SignInForm";
import SignUpForm from "./Component/SignUpForm";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            localStorage.getItem("token") ? <Dashboard /> : <HeroSection />
          }
        />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </>
  );
}

export default App;
