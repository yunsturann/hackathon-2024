import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { onInputFormatPhoneNumber, onInputRemoveSpace } from "@/lib/utils";
import { USER_TYPE } from "@/types/enums";

const schema = yup.object().shape({
  supervisor_name: yup.string().required("Name is required"),
  supervisor_surname: yup.string().required("Surname is required"),
  company_name: yup.string().required("Company name is required"),
  company_email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required"),

  company_phone: yup
    .string()
    .required("Phone is required")
    .min(12, "e.g: 555 444 3322"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

type TRegisterForm = yup.InferType<typeof schema>;

const initialValues: TRegisterForm = {
  supervisor_name: "",
  supervisor_surname: "",
  company_name: "",
  company_email: "",
  company_phone: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const handleRegister = async (data: TRegisterForm) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.company_email,
        data.password
      );

      const { password, confirmPassword, ...rest } = data;

      await setDoc(doc(db, "company_user", res.user.uid), {
        ...rest,
        id: res.user.uid,
        user_type: USER_TYPE.COMPANY,
      });

      toast.success("User created successfully");
      router.push("/auth/login");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <h1 className="font-bold text-center text-2xl">Register</h1>
      <form
        className="flex flex-col gap-y-3"
        onSubmit={handleSubmit(handleRegister)}
      >
        {/* Name Surname */}
        <div className="flex max-sm:flex-col justify-between gap-x-12 gap-y-3">
          <Input
            {...register("supervisor_name")}
            label="Supervisor Name"
            error={errors.supervisor_name?.message}
            necessary
            maxLength={50}
          />
          <Input
            {...register("supervisor_surname")}
            label="Supervisor Surname"
            error={errors.supervisor_surname?.message}
            necessary
            maxLength={50}
          />
        </div>
        {/* Company NAME */}
        <Input
          {...register("company_name")}
          label="Company Name"
          error={errors.company_name?.message}
          necessary
          maxLength={50}
        />
        {/* Phone */}
        <Input
          {...register("company_phone")}
          label="Company Phone"
          error={errors.company_phone?.message}
          necessary
          onInput={onInputFormatPhoneNumber}
          maxLength={12}
        />

        {/* Email */}
        <Input
          {...register("company_email")}
          label="Company Email"
          type="email"
          error={errors.company_email?.message}
          necessary
          onInput={onInputRemoveSpace}
          maxLength={50}
        />

        {/* Password & Confirm */}

        <Input
          {...register("password")}
          label="Password"
          type="password"
          error={errors.password?.message}
          necessary
        />
        <Input
          {...register("confirmPassword")}
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message}
          necessary
        />

        <Button
          type="submit"
          color="orange"
          className="mt-4"
          disabled={isSubmitting}
        >
          Register
        </Button>
      </form>
      <Link href="/auth/login">
        <p className="text-center  text-slate-600 mt-4">
          Already have an account? <span className="text-blue-600">Login</span>
        </p>
      </Link>
    </>
  );
};

export default Register;
