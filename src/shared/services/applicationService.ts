const API_BASE_URL = "http://localhost:5000/api";

// Application interfaces
export interface ApplicationData {
  _id?: string;
  id?: string;
  jobId: any; // Can be populated with Job object
  userId: any; // Can be populated with User object
  employerId: string;
  resume: string;
  coverLetter?: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired";
  notes?: string;
  submissionDate?: string;
  lastUpdated?: string;
}

export interface ApplicationResponse {
  success: boolean;
  data?: ApplicationData | ApplicationData[];
  message?: string;
}

// Get all applications (admin only)
export const getAllApplications = async (): Promise<ApplicationData[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data: ApplicationResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch applications");
    }

    if (Array.isArray(data.data)) {
      return data.data.map((app) => ({
        ...app,
        id: app._id || app.id,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

// Get application by ID
export const getApplicationById = async (
  id: string,
): Promise<ApplicationData> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data: ApplicationResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch application");
    }

    if (!Array.isArray(data.data)) {
      return {
        ...data.data,
        id: data.data?._id || data.data?.id,
      } as ApplicationData;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error;
  }
};

// Get applications by job ID
export const getApplicationsByJob = async (
  jobId: string,
): Promise<ApplicationData[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/applications/job/${jobId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data: ApplicationResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch job applications");
    }

    if (Array.isArray(data.data)) {
      return data.data.map((app) => ({
        ...app,
        id: app._id || app.id,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw error;
  }
};

// Get applications by user ID
export const getApplicationsByUser = async (
  userId: string,
): Promise<ApplicationData[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/applications/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );

    const data: ApplicationResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch user applications");
    }

    if (Array.isArray(data.data)) {
      return data.data.map((app) => ({
        ...app,
        id: app._id || app.id,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching user applications:", error);
    throw error;
  }
};

// Get applications by employer ID
export const getApplicationsByEmployer = async (
  employerId: string,
): Promise<ApplicationData[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/applications/employer/${employerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );

    const data: ApplicationResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch employer applications");
    }

    if (Array.isArray(data.data)) {
      return data.data.map((app) => ({
        ...app,
        id: app._id || app.id,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching employer applications:", error);
    throw error;
  }
};

// Submit an application
export const submitApplication = async (
  jobId: string,
  applicationData: Partial<ApplicationData>,
  resume?: File,
  coverLetter?: File,
): Promise<ApplicationData> => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Add form fields
    formData.append("jobId", jobId);
    Object.entries(applicationData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    // Add files
    if (resume) {
      formData.append("resume", resume);
    }
    if (coverLetter) {
      formData.append("coverLetter", coverLetter);
    }

    const response = await fetch(`${API_BASE_URL}/applications/${jobId}`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    const data: ApplicationResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit application");
    }

    if (!Array.isArray(data.data)) {
      return {
        ...data.data,
        id: data.data?._id || data.data?.id,
      } as ApplicationData;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};

// Update application status
export const updateApplicationStatus = async (
  id: string,
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired",
  notes?: string,
): Promise<ApplicationData> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ status, notes }),
    });

    const data: ApplicationResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update application status");
    }

    if (!Array.isArray(data.data)) {
      return {
        ...data.data,
        id: data.data?._id || data.data?.id,
      } as ApplicationData;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error updating application status:", error);
    throw error;
  }
};

// Delete application
export const deleteApplication = async (id: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data: ApplicationResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete application");
    }

    return true;
  } catch (error) {
    console.error("Error deleting application:", error);
    throw error;
  }
};
