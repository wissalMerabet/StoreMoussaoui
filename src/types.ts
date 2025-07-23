
import { z } from "zod";
import { QuestionsSchema } from "./validation/QuestionsSchema";
import { userFormSchema } from "./validation/userFormSchema";
import { NewsLetterSchema } from "./validation/NewsLetter";


export interface SearchForm {
  search: string;
}

export interface NewsLetterType {
  email: string
}

export interface QuestionsType {
  question: string
}



export interface ReservationPayload {
  id?: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_wilaya: string;
  client_baladia: string;
  comment: string | null;
  items: {
    product: {
      id: number;
      total_price: number;
      fixed_price: number;
    };
    quantity: number;
  }[];
}

export type NewsLetterValues = z.infer<typeof NewsLetterSchema>;

export type UserFormDataValues = z.infer<typeof userFormSchema>;

export type QuestionsValues = z.infer<typeof QuestionsSchema>;

export type UserFormData = z.infer<typeof userFormSchema>;


export interface RelatedEntity {
  id: number;
  name: string;
  type_name: string;
  updated_at: string | null;
  created_at: string;
  deleted_at: string | null;
}

export interface GoldType {
  id: number;
  name: string;
  gram_price: number;
  updated_at: string | null;
  created_at: string;
  deleted_at: string | null;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  fixed_price: number;
  thumbnail: string;
  category_id: number;
  type_id: number;
  gold_id: number;
  brand_id: number;
  weight: number;
  updated_at: string | null;
  created_at: string;
  deleted_at: string | null;
  brand: RelatedEntity;
  category: RelatedEntity;
  gold_type: GoldType;
  type: RelatedEntity;
  total_price: number;
}