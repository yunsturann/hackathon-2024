import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <p className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Go to Homepage
        </p>
      </Link>
    </div>
  );
};

export default Custom404;
