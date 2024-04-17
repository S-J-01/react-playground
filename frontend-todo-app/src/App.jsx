import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[todoForToday, setTodoForToday] = useState({
    title: "buy ps5",
    description: "but ps5 on amazon",
    id:1
  })

  setInterval(() => {
    setTodoForToday({
      title:"buy ps5 updated" + Math.random(),
      description:"buy ps5 on amazon updated" + Math.random(),
      id:1
    })
  }, 5000);
  return (
   <div>
    {todoForToday.title}
    <br />
    {todoForToday.description}
   </div>
  )
}



export default App
