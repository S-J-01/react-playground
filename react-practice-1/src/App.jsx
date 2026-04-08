import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { List } from "./components/List.jsx";

function App() {
  const [count, setCount] = useState(0);
  const itemList = [
    { title: "Title1", id: 1 },
    { title: "Title2", id: 2 },
  ];

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <p>{count}</p>
      <List itemList={itemList} />
    </>
  );
}

export default App;
