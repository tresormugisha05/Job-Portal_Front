import api from "./ApiSetter";
export interface UserModel {
  _id?: string;
  id?: string;
  FirstName: string;
  LastName: string;
  Email: string;
  UserType: UserRole;
  profile?: string;
  phone?: string;
  password?: string;
  avatar?: string;
  role?: UserRole;
  professionalTitle?: string;
  location?: string;
  experience?: string;
  education?: string;
  skills?: string[];
  summary?: string;
  workExperience?: WorkExperience[];
  educationHistory?: EducationHistory[];
  resume?: string;
  initials?: string;
}
export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string;
}
export type UserRole = "applicant" | "employer" | "admin";
export interface EducationHistory {
  degree: string;
  institution: string;
  year: string;
}
export const CandidateService = {
  getUser: async (id: string): Promise<UserModel> => {
    const response = await api.get(`candidates/${id}`);
    return response.data;
  },
  updateUser: async (id: string, data: UserModel): Promise<UserModel> => {
    const response = await api.put(`candidates/${id}`, data);
    return response.data;
  },
  getProfile: async (): Promise<UserModel> => {
    const response = await api.get(`candidates/profile`);
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
    const response = await api.post(`candidates`, data);
    return response.data;
  },
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`candidates/${id}`);
  },
  ChangePassword: async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    await api.post(`candidates/change-password`, {
      currentPassword,
      newPassword,
    });
  },
  LoginUser: async (UserData: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: UserModel }> => {
    const response = await api.post(`candidates/login`, UserData);
    return response.data;
  },
};
