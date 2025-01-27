export type Task = {
  id?: number;
  name: string;
  description: string;
  teams: string[];
  status?: "TO DO" | "DOING" | "DONE" | string;
  priority: string;
  updatedAt?: string;
};
