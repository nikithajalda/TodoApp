import React ,{useState,useEffect}from 'react'
function App() {
	const [todo,setTodo]= useState();
	const [todolist,setTodolist]=useState(JSON.parse(localStorage.getItem('todolist')) || []);
	const [completedlist,setCompletedlist]=useState(JSON.parse(localStorage.getItem('completedlist')) || []);

	useEffect(()=>{
		localStorage.setItem('todolist',JSON.stringify(todolist))
		localStorage.setItem('completedlist',JSON.stringify(completedlist));
	},[todolist,completedlist]);

	const changeHandler = (e) =>{
		setTodo(e.target.value);
	}
	const resetHandler =() =>{
		setCompletedlist([]);
		setTodolist([]);
	}
	const handleSubmit =() =>{
		setTodolist([todo,...todolist]);
		setTodo('');
	}
	const handleClick =(id) =>{
		let temp = todolist, val = todolist[id]
		temp = temp.filter((element)=> element !== val)
        console.log(todolist[id]);
		if(todolist.length > id){
			setCompletedlist(ref => [val,...ref]);
			setTodolist(temp)
		}
	}

  return (
	<div className='todo'>
		<input 
		 type='text'
		 value={todo}
		 onChange={changeHandler}
		 placeholder='Add Todo'
		/> &nbsp;
		<button onClick={handleSubmit}>Add Todo</button> &nbsp;
		<button onClick={resetHandler}>Reset</button> <br/>
		To Be Completed
		<div className="todolist">
			{ 
			todolist.length? todolist.map((todo,index)=>(
					<button key={index} onClick={() => handleClick(index)} className='btn'>
						{todo}	
					</button>
				))
				: null
			}

		</div>
		Completed-List 
		 <div className="todolist">
			{ 
			completedlist.length? completedlist.map((todo,index)=>(
					<button key={index} className='btn'>
						{todo}	
					</button>
				))
				: null

			}

		 </div>
	</div>
  )
}

export default App;
