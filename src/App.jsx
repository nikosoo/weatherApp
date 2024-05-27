import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Weather from "./weather/Weather";
import bgImage from "./assets/images/pexels-ming-sun-270578-814449.jpg";

function App() {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Weather />
      </div>
    </>
  );
}

export default App;
