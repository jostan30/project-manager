"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "../lib/useAuth"; // assumed custom hook that provides token

// Dummy placeholders
import NewDocumentbutton from "./NewProjectbutton";
import ProjectButton from "./ProjectButton";
// import DocumentButon from "./DocumentButon";

interface Project {
  _id: string;
  name: string;
  admin: string;
  // other fields if needed
}

function Sidebar() {
  const [groupedData, setGroupedData] = useState<{
    personal: Project[];
    shared: Project[];
  }>({
    personal: [],
    shared: [],
  });

  const  token  = useAuth(); // assuming useAuth returns token

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          setGroupedData({
            personal: res.data.personalProjects || [],
            shared: res.data.sharedProjects || [],
          });
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    if (token) fetchProjects();
  }, [token]);

  const menuOptions = (
    <div className="flex flex-col align-middle items-center">
      <NewDocumentbutton />

      {/* Personal Projects */}
      {groupedData.personal.length === 0 ? (
        <h2 className="text-gray-500 font-semibold text-sm text-center mt-3">
          Get Started
        </h2>
      ) : (
        <>
          <h2 className="text-gray-500 font-semibold text-sm text-center mt-3">
            My Projects
          </h2>
          {groupedData.personal.map((project) => (
            <ProjectButton
              key={project._id}
              id={project._id}
              href={`/project/${project._id}`}
            />
          ))}
        </>
      )}

      {/* Shared Projects */}
      {groupedData.shared.length > 0 && (
        <>
          <h2 className="text-gray-500 font-semibold text-sm text-center mt-3">
            Shared with Me
          </h2>
          {groupedData.shared.map((project) => (
            <ProjectButton
              key={project._id}
              id={project._id}
              href={`/project/${project._id}`}
            />
          ))}
        </>
      )}
    </div>
  );

  return (
    <div className="p-3 md:p-5 bg-gray-200 relative w-100">
      {/* Mobile View */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="justify-items-center p-5 space-y-3.5"
          >
            <SheetHeader>
              <SheetTitle className="text-center text-2xl">Menu</SheetTitle>
            </SheetHeader>
            {menuOptions}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}

export default Sidebar;
