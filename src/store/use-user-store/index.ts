import { db } from "@/config/firebase";
import { USER_TYPE } from "@/types/enums";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";

export interface User {
  company_email: string;
  company_phone: string;
  id: string;
  supervisor_name: string;
  supervisor_surname: string;
  user_type: USER_TYPE;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  fetchUser: (uid: string) => void;
  setUser: (value: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  fetchUser: async (uid: string) => {
    if (!uid) return set({ user: null, isLoading: false });
    set({ isLoading: true });

    try {
      const docRef = doc(db, "company_user", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({
          user: {
            ...docSnap.data(),
            id: docSnap.id,
          } as User,
          isLoading: false,
        });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (err) {
      return set({ user: null, isLoading: false });
    }
  },
  setUser: (value) => set({ user: value, isLoading: false }),
}));
