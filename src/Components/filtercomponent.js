import React,{useRef} from "react";

function  FilterComponent(props){
    let filter = useRef();
    function sendFilter(){
        // console.log(filter.current.value);
        props.getTasks(filter.current.value)
    }
    return (<div>
        <select name="filter" ref={filter} onChange={sendFilter} style={{margin : "10px 10px"}}>
            <option value=""></option>
            <option value="all">All Tasks</option>
            <option value="completed">Completed Tasks</option>
            <option value="uncompleted">Uncompleted Tasks</option>
        </select>
    </div>)
}

export default FilterComponent;