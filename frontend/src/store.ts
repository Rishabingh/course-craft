import { create } from "zustand";

type TokenStore = {
  accessToken: string;
  setToken: (accessToken: string) => void;
  clearToken: () => void;
};

export const useTokenStore = create<TokenStore>((set) => ({
  accessToken: '',
  setToken: (accessToken: string) => {
    set({accessToken})
  },
  clearToken: () => {
    set({accessToken: ''})
  },
}));