import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function useTodos(){

  const[todos, setTodos] = useState([])

  useEffect(()=>{
   fetch('http://localhost:3000/todos', {
    method:'GET'
   }).then((resp)=>{
    return resp.json()
   }).then((data)=>{
    console.log(data)
    setTodos(data)
   })

   setInterval(()=>{
    fetch('http://localhost:3000/todos', {
    method:'GET'
   }).then((resp)=>{
    return resp.json()
   }).then((data)=>{
    console.log(data)
    setTodos(data)
   })
   },1000)
  }, [])

  return todos
}

function App() {
  const todos = useTodos()

  
  
  return (
   <div>
    {todos.map((todo)=>{
      return(
        <Todo title={todo.title} description={todo.description}></Todo>
      )
      })}
   </div>
  )
}


function Todo(props){
  return(
  <div>
    {props.title}
    &nbsp;
    {props.description}
    <br />
  </div>
  )
}

export default App
