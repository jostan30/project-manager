'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/app/components/PHeader';
import MainContent from '@/app/components/PMainContent';
import { IProject, ITask } from '@/app/lib/types';
import { useParams } from 'next/navigation'
import { useAuth } from '@/app/lib/useAuth';

const ProjectPage = () => {
  const params = useParams();
  const projectId = params.id as string;
  const token = useAuth()

  console.log("Project ID:", projectId);
  
  const [project, setProject] = useState<IProject | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (projectId) {
      fetchProject();
      checkAdmin();
      fetchTasks();
    }
  }, [projectId ,token]);

  const fetchProject = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 send token
          },
        }
      );
      setProject(res.data.project);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(res.data.task);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const checkAdmin = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/isAdmin`,
        { projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsAdmin(res.data.isAdmin);
    } catch (error) {
      console.error("Error checking admin:", error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <Header
        project={project}
        isAdmin={isAdmin}
        fetchProject={fetchProject}
        fetchTasks={fetchTasks}
        projectId={projectId}
      />
      <MainContent
        tasks={tasks}
        isAdmin={isAdmin}
        fetchTasks={fetchTasks}
      />
    </div>
  );
};

export default ProjectPage;
