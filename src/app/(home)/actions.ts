"use server";

import api from "@/api";
import { NewsLetterValues, QuestionsValues } from "@/types";



export const newsLetterAction = async (data:NewsLetterValues) => {
  try {
    

    const response = await api.post("/newletteremaill", data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
   console.error("Error submitting newsletter form:", error);
    throw error
  }
}

export const postQuestion = async (data:QuestionsValues ) => {
  try {
    const response = await api.post("/questionsss", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l’envoi de la question :", error);
    throw error;
  }
};