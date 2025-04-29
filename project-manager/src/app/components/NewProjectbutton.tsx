'use client';

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "../lib/useAuth"; // assuming a token-based hook
import { Button } from "@/components/ui/button";

function NewProjectbutton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const  token  = useAuth(); // replace with your token logic

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`,
          {
            name: "Untitled Project",
            startLine: new Date(),         // or choose a date input
            deadLine: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          toast.success("Project Created");
          router.push(`/doc/${res.data.project._id}`);
        } else {
          toast.error("Failed to create project");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div>
      <Button onClick={handleCreateNewDocument} className="text-center  mt-2" disabled={isPending}>
        {isPending ? "Creating..." : "New Project"}
      </Button>
    </div>
  );
}

export default NewProjectbutton;
