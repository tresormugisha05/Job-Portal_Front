const API_BASE_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";

export interface EmployerData {
  _id?: string;
  id?: string;
  companyName: string;
  industry: string;
  companySize: string;
  website?: string;
  description: string;
  location: string;
  email: string;
  contactPhone: string;
  logo?: string;
  isVerified?: boolean;
  jobCount?: number;
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

// Get top hiring companies
export const getTopHiringCompanies = async (): Promise<EmployerData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/employers/top-hiring`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: EmployerResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch top hiring companies");
    }

    if (Array.isArray(data.data)) {
      return data.data.map((employer) => ({
        ...employer,
        id: employer._id || employer.id,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching top hiring companies:", error);
    throw error;
  }
};
