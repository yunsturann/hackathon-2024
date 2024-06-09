import { auth, db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardCard from "../shared/DashboardCard";
import { FaBottleWater } from "react-icons/fa6";

const InfoCards = () => {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const q = query(
          collection(db, "product"),
          where("company_id", "==", auth.currentUser?.uid)
        );

        const querySnapshot = await getDocs(q);

        setProductCount(querySnapshot.size);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    fetchProductCount();
  }, []);

  return (
    <div className="">
      <DashboardCard
        title="Our Products"
        count={productCount}
        subtitle="products"
        Icon={<FaBottleWater />}
      />
    </div>
  );
};

export default InfoCards;
