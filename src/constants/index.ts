import { FaHome, FaUserAlt } from "react-icons/fa";
import { VscOrganization } from "react-icons/vsc";
import { RiProductHuntLine } from "react-icons/ri";
import { PRODUCT_CATEGORY } from "@/types/enums";

export const navLinks = [
  {
    title: "Home",
    href: "/",
    icon: FaHome,
  },
  {
    title: "Products",
    href: "/products",
    icon: RiProductHuntLine,
  },
  {
    title: "Organizations",
    href: "/organizations",
    icon: VscOrganization,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: FaUserAlt,
  },
];

export const publicPages = ["/auth/login", "/auth/register"];

export const productCategoryItems = [
  {
    label: "Plastic",
    value: PRODUCT_CATEGORY.PLASTIC,
  },
  {
    label: "Glass",
    value: PRODUCT_CATEGORY.GLASS,
  },
  {
    label: "Paper",
    value: PRODUCT_CATEGORY.PAPER,
  },
  {
    label: "Clothing",
    value: PRODUCT_CATEGORY.CLOTHING,
  },
  {
    label: "Metal",
    value: PRODUCT_CATEGORY.METAL,
  },

  {
    label: "Electronics",
    value: PRODUCT_CATEGORY.ELECTRONICS,
  },
  {
    label: "Other",
    value: PRODUCT_CATEGORY.OTHER,
  },
];

export const multipleCategoryItems = [
  {
    label: "Plastic",
    value: PRODUCT_CATEGORY.PLASTIC,
    isActive: false,
    color: "rgba(59, 130, 246, 0.4)",
  },
  {
    label: "Glass",
    value: PRODUCT_CATEGORY.GLASS,
    isActive: false,
    color: "rgba(41, 171, 135, 0.4)",
  },
  {
    label: "Paper",
    value: PRODUCT_CATEGORY.PAPER,
    isActive: false,
    color: "rgba(251, 191, 36, 0.4)",
  },
  {
    label: "Clothing",
    value: PRODUCT_CATEGORY.CLOTHING,
    isActive: false,
    color: "rgba(253, 126, 20, 0.4)",
  },
  {
    label: "Metal",
    value: PRODUCT_CATEGORY.METAL,
    isActive: false,
    color: "rgba(108, 117, 125, 0.4)",
  },
  {
    label: "Electronics",
    value: PRODUCT_CATEGORY.ELECTRONICS,
    isActive: false,
    color: "rgba(59, 130, 246, 0.4)",
  },
  {
    label: "Other",
    value: PRODUCT_CATEGORY.OTHER,
    isActive: false,
    color: "rgba(58, 139, 96, 0.4)",
  },
];
