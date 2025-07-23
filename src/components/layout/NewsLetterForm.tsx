'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsLetterValues } from "@/types";
import { NewsLetterSchema } from "@/validation/NewsLetter";
import { Button } from "../ui/button";
import { AiOutlineCheck } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { newsLetterAction } from "@/app/(home)/actions";

const NewsLetterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsLetterValues>({
    resolver: zodResolver(NewsLetterSchema),
    defaultValues: { email: "" },
  });


  const onSubmit = async (data: NewsLetterValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessVisible(false);

    try {
      const result = await newsLetterAction(data);
      if (!result) throw new Error('Error subscribing to newsletter');
      console.log(data); 
      setSuccessVisible(true);
      reset();

      setTimeout(() => setSuccessVisible(false), 1500);
    } catch (error) {
      console.error("Échec de l'inscription :", error);
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
      <div className="flex flex-col">
        <input
          type="email"
          placeholder="Adresse email"
          {...register("email")}
          className="w-full border border-black bg-white rounded-lg py-2 px-4 text-sm"
        />

        {errors.email && (
          <p className="text-red-500 mb-2 text-sm">{errors.email.message}</p>
        )}

        {errorMessage && (
          <p className="text-red-500 mt-1 mb-2 text-sm">{errorMessage}</p>
        )}
      </div>
      <div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              Envoi...
              <CgSpinner className="ml-2 animate-spin" />
            </>
          ) : successVisible ? (
            <>
              Envoyé
              <AiOutlineCheck className="ml-2" />
            </>
          ) : (
            "Envoyer"
          )}
        </Button>
      </div>
    </form>
  );
};

export default NewsLetterForm;
