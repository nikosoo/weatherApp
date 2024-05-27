import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Weather from "./weather/Weather";

function App() {
  return (
    <>
      <div className="bg-custom-image min-h-screen bg-cover bg-center">
        <Weather />
      </div>
    </>
  );
}

export default App;
