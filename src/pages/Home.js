import React, { useState, useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material';
import { db } from '../Firebase'
import { addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore'
import { AuthContext } from '../contex/auth'

const Home = () => {

  const { user } = useContext(AuthContext);

  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {

    const getTodo = async() => {
      const querySnapshot = await getDocs(collection(db, "TODOs", user.uid, "todo"));
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    };

    if(user) {
      getTodo();
    }
    else {
      console.log("User not logged in");
    }
  }, []); // Run only at start



  const addTodo = async e => {
    e.preventDefault();
    if(user) {
      if(todoInput !== "") {
        console.log(user.uid)
        await addDoc(collection(db, "TODOs", user.uid, "todo"), {
          createdAt: serverTimestamp(),
          todo: todoInput
        });
      }
      else {
        console.log("Enter value to the field!");
      }
    }
    else {
      console.log("not logged in")
    }
    setTodoInput("");
  }

  return (
    <div className='todo-container'>
      <form>
        <TextField 
          label="Write Todo" 
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <Button variant="contained" onClick={addTodo}>Add</Button>
      </form>
      <div className='todo-list'>
        {todos.map((todo) => (
          <p>{todo.todo}</p>
        ))}
      </div>
    </div>
  )
}

export default Home;