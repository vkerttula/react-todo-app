import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid } from '@mui/material';
import { db } from '../Firebase';
import { addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';
import { AuthContext } from '../contex/auth';
import Todo from '../components/Todo';


const Home = () => {

  const { user } = useContext(AuthContext);

  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [offlineTodo, setOfflineTodo] = useState([]);

  useEffect(() => {
    if(user) {
      getTodo();
    }
    else {
      setOfflineTodo(offlineTodo => [...offlineTodo,  {
        id: serverTimestamp() + todoInput,
        progress: false,
        todo: "This is sample task. Enjoy!"
      }]);
    }
  }, [user, updateStatus]);

  const getTodo = async() => {
    const querySnapshot = await getDocs(collection(db, "TODOs", user.uid, "todo"));
    setTodos(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        progress: doc.data().progress,
        todo: doc.data().todo
      }))
    );
    console.log("Getting todos...");
  };

  const addTodo = async e => {
    e.preventDefault();
    if(todoInput !== "") {
      if(user) {
          await addDoc(collection(db, "TODOs", user.uid, "todo"), {
            createdAt: serverTimestamp(),
            progress: true,
            todo: todoInput
          });
          setUpdateStatus(Date.now());
      }
      else {
        setOfflineTodo(offlineTodo => [...offlineTodo,  {
          id: serverTimestamp() + todoInput,
          progress: true,
          todo: todoInput
        }]);
      }
    }
    setTodoInput("");
  }

  return (
    <div data-testid='todo-app-container' className='app'>
      {user ? 
          <>
            <p className='info'>
              App automatically saves ToDo list to database in real time, so you don't have
              to worry about saving, just enjoy!
            </p>
          </> : (
          <>
            <p className='info'>
              HINT! To keep your Todo list save and use all available functions, please log in!
              It's easy, FREE and takes just a 8 seconds to do!
            </p>
          </>
        )}
      <div className='todo-container'>
        <form onSubmit={e => { e.preventDefault(); }}>
        <Grid container>
          <Grid item>
            <TextField className='todo-input' 
              label="Write Todo..." 
              value={todoInput}
              variant="filled"
              onChange={(e) => setTodoInput(e.target.value)}
            />
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex", margin: "0px 20px"}}>
            <Button variant="contained" onClick={addTodo}>Add</Button>
          </Grid>
        </Grid>
        </form>
      </div>
      <div className='todo-list'>
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} updateObject={setUpdateStatus} />
        ))}
        {!user ? offlineTodo.map((todo, index) => (
          <Todo key={index} todo={todo} updateObject={setUpdateStatus} />
        )) : null}
      </div>
    </div>
  )
}

export default Home;