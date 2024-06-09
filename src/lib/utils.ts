// ** Third Party Imports
import { ChangeEvent } from "react";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimestamp = (
  timestamp: number | string,
  hasHourAndMin?: boolean
): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  if (hasHourAndMin) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.hour12 = true;
  }

  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
};

export const onInputUserName = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value
    // remove white space
    .replace(/\s+/g, "")
    // remove special characters
    .replace(/[&='_+\-<>[\]{}|;^%*!]/g, "")
    // remove multiple dots
    .replace(/\.{2,}/g, "")
    // remove multiple hyphens
    .replace(/[^a-zA-Z0-9!@#%^()=+`~\\]/g, "");
};

export const onInputRemoveSpace = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/\s+/g, "");
};

export const onInputRemoveSpecialChars = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/[&='_+\-<>[\]{}|;^%*!]/g, "");
};

export const onInputRemoveSpaceAndSpecialChars = (
  e: ChangeEvent<HTMLInputElement>
) => {
  e.target.value = e.target.value
    .replace(/\s+/g, "")
    .replace(/[&='_+\-<>[\]{}|;^%*!]/g, "");
};

export const onInputFormatPhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
  let inputNumbersValue = e.target.value.replace(/\D+/g, ""); // Step 1: Keep only digits

  // Step 2: Apply formatting based on the length of inputNumbersValue
  let formattedInputValue = "";
  if (inputNumbersValue.length <= 3) {
    // If input is 3 or fewer characters, just return those characters
    formattedInputValue = inputNumbersValue;
  } else if (inputNumbersValue.length <= 6) {
    // If input is between 4 and 6 characters, format as "555 444"
    formattedInputValue =
      inputNumbersValue.substring(0, 3) + " " + inputNumbersValue.substring(3);
  } else if (inputNumbersValue.length <= 10) {
    // If input is between 7 and 10 characters, format as "555 444 3322"
    formattedInputValue =
      inputNumbersValue.substring(0, 3) +
      " " +
      inputNumbersValue.substring(3, 6) +
      " " +
      inputNumbersValue.substring(6);
  }

  e.target.value = formattedInputValue; // Step 3: Set the formatted value
};

export const onInputLatAndLng = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value
    // Sadece sayı, nokta ve eksi işareti kabul et
    .replace(/[^0-9.-]+/g, "")
    // Birden fazla noktayı engelle
    .replace(/\.{2,}/g, ".")
    // Noktadan sonra sadece bir nokta kabul et
    .replace(/(\.\d*)\./g, "$1")
    // Birden fazla eksi işaretini engelle
    .replace(/\-{2,}/g, "-")
    // Eksi işareti sadece başta olabilir
    .replace(/(.)-/g, "$1");
};

export const onInputRefund = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value
    // Sadece sayı ve nokta kabul et, eksi işareti hariç
    .replace(/[^0-9.]+/g, "")
    // Birden fazla noktayı engelle
    .replace(/\.{2,}/g, ".")
    // Noktadan sonra sadece 3 basamak kabul et
    .replace(/(\.\d{3})\./g, "$1")
    // Başta sıfır olup olmadığını kontrol et, varsa ve arkasında nokta yoksa kaldır
    .replace(/^0([^.])/g, "$1");
};
