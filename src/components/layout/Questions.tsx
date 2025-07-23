'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionsValues } from "@/types";
import { QuestionsSchema } from "@/validation/QuestionsSchema";
import { Button } from "../ui/button";
import { CgSpinner } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";
import { postQuestion } from "@/app/(home)/actions";

const Questions = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successVisible, setSuccessVisible] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuestionsValues>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: { question: "" },
  });

  const onSubmit = async (data: QuestionsValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessVisible(false);

    try {
      const result = await postQuestion(data);
      if (!result) throw new Error("Erreur lors de l’envoi.");
      console.log("Données envoyées :", data);
      setSuccessVisible(true);
      reset();

      setTimeout(() => setSuccessVisible(false), 1500);
    } catch (error) {
      console.error("Erreur lors de l’envoi du formulaire :", error);
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row space-x-2">
      <div className="flex flex-col w-full min-w-[180px] max-w-[330px]">
        <input
          type="text"
          placeholder="Entrez votre question..."
          {...register("question")}
          className="w-full border border-black rounded-lg px-5 py-2 text-sm"
        />
        {errors.question && (
          <p className="text-red-500 mt-1 text-sm">{errors.question.message}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>
        )}
      </div>
      <div>
        <Button
          variant="ghost"
          type="submit"
          disabled={isSubmitting}
          className="px-3 md:px-6 py-4.5"
        >
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

export default Questions;
