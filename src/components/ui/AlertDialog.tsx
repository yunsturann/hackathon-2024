import React from "react";

interface AlertDialogProps {
  title: string;
  message: string;
  handleCancel: () => void;
  handleContinue: () => void;
  btnCancelText?: string;
  btnContinueText?: string;
}

const AlertDialog = (props: AlertDialogProps) => {
  const {
    title,
    message,
    handleCancel,
    handleContinue,
    btnCancelText = "Cancel",
    btnContinueText = "Continue",
  } = props;
  return (
    <div className="fixed inset-0 z-40 h-screen w-full bg-black/60 flex items-center justify-center">
      {/* Inner */}
      <div className="z-50 flex flex-col gap-y-4 p-6 w-full max-w-[500px] bg-white text-black dark:bg-gray-700 dark:text-white md:rounded-lg border border-gray-400 dark:border-gray-500 shadow-lg">
        {/* Content */}
        <div className="flex flex-col gap-y-2 text-center md:text-left">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-400">{message}</p>
        </div>
        {/* Actions */}
        <div className="flex flex-col-reverse md:flex-row gap-2 md:ml-auto">
          {/* Cancel button */}
          <button
            className="max-md:w-full py-2 px-4 text-sm tracking-tight border rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-opacity-50 bg-gray-100 border-gray-300 text-black hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:hover:bg-gray-600 focus:ring-gray-500 dark:focus:ring-gray-500"
            onClick={handleCancel}
          >
            {btnCancelText}
          </button>
          {/* Continue button */}
          <button
            className="max-md:w-full py-2 px-4 text-sm tracking-tight border rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-opacity-50 bg-gray-800 border-gray-950 text-white hover:bg-gray-700 focus:ring-gray-600 dark:bg-gray-100 dark:border-gray-300 dark:text-black dark:hover:bg-gray-300 dark:focus:ring-gray-500"
            onClick={handleContinue}
          >
            {btnContinueText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
