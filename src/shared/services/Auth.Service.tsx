import api from "./ApiSetter"
export interface UserModel {
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
export type UserRole = "CANDIDATE" | "EMPLOYER" | "ADMIN";
export interface EducationHistory {
  degree: string;
  institution: string;
  year: string;
}
export const CandidateService ={
    getUser: async(id:string):Promise<UserModel> =>{
        const response = await api.get(`candidates/${id}`)
        return response.data
    },
    updateUser: async(id:string,data:UserModel):Promise<UserModel> =>{
        const response = await api.put(`candidates/${id}`,data)
        return response.data
    },
    getProfile: async ():Promise<UserModel>=>{
        const response = await api.get(`candidates/profile`)
        return response.data
    },
    createUser: async():Promise<UserModel>=>{
        const response = await api.post(`candidates`)
        return response.data
    },
    deleteUser: async(id:string):Promise<void>=>{
        await api.delete(`candidates/${id}`)
    },
    ChangePassword: async(currentPassword:string,newPassword:string):Promise<void>=>{
        await api.post(`candidates/change-password`,{currentPassword,newPassword})
    },
    LoginUser: async (UserData:{Email:string,Password:string}):Promise<{token:string; User:UserModel}>=>{
        const response = await api.post(`candidates/login`, UserData)
        return response.data
    }
}
