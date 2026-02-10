import api from "./ApiSetter";
export interface userAuth {
  _id?: string;
  FirstName: string;
  LastName:string;
  Age:string
  email: string;
  phone?: string;
  profile?: string;
  password: string;
  UserType: "applicant" | "employer" | "admin"
  resetPasswordToken?: String;
  resetPasswordExpires?: Date;
  createdAt: Date;
}
export const userService = {
  // GET all users
  getUsers: async (params?: {
    search?: string;
    role?: string;
  }): Promise<userAuth> => {
    const response = await api.get("/api/auth", { params });
    return response.data;
  },

  // GET single user
  getUser: async (id: string): Promise<userAuth> => {
    const response = await api.get(`/api/auth/${id}`);
    return response.data;
  },

  // GET profile
  getProfile: async (): Promise<userAuth> => {
    const response = await api.get("/api/auth/profile");
    return response.data;
  },

  // POST create user
  createUser: async (userData: {
    FirstName: string;
    LastName: string;
    Age: string;
    phone: string;
    profile?: string;
    password: string;
    email: string;
    UserType?: "applicant" | "employer" | "admin";
  }) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  },

  LoginUser: async (userData: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: userAuth }> => {
    const response = await api.post("/api/auth/login", userData);
    return response.data;
  },

  updateProfile: async (userData: FormData): Promise<userAuth> => {
    const response = await api.put("/api/auth/profile", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  changePassword: async (passwords: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.post("/api/auth/change-password", passwords);
    return response.data;
  },

  deleteAccount: async (): Promise<{ message: string }> => {
    const response = await api.delete("/api/auth/account");
    return response.data;
  },

  updateUser: async (
    id: string,
    userData: Partial<{ name: string; email: string; role: string }>,
  ): Promise<userAuth> => {
    const response = await api.put(`/api/auth/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/api/auth/${id}`);
    return response.data;
  },
};
