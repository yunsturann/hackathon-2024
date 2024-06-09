/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IProduct } from "@/types";
import toast from "react-hot-toast";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import AlertDialog from "../ui/AlertDialog";

const ProductTable = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState({
    show: false,
    id: "",
  });

  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsRef = collection(db, "product");
        const q = query(
          productsRef,
          where("company_id", "==", auth.currentUser?.uid)
        );

        const data = await getDocs(q);
        const products = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IProduct[];

        setProducts(products);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    getProducts();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "product", id));

      setProducts((prev) => prev.filter((product) => product.id !== id));

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

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
        <Link href="/products/create">
          <Button className="w-[220px]" color="green">
            Add Product
          </Button>
        </Link>
      </div>

      {/* table */}
      {currentItems.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded-md border border-slate-200 shadow-xl dark:shadow-md text-center">
            <table className="w-full overflow-auto text-black dark:text-white ">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="table_head">Image</th>
                  <th className="table_head">Name</th>
                  <th className="table_head">Description</th>
                  <th className="table_head">Category</th>
                  <th className="table_head">Decomposition Year</th>
                  <th className="table_head">Nature Point</th>
                  <th className="table_head">Recycling Rate</th>
                  <th className="table_head">Refund</th>
                  <th className="table_head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <tr
                      key={product.id}
                      className={`${isEven ? "bg-white" : "bg-slate-100"}`}
                    >
                      <td
                        className={cn("table_data", {
                          "border-slate-100": isEven,
                        })}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-contain size-10 "
                        />
                      </td>
                      <td
                        className={cn("table_data", {
                          "border-slate-100": isEven,
                        })}
                      >
                        {product.name}
                      </td>
                      <td
                        className={cn("table_data", {
                          "border-slate-100": isEven,
                        })}
                      >
                        {product.desc}
                      </td>
                      <td
                        className={cn("table_data", {
                          "border-slate-100": isEven,
                        })}
                      >
                        {product.category}
                      </td>
                      <td
                        className={cn("table_data", {
                          "border-slate-100": isEven,
                        })}
                      >
                        {product.decomposition_year}
                      </td>
                      <td
                        className={cn("table_data", {
                          "border-slate-100": isEven,
                        })}
                      >
                        {product.nature_point}
                      </td>

                      <td
                        className={cn("table_data", {
                          "border-slate-100": isEven,
                        })}
                      >
                        {product.recycling_rate}
                      </td>

                      <td
                        className={cn("table_data", {
                          "border-slate-100": isEven,
                        })}
                      >
                        {product.refund}
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
                            setShowDeleteDialog({ show: true, id: product.id });
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
        </>
      ) : (
        <p>No products found. Add a new product to get started.</p>
      )}

      {/* Alert Dialog */}
      {showDeleteDialog.show && (
        <AlertDialog
          title="Delete Product"
          message="Are you sure you want to delete this product?"
          handleCancel={() => setShowDeleteDialog({ show: false, id: "" })}
          handleContinue={() => {
            handleDeleteProduct(showDeleteDialog.id);
            setShowDeleteDialog({ show: false, id: "" });
          }}
        />
      )}
    </div>
  );
};

export default ProductTable;
