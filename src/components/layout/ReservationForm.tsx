"use client";

import { useState } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Step1ConfirmProduct from "./steps/Step1ConfirmProduct";
import Step2UserInfo from "./steps/Step2UserInfo";
import Step3Confirmation from "./steps/Step3Confirmation";
import FinalStepConfirmation from "./steps/FinalStepConfirmation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserFormData } from "@/types";
import { steps } from "@/constants/data";
import { userFormSchema } from "@/validation/userFormSchema";

const getStepFields = (step: number): (keyof UserFormData)[] => {
  switch (step) {
    case 2:
      return ["Nom", "email", "phone", "wilaya"];
    default:
      return [];
  }
};

const ReservationForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = steps.length + 1;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues: {
      Nom: "",
      email: "",
      phone: "",
      wilaya: "",
      comment: "",
    },
  });

  const handleSubmitForm = () => {
    const formData = getValues();
    console.log("Form submitted:", formData);

    setStep(4);
  };

  const validateCurrentStep = async (currentStep: number) => {
    const fields = getStepFields(currentStep);
    if (fields.length > 0) {
      return await trigger(fields);
    }
    return true;
  };

  const handleNext = async () => {
    const isStepValid = await validateCurrentStep(step);
    if (isStepValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-white">
      <div className="max-w-5xl mx-auto px-0 md:px-2 pt-28 md:pt-48 lg:pt-45 ">
        {/* Stepper Header */}
        {step <= 3 && (
          <div className="flex items-center justify-center space-x-2 md:space-x-1 mb-10">
            {steps.map((stepData, idx) => {
              const isActive = step === idx + 1;
              const isCompleted = step > idx + 1;
              const Icon = stepData.icon;

              return (
                <div key={idx} className="flex flex-row items-center space-x-1">
                  {/* Icon + Label */}
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div
                      className={`flex items-center justify-center  w-[40px] h-[40px] rounded-full border-2 transition-all ${
                        isCompleted
                          ? " text-green-500 border-black"
                          : isActive
                          ? "border-black text-primary "
                          : "border-black text-black"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className={` hidden md:block md:text-xs lg:text-sm font-semibold ${
                        isActive
                          ? "text-primary font-semibold"
                          : isCompleted
                          ? "text-green-500"
                          : "text-black"
                      }`}
                    >
                      {stepData.label}
                    </span>
                  </div>

                  {/* Line */}
                  {idx < steps.length - 1 && (
                    <div className=" w-20 md:30 lg:w-48 h-0.5 bg-black mx-2 relative mt-2">
                      <div
                        className={`absolute top-0 left-0 h-full transition-all duration-300 ${
                          isCompleted ? "w-full bg-black" : "w-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Step Content */}
        <div className="mb-6">
          {step === 1 && <Step1ConfirmProduct />}
          {step === 2 && <Step2UserInfo register={register} errors={errors} />}
          {step === 3 && <Step3Confirmation formData={getValues()} />}
          {step === 4 && <FinalStepConfirmation />}
        </div>

        {/* Buttons */}
        {step <= 3 && (
          <div className="flex justify-between px-4">
            <button
              onClick={handlePrev}
              className="text-sm md:text-xl text-primary font-medium px-5 md:px-10 py-2 border border-[#9C1137] rounded-lg mb-20 flex gap-2 items-center"
            >
              <BsChevronLeft className="text-sm mt-1" />
              Retour
            </button>

            {step === 3 ? (
              <button
                onClick={handleSubmit(handleSubmitForm)}
                className="bg-primary text-white text-sm md:text-xl px-5 md:px-10 py-2 rounded-lg font-medium mb-20 flex gap-2 items-center"
              >
                Confirmer
                <BsChevronRight className="text-sm mt-1" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-primary text-white text-sm md:text-xl px-5 md:px-10 py-2 rounded-lg font-medium mb-20 flex gap-2 items-center"
              >
                Suivant
                <BsChevronRight className="text-sm mt-1" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationForm;