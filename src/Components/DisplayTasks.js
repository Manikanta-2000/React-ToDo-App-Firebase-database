function DisplayTasks(props){
    let style={
        fontFamily : "arail sans-serif",
        borderCcollapse : "collapse",
        width : "100%",
    }
    let style1 = {
        border : "1px solid",
        textAllign : "left"
    }

    function oncheckbox(task){
        task.Status = "completed"
        props.updateTask(task)
        // console.log(task);
    }

    if(props.tasks.length != 0){
        return(<>
            <div>
            <button style={{margin : "5px 5px", color : "red", position : "absolute", right : "50px"}} onClick={props.closeTable}>&times;</button>
            </div>
        <div>
            <table style={style} >
                <tr style={style1}>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Tick on Completion</th>
                </tr>
                
                {props.tasks.map((task)=> {
                    return(<tr style={style1}>
                        <td >{task.Task_Name}</td>
                        <td >{task.Status}</td>
                        <td >{task.Status==="uncompleted" && <input type="checkbox" onClick={() => {oncheckbox(task)}}/>}</td>
                    </tr>)
                })}
            </table>
        </div>
        </>)
    }
    else{
        console.log("hello");
        return(<div>
            <span style={{textAlign : "center", color : "red", margin : "10px 10px"}}>No Task Found</span>
            <mark><span style={{textAlign : "center", color : "red", margin :"10px 10px"}} onClick={props.closeTable}>&times;</span></mark>
        </div>)
    }
    
}

export default DisplayTasks;