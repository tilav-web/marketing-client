import { privateInstance } from "@/api/api-client";

class UserService {
  async findById(id: string) {
    try {
      const res = await privateInstance.get(`/user/${id}`);
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  }

  async findMe() {
    try {
      const res = await privateInstance.get("/user/me");
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  }

  async findAll() {
    try {
      const res = await privateInstance.get("/users");
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  }
  async login(email: string, password: string) {
    try {
      const res = await privateInstance.post("/login", {
        email,
        password,
      });
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  }
  async register(name: string, email: string, password: string) {
    try {
      const res = await privateInstance.post("/register", {
        name,
        email,
        password,
      });
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  }
}

export const userService = new UserService();
