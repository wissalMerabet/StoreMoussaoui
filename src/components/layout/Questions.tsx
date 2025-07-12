"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionsValues } from "@/types";
import { QuestionsSchema } from "@/validation/QuestionsSchema";

const Questions = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuestionsValues>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: { text: "" },
  });
  const onSubmit = async (data: QuestionsValues) => {
  console.log("Submitted data:", data);
  reset();
};


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row space-x-2 "
      action=""
    >
      <div className="flex flex-col w-full min-w-[180px] max-w-[330px]">
        <input
          type="text"
          placeholder="Enter Here..."
          {...register("text")}
          className="w-full border border-black  rounded-lg px-5 py-2 text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className=" text-primary text-sm py-2 px-6 rounded-lg border border-primary transition-all duration-300 hover:bg-primary hover:text-white shadow-sm hover:shadow-md font-medium "
        >
          envoyer
        </button>
      </div>
    </form>
  );
};

export default Questions;
