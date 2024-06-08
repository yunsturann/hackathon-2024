import { PRODUCT_CATEGORY, USER_TYPE } from "./enums";

export interface IProduct {
  id: string;
  company_id: string;
  name: string;
  desc: string;
  refund: number;
  nature_point: number;
  category: string;
  image: string;
  decomposition_year: number;
  recycling_rate: number;
}

export interface IRecyclingPoint {
  id: string;
  title: string;
  lat: number;
  lng: number;
  address: string;
  capacity: number;
  phone: string;
  categories: string[];
  type: boolean;
  fullness: number;
}
