import { use, useRef, useState } from "react";
import { multipleCategoryItems } from "@/constants";
import { RecyclingPointForm } from "@/pages/admin/recycle/create";
import { UseFormSetValue } from "react-hook-form";
import { cn } from "@/lib/utils";
import useClickOutside from "@/hooks/use-click-outside";
import Chip from "./Chip";
import { PRODUCT_CATEGORY } from "@/types/enums";

type CategoryItem = {
  label: string;
  value: PRODUCT_CATEGORY;
  isActive: boolean;
  color: string;
}[];

interface MultipleCategoriesSelectProps {
  setValue: UseFormSetValue<RecyclingPointForm>;
  error?: string;
  selectedValues: CategoryItem;
  setSelectedValues: React.Dispatch<React.SetStateAction<CategoryItem>>;
}

const MultipleCategoriesSelect = (props: MultipleCategoriesSelectProps) => {
  const { setValue, error, selectedValues, setSelectedValues } = props;

  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null); // Referans oluşturuluyor

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const handleSelectCategory = (value: string) => {
    const newSelectedValues = selectedValues.map((item) => {
      if (item.value === value) {
        return {
          ...item,
          isActive: !item.isActive,
        };
      }

      return item;
    });

    setSelectedValues(newSelectedValues);

    const selectedCategories = newSelectedValues
      .filter((item) => item.isActive)
      .map((item) => item.value);

    setValue("categories", selectedCategories);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
        Categories {<span className="text-red-500">*</span>}
      </label>
      {/* Actions Icon */}
      <div ref={wrapperRef} className="relative">
        <div
          className={cn(
            "cursor-pointer outline-none p-2 block w-full transition duration-300 ease-in-out text-black dark:text-white dark:bg-gray-600 rounded-md border border-gray-300 dark:border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50",
            {
              "border-blue-500": isOpen,
            }
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedValues.filter((item) => item.isActive).length === 0 ? (
            <span className="text-gray-400">Select categories</span>
          ) : (
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {selectedValues
                .filter((item) => item.isActive)
                .map((item) => (
                  <Chip key={item.value} customColor={item.color}>
                    {item.label}
                  </Chip>
                ))}
            </div>
          )}
        </div>

        {/* Actions Items */}
        {isOpen && (
          <ul className="absolute z-50 top-full mt-1 right-0 w-1/2 bg-white dark:bg-gray-500 border border-gray-400 shadow-lg p-1.5 rounded-lg space-y-1.5 text-sm tracking-tight">
            {multipleCategoryItems.map((item, index) => (
              <li
                key={item.value}
                className={cn(
                  "p-2 hover:bg-slate-200 hover:text-blue-400 dark:hover:bg-white rounded-md cursor-pointer transition",
                  {
                    "bg-slate-200 text-blue-400":
                      selectedValues[index].isActive,
                  }
                )}
                onClick={() => handleSelectCategory(item.value)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Selected Chips */}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default MultipleCategoriesSelect;
