import { db } from "@/config/firebase";
import { productCategoryItems } from "@/constants";
import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { create } from "zustand";

interface Dashboard {
  users: number;
  recyclePoints: number;
  companies: number;
}

interface ProductCountByCategory {
  category: string;
  count: number;
}

interface RecyclingPoints {
  capacity: number;
  fullness: number;
}

interface DashboardStore {
  isLoading: boolean;
  dashboard: Dashboard | null;
  fetchDashboard: () => void;
  productCategoryItems: ProductCountByCategory[];
  getProductCountByCategory: () => void;
  capacityAndFullness: RecyclingPoints | null;
  getCapacityAndFullness: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  isLoading: false,
  dashboard: null,
  fetchDashboard: async () => {
    try {
      set({ isLoading: true });
      const userSnap = await getCountFromServer(collection(db, "users"));
      const users = userSnap.data().count;

      const companiesSnap = await getCountFromServer(
        collection(db, "company_user")
      );
      const companies = companiesSnap.data().count;

      const recyclePointsSnap = await getCountFromServer(
        collection(db, "recycling_point")
      );
      const recyclePoints = recyclePointsSnap.data().count;

      set({
        dashboard: {
          users,
          companies,
          recyclePoints,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },
  productCategoryItems: productCategoryItems.map((item) => ({
    category: item.value,
    count: 0,
  })),
  getProductCountByCategory: async () => {
    try {
      const categoryCounts = productCategoryItems.map(async (item) => {
        const q = query(
          collection(db, "product"),
          where("category", "==", item.value)
        );
        const snap = await getDocs(q);

        return {
          category: item.value,
          count: snap.size,
        };
      });

      const resolvedCategoryCounts = await Promise.all(categoryCounts);

      set({
        productCategoryItems: resolvedCategoryCounts,
      });
    } catch (error) {
      console.error(error);
    }
  },
  capacityAndFullness: null,
  getCapacityAndFullness: async () => {
    try {
      const q = query(collection(db, "recycling_point"));
      const snap = await getDocs(q);

      const capacity = snap.docs.reduce((acc, doc) => {
        const data = doc.data();
        return acc + data.capacity;
      }, 0);

      const fullness = snap.docs.reduce((acc, doc) => {
        const data = doc.data();
        return acc + data.fullness;
      }, 0);

      set({
        capacityAndFullness: {
          capacity,
          fullness,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
}));
