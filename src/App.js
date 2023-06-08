import logo from './logo.svg';
import './App.css';
import AddTask from './Components/AddTask';
import { useState,useEffect, useRef } from 'react';
import axios from 'axios';
import DisplayTasks from './Components/DisplayTasks';
import FilterComponent from './Components/filtercomponent';

function App() {
  // let image=require("C:\Users\DELL\Desktop\Reactjs\react-todo-project\src\Images\download.jpeg")
  let [addTask,setaddTask] = useState(false);
  let [tasks,setTasks] = useState([]);
  let [viewTasks,setviewTasks] = useState(false);
  let [filterOption,setfilterOption] = useState(false);
  let [searchTask,setsearchTask] = useState("")

  function addingTask(task){
    // fetch("https://react-todo-project-23b24-default-rtdb.firebaseio.com/tasks.json",{
    //   method : "POST",
    //   body :JSON.stringify(task),
    // })
    axios.post("https://react-todo-project-23b24-default-rtdb.firebaseio.com/tasks.json",task)
    .then(() => {
      setaddTask(false);
    })
  }

  function getTasks(filter = "all"){
    axios.get("https://react-todo-project-23b24-default-rtdb.firebaseio.com/tasks.json")
    .then((response) => {
      let tasklist=[]
      if (filter === "uncompleted" || filter === "completed"){
        for(let key in response.data){
          if(response.data[key].Status === filter)
            tasklist.push({...response.data[key],id : key});
        }
        setTasks(tasklist);
        setviewTasks(true);
        return
      }
      else{
        for(let key in response.data){
          tasklist.push({...response.data[key],id : key});
        }
        setTasks(tasklist);
        setviewTasks(true);
      }

    })  
    // .then((data) => {
    //   let tasklist=[]
    //   for(let key in data){
    //     tasklist.push({...data[key],id : key});
    //   }
    //   setTasks(tasklist);
    //   setviewTasks(true);
    // })
  }

  function updateTask(task){
    let updatedTask ={
      Task_Name : task.Task_Name,
      Status : task.Status,
    }
    axios.put("https://react-todo-project-23b24-default-rtdb.firebaseio.com/tasks/"+task.id+".json",updatedTask)
    .then((response) => {
      getTasks()
    })
  }

  function addcloseTable(){
    setaddTask(false);
  }

  function closeTable(){
    setviewTasks(false);
    setfilterOption(false);
  }

  function taskInput(event){
    setsearchTask(event.target.value);
  }

  function taskInput(event){
    setsearchTask(event.target.value);
  }

  function onSearch(){
    if(searchTask){
      let taskName = searchTask;
      axios.get("https://react-todo-project-23b24-default-rtdb.firebaseio.com/tasks.json")
      .then((response) => {
        let tasklist=[]
        for(let key in response.data){
          if (response.data[key].Task_Name === taskName)
            tasklist.push({...response.data[key],id : key});
        }
        setTasks(tasklist);
        setviewTasks(true);
        setsearchTask("");
        setaddTask(false);
        setfilterOption(false);
      })
    }
  }

  return (
    <div className="App">
        <div>
          <h1 style={{textAlign : "center" , fontStyle : "italic", color : "red", margin : "10px 10px"}}>Welcome To React ToDo App</h1>
          <img src={require("./Images/download.jpeg")} style={{width : "100px", height : "100px"}}/>
        </div>
      <div>
        <input type="search" placeholder='Search Task' style={{margin : "10px 10px",}} onChange={taskInput} value={searchTask}/>
        <button style={{margin : "10px 10px"}} onClick={onSearch} >Search</ button>
      </div>
      <div>
        <button style={{color: "red", margin :"10px 5px"}} onClick={(event) => {setaddTask(true);setviewTasks(false);setfilterOption(false)}}>Add Task</button>
        <button style={{color: "green",margin :"10px 5px"}} onClick={(event) => {setfilterOption(true);setaddTask(false)}}>View Tasks</button>
      </div>
      <div>
        {filterOption && <FilterComponent getTasks={getTasks}></FilterComponent>}
        {addTask && <AddTask addingTask={addingTask} addcloseTable={addcloseTable}></AddTask>}
        {viewTasks && <DisplayTasks tasks={tasks} updateTask={updateTask} closeTable={closeTable}></DisplayTasks>}
      </div>
    </div>
  );
}

export default App;
