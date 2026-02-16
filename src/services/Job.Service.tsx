import api from "./ApiSetter";
import type { Job } from "../data/jobs";

const jobService = {
  addJob: async (jobData: Job) => {
    try {
      const response = await api.post("/jobs", jobData);
      return response.data;
    } catch (error) {
      console.error("Error adding job:", error);
      throw error;
    }
  },
  // Other job-related service calls can be added here
};

export default jobService;
