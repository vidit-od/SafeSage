import { atom } from "recoil";
import { User } from "./types";
export const useratom = atom<User>({
    key : 'useratom',
    default: {
        id: null,
        name: null,
        email: null,
    }
})
