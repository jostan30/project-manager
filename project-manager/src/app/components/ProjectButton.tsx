'use client';

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../lib/useAuth"; // replace with your actual token logic

interface Project {
  _id: string;
  name: string;
}

function ProjectButton({ href, id }: { href: string; id: string }) {
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const token  = useAuth(); // if you're using a hook to get auth token

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProject(res.data.project);
      } catch (error) {
        console.error(`Failed to fetch project ${id}`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, token]);

  if (loading) return <p><Loader2 className="mx-auto animate-spin" /></p>;
  if (!project || !project.name) return null;

  return (
    <Link
      href={href}
      className={`relative border p-2 rounded-md mt-3 ${
        isActive ? "bg-gray-200 font-bold border-black" : "border-gray-400 text-center"
      }`}
    >
      <p className="truncate text-center">{project.name}</p>
    </Link>
  );
}

export default ProjectButton;
