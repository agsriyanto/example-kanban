import { atom } from "jotai";
import { atomWithDefault } from "jotai/utils";

import { Task } from "../types";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const tasksAtom = atomWithDefault(async () => {
  const response = await fetch(`${baseUrl}/api/v1/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return await response.json();
});

export const refreshTasksAtom = atom(null, async (_, set) => {
  const response = await fetch(`${baseUrl}/api/v1/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const updatedTasks = await response.json();
  set(tasksAtom, () => updatedTasks);
});

export const addTaskAtom = atom(null, async (_, set, newTask) => {
  const taskWithDefaultStatus = {
    ...(newTask as Task),
    status: "TO DO",
  };

  const response = await fetch(`${baseUrl}/api/v1/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskWithDefaultStatus),
  });
  if (!response.ok) throw new Error("Failed to add task");

  set(refreshTasksAtom);
});

export const updateTaskAtom = atom(
  null,
  async (_, set, { id, updatedTask }) => {
    const response = await fetch(`${baseUrl}/api/v1/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) throw new Error("Failed to update task");

    set(refreshTasksAtom);
  }
);

export const deleteTaskAtom = atom(null, async (_, set, id) => {
  const response = await fetch(`${baseUrl}/api/v1/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete task");

  set(refreshTasksAtom);
});
