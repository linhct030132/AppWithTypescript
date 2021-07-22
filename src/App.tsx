import React, { useState } from "react";
import Header from "./components/Header";
import TodoTask from "./components/TodoTask";
import { Task } from "./Interface";
import "./App.css";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [todos, setTodos] = useState<Task[]>([]);
  const newTask = { taskName: task, isCompleted: status };

  const handleChange = (e: any) => {
      setTask(e.target.value);
  };

  const addTask = (): void => {
    if (task) {
      setTodos([...todos, newTask]);
      setTask("");
    }
  };

  const onKeyUpValue = (e: any) => {
    if (e.key === 'Enter' && task) {
      setTodos([...todos, newTask]);
      setTask("");
    }
  }

  const deleteTask = (taskNameToDelete: string) => {
    setTodos(
      todos.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  const toggleComplete = (taskNameToComplete: string) => {
      const updateTodos = todos.map((item) => {
        let isCompleted = item.isCompleted;
        if (item.taskName === taskNameToComplete) {
          return {
            ...item,
            isCompleted: !isCompleted
          }
        } else {
          return item
        }
      })
      setTodos(updateTodos)      
  }

  return (
    <div className="App">
      <Header />
      <div className='to-do-input'>
        <input
          type="text"
          placeholder="Input to do"
          value={task}
          onChange={handleChange}
          onKeyDown={onKeyUpValue}
        />
        <button className='addBtn' onClick={addTask}>
          <AddCircleOutlineIcon />
        </button>
      </div>
      <div className="todoList">
        {todos.map((task, index) => {
          return <TodoTask key={index} task={task} toggleComplete={toggleComplete} deleteTask={deleteTask}  />;
        })}
      </div>
    </div>
  );
};

export default App;
