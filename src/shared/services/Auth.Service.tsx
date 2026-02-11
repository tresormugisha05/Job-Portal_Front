import api from "./ApiSetter";

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationHistory {
  id: string;
  degree: string;
  institution: string;
  year: string;
}
export type UserRole = "CANDIDATE" | "EMPLOYER" | "ADMIN" | "GUEST";
export interface UserModel {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  role: UserRole;
  professionalTitle?: string;
  location?: string;
  experience?: string;
  education?: string;
  skills: string[];
  summary?: string;
  workExperience: WorkExperience[];
  educationHistory: EducationHistory[];
  resume?: string;
  initials?: string;
  isActive: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  employerId?: string;
}
export const CandidateService = {
  getAllUsers: async (): Promise<UserModel[]> => {
    const response = await api.get(`auth`);
    return response.data.data;
  },
  getUser: async (id: string): Promise<UserModel> => {
    const response = await api.get(`auth/${id}`);
    return response.data;
  },
  updateUser: async (id: string, data: UserModel): Promise<UserModel> => {
    const response = await api.put(`auth/${id}`, data);
    return response.data;
  },
  getProfile: async (): Promise<UserModel> => {
    const response = await api.get(`auth/profile`);
    return response.data;
  },
  createUser: async (data: {
    FirstName: string;
    LastName: string;
    Age: string;
    PhoneNumber: string;
    Email: string;
    password: string;
    UserType: UserRole;
  }): Promise<UserModel> => {
    const response = await api.post(`auth/register`, data);
    return response.data;
  },
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`auth/${id}`);
  },
  ChangePassword: async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    await api.post(`auth/change-password`, {
      currentPassword,
      newPassword,
    });
  },
  LoginUser: async (UserData: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: UserModel }> => {
    const response = await api.post(`auth/login`, UserData);
    return response.data;
  },
};
