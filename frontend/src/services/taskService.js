import { api } from "./api";

// Hämtar alla tasks för ett visst projekt
export const getTasksByProjectId = (projectId) => {
  const id = Number(projectId);

  if (!Number.isFinite(id) || id <= 0) {
    throw new Error(`Invalid projectId: ${projectId}`);
  }

  return api.get(`/projects/${id}/tasks`);
};

// Skapar en task (backend kräver: title + projectId)
export const createTask = ({ title, description, projectId }) => {
  const trimmedTitle = String(title ?? "").trim();
  const pid = Number(projectId);

  if (!trimmedTitle) throw new Error("Title is required");
  if (!Number.isFinite(pid) || pid <= 0) throw new Error(`Invalid projectId: ${projectId}`);

  const trimmedDescription = String(description ?? "").trim();
  const safeDescription = trimmedDescription ? trimmedDescription : null;

  return api.post("/tasks", {
    title: trimmedTitle,
    description: safeDescription,
    projectId: pid,
  });
};

// Tar bort en task med id
export const deleteTask = (id) => {
  const taskId = Number(id);

  if (!Number.isFinite(taskId) || taskId <= 0) {
    throw new Error(`Invalid task id: ${id}`);
  }

  return api.del(`/tasks/${taskId}`);
};
