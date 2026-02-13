const API_BASE_URL = "http://localhost:5000/api";

// Job interfaces
export interface JobData {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  company: string;
  requirements: string;
  responsibilities: string;
  category: string;
  jobType: string;
  location: string;
  salary?: string;
  deadline: string;
  employerId: string;
  views?: number;
  applicationCount?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  logo?: string;
  logoBg?: string;
  type?: string;
  typeBg?: string;
  experience?: string;
  education?: string;
  tags?: string[];
  featured?: boolean;
}

export interface JobResponse {
  success: boolean;
  data?: JobData | JobData[];
  message?: string;
}

// Get all jobs
export const getAllJobs = async (): Promise<JobData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: JobResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch jobs");
    }

    if (Array.isArray(data.data)) {
      return data.data.map((job) => ({
        ...job,
        id: job._id || job.id,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// Get job by ID
export const getJobById = async (id: string): Promise<JobData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: JobResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch job");
    }

    if (!Array.isArray(data.data)) {
      return {
        ...data.data,
        id: data.data?._id || data.data?.id,
      } as JobData;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error;
  }
};

// Get jobs by employer ID
export const getJobsByEmployer = async (
  employerId: string,
): Promise<JobData[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/jobs/employer/${employerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );

    const data: JobResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch jobs");
    }

    if (Array.isArray(data.data)) {
      return data.data.map((job) => ({
        ...job,
        id: job._id || job.id,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching employer jobs:", error);
    throw error;
  }
};

// Create a new job
export const createJob = async (jobData: JobData): Promise<JobData> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(jobData),
    });

    const data: JobResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create job");
    }

    if (!Array.isArray(data.data)) {
      return {
        ...data.data,
        id: data.data?._id || data.data?.id,
      } as JobData;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

// Update a job
export const updateJob = async (
  id: string,
  jobData: Partial<JobData>,
): Promise<JobData> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(jobData),
    });

    const data: JobResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update job");
    }

    if (!Array.isArray(data.data)) {
      return {
        ...data.data,
        id: data.data?._id || data.data?.id,
      } as JobData;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

// Delete a job
export const deleteJob = async (id: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data: JobResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete job");
    }

    return true;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};

// Search jobs
export const searchJobs = async (query: string): Promise<JobData[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/jobs/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data: JobResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to search jobs");
    }

    if (Array.isArray(data.data)) {
      return data.data.map((job) => ({
        ...job,
        id: job._id || job.id,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error searching jobs:", error);
    throw error;
  }
};
