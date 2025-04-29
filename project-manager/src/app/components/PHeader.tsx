import React from 'react';
import {
  IUser,
  IProject,
} from '@/app/lib/types';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  project: IProject | null;
  isAdmin: boolean;
  fetchProject: () => void;
  fetchTasks: () => void;
  projectId: string;
}

const Header: React.FC<HeaderProps> = ({
  project,
  isAdmin,
  fetchProject,
  fetchTasks,
  projectId,
}) => {
  const handleAddUser = async () => {
    const email = prompt('Enter user email to add:');
    if (!email) return;
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/addUsers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, projectId }),
    });
    fetchProject();
  };

  const handleRemoveUser = async (userId: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/removeUsers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, targetUserId: userId }),
    });
    fetchProject();
  };

  const handleAllocateTask = async () => {
    const name = prompt('Task name:');
    const userId = prompt('Allot to user ID:');
    const deadLine = prompt('Deadline (YYYY-MM-DD):');
    if (!name || !userId || !deadLine) return;
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/allocateTask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, allotedTo: userId, RefProject: projectId, deadLine }),
    });
    fetchTasks();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">{project?.name}</h1>
  
    {isAdmin && (
      <div className="space-y-4">
        <div className="flex gap-4 mb-2">
          <Button
            onClick={handleAddUser}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer "
          >
            Add User
          </Button>
          <Button
            onClick={handleAllocateTask}
            className="bg-green-600 hover:bg-green-700  cursor-pointer"
          >
            Allocate Task
          </Button>
        </div>
  
        <div className="space-y-2">
          {project?.UserInProject?.map((user: IUser | string) =>
            typeof user === 'string' ? null : (
              <div
                key={user._id}
                className="flex justify-between items-center p-3 border rounded bg-gray-50"
              >
                <span className="text-gray-700">{user.name}</span>
                <Button
                  onClick={() => handleRemoveUser(user._id)}
                  className="bg-red-500 hover:bg-red-600  cursor-pointer"
                >
                  Remove
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    )}
  </div>
  
  );
};

export default Header;
