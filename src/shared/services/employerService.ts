import api from "./ApiSetter";

export interface EmployerData {
  _id?: string;
  id?: string;
  companyName: string;
  industry?: string;
  companySize?: string;
  website?: string;
  description?: string;
  location?: string;
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
    const response = await api.get("/employers/all");
    const data: EmployerResponse = response.data;

    if (Array.isArray(data.data)) {
      return data.data.map((employer) => ({
        ...employer,
        id: employer._id || employer.id,
      }));
    }

    return [];
  } catch (error: any) {
    console.error("Error fetching employers:", error);
    throw error;
  }
};

// Get employer by ID
export const getEmployerById = async (id: string): Promise<EmployerData> => {
  try {
    const response = await api.get(`/employers/${id}`);
    const data: EmployerResponse = response.data;

    if (data.data && !Array.isArray(data.data)) {
      return {
        ...data.data,
        id: data.data?._id || data.data?.id,
      } as EmployerData;
    }

    throw new Error("Invalid response format");
  } catch (error: any) {
    console.error("Error fetching employer:", error);
    throw error;
  }
};

// Get top hiring companies
export const getTopHiringCompanies = async (): Promise<EmployerData[]> => {
  try {
    const response = await api.get("/employers/top-hiring");
    const data: EmployerResponse = response.data;

    if (Array.isArray(data.data)) {
      return data.data.map((employer) => ({
        ...employer,
        id: employer._id || employer.id,
      }));
    }

    return [];
  } catch (error: any) {
    console.error("Error fetching top hiring companies:", error);
    throw error;
  }
};
