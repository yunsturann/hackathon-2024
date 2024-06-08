import { cn } from "@/lib/utils";
import { IRecyclingPoint } from "@/types";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { db } from "@/config/firebase";
import Chip from "../ui/Chip";
import { multipleCategoryItems } from "@/constants";
import AlertDialog from "../ui/AlertDialog";

const RecycleTable = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState({
    show: false,
    id: "",
  });

  const [points, setPoints] = useState<IRecyclingPoint[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getDocs(collection(db, "recycling_point"));
        const products = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IRecyclingPoint[];

        setPoints(products);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    getProducts();
  }, []);

  const handleDeletePoint = async (id: string) => {
    try {
      await deleteDoc(doc(db, "recycling_point", id));

      setPoints((prev) => prev.filter((point) => point.id !== id));

      toast.success("Point deleted successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      {/* actions */}
      <div className="flex justify-between items-center gap-x-4">
        <Link href="/admin/recycle/create">
          <Button className="w-[220px]" color="green">
            Add Product
          </Button>
        </Link>
      </div>

      {/* table */}
      <div className="overflow-x-auto rounded-md border border-slate-200 shadow-xl dark:shadow-md text-center">
        <table className="w-full overflow-auto text-black dark:text-white ">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="table_head">Title</th>
              <th className="table_head">Phone</th>
              <th className="table_head">Categories</th>
              <th className="table_head">Fullness</th>
              <th className="table_head">Capacity</th>
              <th className="table_head">Is Automat</th>
              <th className="table_head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {points.map((point, index) => {
              const isEven = index % 2 === 0;
              return (
                <tr
                  key={point.id}
                  className={`${isEven ? "bg-white" : "bg-slate-100"}`}
                >
                  <td
                    className={cn("table_data", {
                      "border-slate-100": isEven,
                    })}
                  >
                    {point.title}
                  </td>
                  <td
                    className={cn("table_data", {
                      "border-slate-100": isEven,
                    })}
                  >
                    {point.phone}
                  </td>
                  <td
                    className={cn("table_data flex flex-wrap gap-1", {
                      "border-slate-100": isEven,
                    })}
                  >
                    {point.categories.map((category, index) => {
                      const color = multipleCategoryItems.find(
                        (item) => item.value === category
                      )?.color;

                      return (
                        <Chip key={index} customColor={color}>
                          {category}
                        </Chip>
                      );
                    })}
                  </td>
                  <td
                    className={cn("table_data", {
                      "border-slate-100": isEven,
                    })}
                  >
                    {point.fullness}
                  </td>
                  <td
                    className={cn("table_data", {
                      "border-slate-100": isEven,
                    })}
                  >
                    {point.capacity}
                  </td>
                  <td
                    className={cn("table_data", {
                      "border-slate-100": isEven,
                    })}
                  >
                    {point.type ? "Automat" : "Personnel"}
                  </td>

                  {/* Actions */}
                  <td
                    className={cn("table_data", {
                      "border-slate-100": isEven,
                    })}
                  >
                    {/* <Link href={`/products/update`}>
                      <Button color="blue" className="w-[80px] text-xs">
                        Update
                      </Button>
                    </Link> */}
                    <Button
                      color="red"
                      className="w-[80px] text-xs"
                      onClick={() => {
                        setShowDeleteDialog({ show: true, id: point.id });
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}

      {/* Alert Dialog */}
      {showDeleteDialog.show && (
        <AlertDialog
          title="Delete Point?"
          message="Are you sure you want to delete this point?"
          handleCancel={() => setShowDeleteDialog({ show: false, id: "" })}
          handleContinue={() => {
            handleDeletePoint(showDeleteDialog.id);
            setShowDeleteDialog({ show: false, id: "" });
          }}
        />
      )}
    </div>
  );
};

export default RecycleTable;
