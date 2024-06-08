import React, { forwardRef } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  necessary?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { className, error, label, necessary, ...rest } = props;

    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            {label} {necessary && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          {...rest}
          className="resize-none outline-none p-2 block w-full transition duration-300 ease-in-out text-black dark:text-white dark:bg-gray-600 rounded-md border border-gray-300 dark:border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
