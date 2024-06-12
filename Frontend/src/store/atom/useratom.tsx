import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import { User } from "./types";

const {persistAtom} = recoilPersist()
export const useratom = atom<User>({
    key : 'useratom',
    default: {
        id: null,
        name: null,
        email: null,
    },
    effects_UNSTABLE: [persistAtom],
})
