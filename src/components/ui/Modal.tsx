// ** React Imports

// ** Icons
import { FaX } from "react-icons/fa6";

// ** Utils
import { cn } from "@/lib/utils";

export interface ModalProps {
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  innerClass?: string;
}

const Modal = (props: ModalProps) => {
  const { title, children, innerClass, onClose } = props;

  return (
    <div className="fixed inset-0 h-screen w-full bg-black/40 z-10 flex items-center justify-center">
      <div
        className={cn(
          "z-20 flex flex-col bg-white dark:bg-gray-700 min-w-[320px] w-[94%] lg:w-1/2 min-h-[320px] rounded-xl p-4 sm:p-6",
          innerClass
        )}
      >
        {/* Modal Header */}
        <header className="flex justify-between gap-4 items-center">
          <h2 className="text-xl font-semibold ">{title}</h2>
          <div
            className="cursor-pointer hover:scale-110 transition duration-300"
            onClick={onClose}
          >
            <FaX />
          </div>
        </header>
        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto max-h-[80vh] mt-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
