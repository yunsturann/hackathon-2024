import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";
import CvDropzone from "@/components/ui/DropZone";
import Input from "@/components/ui/Input";
import SelectBox from "@/components/ui/SelectBox";
import { db } from "@/config/firebase";
import { productCategoryItems } from "@/constants";
import uploadImage from "@/lib/uploadImage";
import { useUserStore } from "@/store/use-user-store";
import { PRODUCT_CATEGORY } from "@/types/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { set } from "firebase/database";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const productSchema = yup.object().shape({
  name: yup.string().required("Title is required"),
  desc: yup.string().required("Description is required"),
  refund: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  nature_point: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Nature points is required"),
  category: yup
    .string()
    .oneOf(Object.values(PRODUCT_CATEGORY), "Invalid category")
    .required("Category is required"),
  image: yup.string().required("Image is required"),
  decomposition_year: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Decomposition year is required"),
  recycling_rate: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .min(0, "Recycling rate must be greater than 0")
    .max(100, "Recycling rate must be less than 100")
    .required("Recycling rate is required"),
});

export type ProductFormType = yup.InferType<typeof productSchema>;

const CreateProductPage = () => {
  const company_id = useUserStore((state) => state.user?.id);

  const [file, setFile] = React.useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormType>({
    resolver: yupResolver(productSchema),
  });

  const handleCreateProduct = async (data: ProductFormType) => {
    try {
      // set image to the firebase storage
      if (!file) throw new Error("Image is required");

      const imageUrl = await uploadImage(file);

      const productCollectionRef = collection(db, "product");

      await addDoc(productCollectionRef, {
        ...data,
        company_id,
        image: imageUrl,
      });

      toast.success("Product created successfully");

      reset();
      setFile(null);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <section>
      <Container className="flex flex-col gap-y-8 md:gap-y-16">
        <header>
          <h2 className="header_title tracking-tight">Create a new product</h2>
          <p className="header_desc">
            Fill out the form below to create a new product.
          </p>
        </header>
        {/* Product Form */}
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="flex flex-col gap-y-6"
        >
          {/* Product Name */}
          <Input
            {...register("name")}
            label="Product Name"
            placeholder="Enter product name"
            error={errors.name?.message}
            necessary
          />
          {/* Desc */}
          <Input
            {...register("desc")}
            label="Product Description"
            placeholder="Enter product description"
            error={errors.desc?.message}
            necessary
          />
          {/* Refund and Nature Point */}
          <div className="flex justify-between gap-x-4">
            <Input
              {...register("refund")}
              label="Product Price"
              placeholder="Enter the refund value for recycling this product"
              error={errors.refund?.message}
              type="number"
              necessary
            />
            <Input
              {...register("nature_point")}
              label="Nature Points"
              placeholder="Enter the nature points for this product"
              error={errors.nature_point?.message}
              type="number"
              necessary
            />
          </div>
          {/* Recycling Rate and Decompostion Year  */}
          <div className="flex justify-between gap-x-4">
            <Input
              {...register("recycling_rate")}
              label="Recycling Rate"
              placeholder="Enter the recycling rate for this product from 0 to 100"
              error={errors.recycling_rate?.message}
              type="number"
              necessary
            />
            <Input
              {...register("decomposition_year")}
              label="Decomposition Year"
              placeholder="Enter the decomposition year for this product"
              error={errors.decomposition_year?.message}
              type="number"
              necessary
            />
          </div>

          {/*Category*/}
          <SelectBox
            {...register("category")}
            options={productCategoryItems}
            label="Product Category"
            error={errors.category?.message}
          />

          {/* Image */}
          <CvDropzone
            file={file}
            setFile={setFile}
            error={errors.image?.message}
            className="mt-4"
            setValue={setValue}
          />

          {/* Submit */}
          <Button type="submit" color="blue" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default CreateProductPage;
