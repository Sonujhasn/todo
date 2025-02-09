import { AppBar, Button, Container, Stack,TextField,Toolbar, Typography } from "@mui/material"
import TodoItem from "./components/TodoItem"
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "./utils/features";


const App = () => {
  const [todos,setTodos]=useState<TodoItemType[]>(getTodos())
  const [title,setTitle]=useState<TodoItemType["title"]>("")

  const completeHandler=(id:TodoItemType["id"]):void=>{
  
    const newTodo :TodoItemType[]=todos.map(i=>{
      if(i.id===id) i.isComplted=!i.isComplted
      return i
    })
     setTodos(newTodo)
     
  }
  const deleteHandler=(id:TodoItemType["id"]):void=>{
    const newTodo :TodoItemType[]=todos.filter(i=>i.id!==id)
     setTodos(newTodo)
    
  }
  const editHandler=(id:TodoItemType["id"],str:TodoItemType["title"]):void=>{
    const newTodo :TodoItemType[]=todos.map(i=>{
      if(i.id===id) i.title=str;
      return i;
    })
     setTodos(newTodo)
     
  }
  const submitHandler=():void=>{
    const newTodo:TodoItemType={
      title,
      isComplted:false,
      id:String(Math.random()*1000)
    }
    setTodos(prev=>([...prev,newTodo]))
    setTitle("")
    
  }

  useEffect(()=>{
      saveTodos(todos)
  },[todos])

  return (
    <Container maxWidth="sm" sx={{height:"90vh"}}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"} maxHeight={"80%"}>
      {
        todos.map((i)=>(
          <TodoItem 
              completeHandler={completeHandler} 
              deleteHandler={deleteHandler}
              editHandler={editHandler}  
              key={i.id} todo={i}/>
        ))
      }
      </Stack>
      <TextField 
        onKeyDown={(e)=>{
          if(e.key=="Enter"  && title!="") submitHandler()
        }}
         value={title} 
         onChange={(e)=>setTitle(e.target.value)} 
         fullWidth 
         label={"New Task"}/>
      <Button sx={{
        margin:"1rem 0"
      }}  fullWidth variant="contained"
      onClick={submitHandler}
      disabled={title===""}
      >Add</Button>
    </Container>
  )
}

export default App