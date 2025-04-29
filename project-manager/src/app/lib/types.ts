// types.ts

// ========== User Interface ==========
export interface IUser {
    _id: string;
    name: string;
    email: string;
    userType?: 'admin' | 'member'; // Optional, depending on your frontend logic
  }
  
  // ========== Project Interface ==========
  export interface IProject {
    _id: string;
    name: string;
    startLine: string; // ISO string or formatted date
    deadLine: string;
    admin: IUser | string;
    UserInProject: IUser[] | string[];
  }
  
  // ========== Task Interface ==========
  export interface ITask {
    _id: string;
    name: string;
    allotedTo: string; // User ID
    RefProject: string; // Project ID
    deadLine: string;
    Assigned: string; // ISO date string
  }
  
  // ========== API Responses ==========
  
  // Project Detail
  export interface GetProjectByIdResponse {
    success: boolean;
    project: IProject;
  }
  
  // Project Creation / Fetching
  export interface CreateOrGetProjectsResponse {
    success: boolean;
    project?: IProject;
    personalProjects?: IProject[];
    sharedProjects?: IProject[];
    msg?: string;
  }
  
  // Task Actions
  export interface TaskResponse {
    success: boolean;
    task: ITask | ITask[];
    msg?: string;
  }
  
  // User Actions (add/remove user from project)
  export interface UserActionResponse {
    success: boolean;
    msg: string;
    project?: IProject;
  }
  
  // Admin Check
  export interface IsAdminResponse {
    success: boolean;
    isAdmin: boolean;
  }
  