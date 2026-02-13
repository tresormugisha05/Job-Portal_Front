const API_BASE_URL = "https://job-portal-back-fdlt.onrender.com/api";

// Employer interfaces
export interface EmployerData {
  _id?: string;
  id?: string;
  companyName: string;
  industry: string;
  companySize: string;
  website?: string;
  description: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  logo?: string;
  isVerified?: boolean;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployerResponse {
  success: boolean;
  data?: EmployerData | EmployerData[];
  message?: string;
}

// Get all employers
export const getAllEmployers = async (): Promise<EmployerData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/employers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: EmployerResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch employers");
    }

    // Normalize data to handle both single and array responses
    if (Array.isArray(data.data)) {
      return data.data.map((employer) => ({
        ...employer,
        id: employer._id || employer.id,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching employers:", error);
    throw error;
  }
};

// Get employer by ID
export const getEmployerById = async (id: string): Promise<EmployerData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/employers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: EmployerResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch employer");
    }

    if (!Array.isArray(data.data)) {
      return {
        ...data.data,
        id: data.data?._id || data.data?.id,
      } as EmployerData;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching employer:", error);
    throw error;
  }
};

// Create a new employer
export const createEmployer = async (
  employerData: EmployerData,
): Promise<EmployerData> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/employers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(employerData),
    });

    const data: EmployerResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create employer");
    }

    if (!Array.isArray(data.data)) {
      return {
        ...data.data,
        id: data.data?._id || data.data?.id,
      } as EmployerData;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error creating employer:", error);
    throw error;
  }
};

// Update employer
export const updateEmployer = async (
  id: string,
  employerData: Partial<EmployerData>,
): Promise<EmployerData> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/employers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(employerData),
    });

    const data: EmployerResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update employer");
    }

    if (!Array.isArray(data.data)) {
      return {
        ...data.data,
        id: data.data?._id || data.data?.id,
      } as EmployerData;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error updating employer:", error);
    throw error;
  }
};

// Delete employer
export const deleteEmployer = async (id: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/employers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data: EmployerResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete employer");
    }

    return true;
  } catch (error) {
    console.error("Error deleting employer:", error);
    throw error;
  }
};

// Get employer by userId (for dashboard)
export const getEmployerByUserId = async (
  userId: string,
): Promise<EmployerData | null> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/employers?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data: EmployerResponse = await response.json();

    if (!response.ok) {
      return null;
    }

    if (Array.isArray(data.data) && data.data.length > 0) {
      const employer = data.data[0];
      return {
        ...employer,
        id: employer._id || employer.id,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching employer by userId:", error);
    return null;
  }
};

// Get top hiring companies
export const getTopHiringCompanies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/employers/top-hiring`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch top hiring companies");
    }

    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error("Error fetching top hiring companies:", error);
    throw error;
  }
};
