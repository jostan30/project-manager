import React from 'react';
import { ITask } from '@/app/lib/types';

interface MainContentProps {
  tasks: ITask[];
  isAdmin: boolean;
  fetchTasks: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ tasks, isAdmin, fetchTasks }) => {
  const handleDeleteTask = async (taskId: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/deleteTask`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId }),
    });
    fetchTasks();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Allocated Tasks</h2>

  {tasks.length === 0 ? (
    <p className="text-gray-500">No tasks assigned yet.</p>
  ) : (
    tasks.map((task) => (
      <div
        key={task._id}
        className="p-4 border rounded-lg mb-4 shadow-sm bg-gray-50"
      >
        <h3 className="text-lg font-medium text-gray-900">{task.name}</h3>
        <p className="text-sm text-gray-600">
          Deadline: {new Date(task.deadLine).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-700">Assigned to: {task.allotedTo}</p>

        {isAdmin && (
          <button
            onClick={() => handleDeleteTask(task._id)}
            className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete Task
          </button>
        )}
      </div>
    ))
  )}
</div>

  );
};

export default MainContent;
