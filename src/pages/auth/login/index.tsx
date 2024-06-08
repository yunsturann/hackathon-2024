import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { auth } from "@/config/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

type TLoginForm = yup.InferType<typeof schema>;

const initialValues: TLoginForm = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const handleLogin = async ({ email, password }: TLoginForm) => {
    console.log(email, password);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Logged in successfully");

      router.push("/");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <>
      <h1 className="font-bold text-center text-2xl">Login</h1>
      <form
        className="flex flex-col gap-y-3"
        onSubmit={handleSubmit(handleLogin)}
      >
        {/* Email */}
        <Input
          {...register("email")}
          label="Email"
          error={errors.email?.message}
        />

        {/* Password */}
        <Input
          {...register("password")}
          label="Password"
          type="password"
          error={errors.password?.message}
        />

        {/* Submit */}
        <Button
          type="submit"
          color="orange"
          className="w-full mt-3"
          disabled={isSubmitting}
        >
          Login
        </Button>
      </form>
      <Link href="/auth/register">
        <p className="text-center  text-slate-600 mt-4">
          {`Don't have an account?`}{" "}
          <span className="text-blue-600">Register</span>
        </p>
      </Link>
    </>
  );
};

export default Login;
