import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import MultipleCategoriesSelect from "@/components/ui/MultipleCategoriesSelect";
import { db } from "@/config/firebase";
import { multipleCategoryItems } from "@/constants";
import { onInputFormatPhoneNumber, onInputLatAndLng } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  lat: yup
    .number()
    .required("Latitude is required")
    .typeError("Latitude must be a number"),
  lng: yup
    .number()
    .required("Longitude is required")
    .typeError("Latitude must be a number"),
  address: yup.string().required("Address is required"),
  capacity: yup
    .number()
    .required("Capacity is required")
    .typeError("Latitude must be a number"),
  phone: yup
    .string()
    .required("Phone is required")
    .min(12, "e.g: 555 444 3322"),
  categories: yup.array().of(yup.string()).required("Categories is required"),
  type: yup.boolean().required("Type is required"),
});

export type RecyclingPointForm = yup.InferType<typeof schema>;

const AdminPage = () => {
  const [categories, setCategories] = useState(
    Array.from(multipleCategoryItems)
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RecyclingPointForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      address: "",
      phone: "",
      categories: [],
      type: true,
    },
  });

  const handleCreatePoint = async (data: RecyclingPointForm) => {
    let count = 0;
    categories.forEach((category) => {
      if (category.isActive) {
        count++;
      }
    });
    if (count === 0) {
      setError("categories", {
        type: "required",
        message: "Categories is required",
      });
      return;
    }

    const collectionRef = collection(db, "recycling_point");

    try {
      await addDoc(collectionRef, {
        ...data,
        fullness: 0,
      });

      toast.success("Recycling point created successfully!");

      setCategories(multipleCategoryItems);

      reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div>
      <Container className="flex flex-col gap-y-8 md:gap-y-16">
        <header>
          <h2 className="header_title tracking-tight">
            Create a new recycling point
          </h2>
          <p className="header_desc">
            Fill in the form to create a new recycling point.
          </p>
        </header>

        {/* Form */}
        <form
          className="flex flex-col gap-y-6"
          onSubmit={handleSubmit(handleCreatePoint)}
        >
          {/* Title */}
          <Input
            {...register("title")}
            label="Recycling Point Title"
            error={errors.title?.message}
            necessary
            placeholder="e.g. Recycling Point Eskişehir"
          />

          {/* Latitude  and Longitude */}
          <div className="grid grid-cols-2 gap-6">
            <Input
              {...register("lat")}
              label="Latitude"
              error={errors.lat?.message}
              necessary
              onInput={onInputLatAndLng}
              placeholder="e.g. 39.7667"
            />
            <Input
              {...register("lng")}
              label="Longitude"
              error={errors.lng?.message}
              necessary
              onInput={onInputLatAndLng}
              placeholder="e.g. 30.5256"
            />
          </div>

          {/* Address */}
          <Input
            {...register("address")}
            label="Address"
            error={errors.address?.message}
            necessary
            placeholder="e.g. 1234 Recycling Street, Eskişehir, Turkey"
          />
          {/* Capacity & Phone */}
          <div className="flex justify-between gap-x-4">
            <Input
              {...register("capacity")}
              label="Capacity"
              error={errors.capacity?.message}
              necessary
              type="number"
              placeholder="e.g. 1000"
            />
            <Input
              {...register("phone")}
              label="Phone"
              error={errors.phone?.message}
              necessary
              onInput={onInputFormatPhoneNumber}
              placeholder="e.g. 555 444 3322"
              maxLength={12}
            />
          </div>

          {/* Categories */}
          <MultipleCategoriesSelect
            setValue={setValue}
            selectedValues={categories}
            setSelectedValues={setCategories}
            error={errors.categories?.message}
          />

          {/*Make  Checkbox default value is false */}
          <div className="flex items-center gap-x-2">
            <input
              {...register("type")}
              type="checkbox"
              id="type_checkbox"
              className="w-4 h-4 text-blue-500 border border-gray-300 rounded-md focus:ring-blue-500"
            />
            <label
              htmlFor="type_checkbox"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Is this a automatic recycling point?
            </label>
          </div>

          {/* Submit */}
          <Button type="submit" color="blue" className="mt-4">
            {isSubmitting ? "Creating point ..." : "Create point"}
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default AdminPage;
