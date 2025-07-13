"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsLetterValues } from "@/types";
import { NewsLetterSchema } from "@/validation/NewsLetter";

const NewsLetterForm = () => {
   const [errorMessage] = useState<string | null>(null);
  const {
    register,
    
    formState: { errors },
    
  } = useForm<NewsLetterValues>({
    resolver: zodResolver(NewsLetterSchema),
    defaultValues: { email: "" },
  });



  return (
    <form  className='flex flex-col space-y-2' action="">
      <div className='flex flex-col '>
        <input
          type="email"
        placeholder="Email"
        {...register("email")}
        className="w-full border border-black bg-white rounded-lg p-2 text-sm"
        />  

        {errors.email && (
          <p className="text-primary mb-2 text-sm">{errors.email.message}</p>
        )}
  
        {errorMessage && (
          <p className="text-primary mt-1 mb-2 text-sm">{errorMessage}</p>
        )}
        
      </div>
      <div>
        <button
        type="submit"
        className="rounded-lg px-6 py-2 md:px-4 text-background text-xs md:text-sm font-medium transition-all duration-300 bg-primary  hover:shadow-md"
      >
        Submit
      </button>
      </div>
    </form>
    
  );
};

export default NewsLetterForm;
