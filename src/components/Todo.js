import React, { useContext } from 'react'
import { Button, ListItem, ListItemText } from '@mui/material';
import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase';
import { AuthContext } from '../contex/auth'


const Todo = ( { todo, updateObject }) => {

    const { user } = useContext(AuthContext);

    const toggleInProgress = () => {
      if(user) {
        updateDoc(doc(db, "TODOs", user.uid, "todo", todo.id), {
          progress: !todo.progress,
        });
        updateObject(Date.now());
      }
      else {
        alert("Please log in to use this function!")
      }
    }

    const deleteTodo = async () => {
      if(user) {
        await deleteDoc(doc(db, "TODOs", user.uid, "todo", todo.id));
        updateObject(Date.now());
      }
      else {
        alert("Please log in to use this function!")
      }
    }

  return (
    <div className='todo-object'>
        <ListItem>
            <ListItemText 
              sx={{
                color: 'success.main'
              }}
              primary={todo.todo} 
              secondary={todo.progress ? "❌ In Progress" : "✅ Completed"} 
            />
        </ListItem>
        <Button onClick={toggleInProgress}>
          {todo.progress ? "Done" : "UnDone"}
        </Button>
        <Button onClick={deleteTodo}>X</Button>
    </div>
  )
}

export default Todo;