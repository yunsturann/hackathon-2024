import { Dispatch, HTMLAttributes, SetStateAction, useRef } from "react";

// ** Hooks
import useClickOutside from "@/hooks/use-click-outside";

// ** Utils
import { cn } from "@/lib/utils";

// ** Icons
import { BsThreeDots } from "react-icons/bs";

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  actionIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Dropdown = (props: DropdownProps) => {
  const { isOpen, setIsOpen, children, actionIcon } = props;

  // ** Refs
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  return (
    <div className="relative inline-block">
      {/* Actions Icon */}
      <div
        className="cursor-pointer text-xl text-blue-400 hover:text-blue-600 transition duration-300 px-1 py-0.5 hover:bg-gray-50 dark:hover:bg-gray-200 rounded-lg"
        title="actions"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {actionIcon || <BsThreeDots />}
      </div>

      {/* Actions Items */}
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute z-50 top-full mt-2 right-0 w-40 bg-white dark:bg-gray-500 border border-gray-400 shadow-lg p-1.5 rounded-lg space-y-1.5 text-sm tracking-tight"
        >
          {children}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

interface DropdownItemProps extends HTMLAttributes<HTMLLIElement> {}

export const DropdownItem = (props: DropdownItemProps) => {
  const { className, children, ...rest } = props;

  return (
    <li
      className={cn(
        "p-2 hover:bg-slate-200 hover:text-blue-400 dark:hover:bg-white rounded-md cursor-pointer transition",
        className
      )}
      {...rest}
    >
      {children}
    </li>
  );
};
