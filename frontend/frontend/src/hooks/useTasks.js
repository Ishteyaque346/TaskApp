import { useState, useCallback } from 'react';
import { tasksAPI } from '../api/tasks.js';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksAPI.getTasks(filters);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await tasksAPI.createTask(taskData);
      setTasks([newTask, ...tasks]);
      return newTask;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to create task');
    }
  }, [tasks]);

  const updateTask = useCallback(async (id, taskData) => {
    try {
      const updatedTask = await tasksAPI.updateTask(id, taskData);
      setTasks(tasks.map(t => t._id === id ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to update task');
    }
  }, [tasks]);

  const deleteTask = useCallback(async (id) => {
    try {
      await tasksAPI.deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to delete task');
    }
  }, [tasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };
};
