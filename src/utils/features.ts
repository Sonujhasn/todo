export const saveTodos =(todos:TodoItemType[]):void=>{
    localStorage.setItem("mytods",JSON.stringify(todos))
}


export const getTodos =():TodoItemType[]=>{
   const todos= localStorage.getItem("mytods")

  return  todos?JSON.parse(todos):[]

}
