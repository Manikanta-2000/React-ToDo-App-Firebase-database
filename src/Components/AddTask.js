import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState ,useRef} from 'react';

function AddTask(props){
    let tname= useRef();
    let stat= useRef();
    function onClickEvent(){
        let task={
            Task_Name : tname.current.value,
            Status : stat.current.value,
        }
        props.addingTask(task)
    }

    return(
        <div >
            <input type="text" placeholder="Enter your task" style={{margin : "10px 10px"}} ref={tname}/>
            <select name="status" style={{margin : "10px 10px"}} ref={stat}>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
            </select>
            <button onClick={onClickEvent}>Add Task</button>
            <button style={{margin : "5px 5px", color : "red"}} onClick={props.addcloseTable}>&times;</button>
        </div>);
}

export default AddTask;