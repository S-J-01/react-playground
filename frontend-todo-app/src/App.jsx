import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[todos, setTodos] = useState([{
    title: "buy ps5",
    description: "but ps5 on amazon",
    id:1
  },
  {
    title: "buy pepsi",
    description: "but pepsi on amazon",
    id:1
  }])

  // setInterval(() => {
  //   setTodoForToday({
  //     title:"buy ps5 updated" + Math.random(),
  //     description:"buy ps5 on amazon updated" + Math.random(),
  //     id:1
  //   })
  // }, 5000);
  return (
   <div>
    {todos.map((item)=>{
      return(<Todo title={item.title} description={item.description}></Todo>)
    })}
   </div>
  )
}

function Todo(props){
  return (<div>
    {props.title} &nbsp;
    {props.description}
  </div>)
}


export default App
