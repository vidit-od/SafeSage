import { atom } from "recoil";

export const useratom = atom({
    key : 'useratom',
    default: {
        id: null,
        name: null,
        email: null,
    }
})