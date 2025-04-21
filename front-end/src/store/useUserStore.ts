import { create } from "zustand";

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  resetUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  resetUser: () =>
    set({ firstName: "", lastName: "", email: "", password: "" }),
}));

export default useUserStore;
