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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = points.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(points.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div className="flex flex-col gap-y-4">
      {/* actions */}
      <div className="flex justify-between items-center gap-x-4">
        <Link href="/admin/recycle/create">
          <Button className="w-[220px]" color="green">
            Add new point
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
            {currentItems.map((point, index) => {
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
      <div className="flex justify-center items-center gap-x-4">
        <Button
          color="blue"
          className="w-[80px]"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          color="blue"
          className="w-[80px]"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="ml-4 py-2 px-3 border border-blue-300 rounded-md text-blue-600 hover:border-blue-500 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

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
