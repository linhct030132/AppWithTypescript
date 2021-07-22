import React from "react";
import { Task } from "../Interface";
import CloseIcon from "@material-ui/icons/Close";
import "./TodoTask.css";

interface Props {
  task: Task;
  deleteTask(taskNameToDelete: string): void;
  toggleComplete(taskNameToComplete: string): void;
}

const TodoTask = ({ task, deleteTask, toggleComplete }: Props) => {
  let className = "task";
  let content = task.taskName;
  if (task.isCompleted) {
    className += " completed";
    content += " (completed)";
  }
  return (
    <div className={className}>
      <span
        onClick={() => {
          toggleComplete(task.taskName);
        }}
      >
        {content}
      </span>
      <button
        className="delete-btn"
        onClick={() => {
          deleteTask(task.taskName);
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default TodoTask;
