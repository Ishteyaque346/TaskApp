import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useTasks } from '../hooks/useTasks.js';
import { TaskForm } from '../components/TaskForm.jsx';
import { TaskCard } from '../components/TaskCard.jsx';
import { Modal } from '../components/Modal.jsx';
import { TaskSkeleton } from '../components/Skeleton.jsx';
import { Toast } from '../components/Toast.jsx';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask } = useTasks();
  
  const [toast, setToast] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });

  const loadTasks = useCallback(async () => {
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;
    if (filters.search) params.search = filters.search;
    await fetchTasks(params);
  }, [filters, fetchTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      setToast({ message: 'Task created successfully!', type: 'success' });
      setModalOpen(false);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(editingTask._id, taskData);
      setToast({ message: 'Task updated successfully!', type: 'success' });
      setModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    }
  };

  const handleDeleteTask = async (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setToast({ message: 'Task deleted successfully!', type: 'success' });
      } catch (error) {
        setToast({ message: error.message, type: 'error' });
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const task = tasks.find(t => t._id === id);
      await updateTask(id, { ...task, status: newStatus });
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {toast && <div className="fixed top-4 right-4"><Toast {...toast} onClose={() => setToast(null)} /></div>}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}!</h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </div>

        {/* Filters & Create Button */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={filters.priority}
              onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              onClick={() => {
                setEditingTask(null);
                setModalOpen(true);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              + New Task
            </button>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              {[...Array(6)].map((_, i) => <TaskSkeleton key={i} />)}
            </>
          ) : error ? (
            <div className="col-span-full bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
              {error}
            </div>
          ) : tasks.length === 0 ? (
            <div className="col-span-full bg-blue-50 border border-blue-200 text-blue-700 px-6 py-4 rounded-lg text-center">
              No tasks yet. Create one to get started!
            </div>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          isLoading={loading}
        />
      </Modal>
    </div>
  );
};