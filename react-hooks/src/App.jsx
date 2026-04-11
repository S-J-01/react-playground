import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Clock } from "./components/Clock";

function App() {
  const [count, setCount] = useState(0);
  const focusRef = useRef(null);

  function focusOnEmail() {
    focusRef.current.focus();
  }

  return (
    <>
      <Clock />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type={"text"}
          placeholder={"enter email"}
          style={{ margin: 10, padding: 20 }}
          ref={focusRef}
        ></input>
        <input
          type={"text"}
          placeholder={"enter password"}
          style={{ margin: 10, padding: 20 }}
        ></input>
        <button style={{ margin: 10, padding: 20 }} onClick={focusOnEmail}>
          Submit
        </button>
      </div>
    </>
  );
}

export default App;
