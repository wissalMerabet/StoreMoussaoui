"use server";

import api from "@/api";
import { ReservationPayload } from "@/types";


export const createOrder = async (data: ReservationPayload) => {
  try {
    

    const response = await api.post("/orders", data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error("Error adding order:", error)
    throw error
  }
}