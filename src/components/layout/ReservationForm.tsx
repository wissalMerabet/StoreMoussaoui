"use client";

import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Step1ConfirmProduct from "./steps/Step1ConfirmProduct";
import Step2UserInfo from "./steps/Step2UserInfo";
import Step3Confirmation from "./steps/Step3Confirmation";
import FinalStepConfirmation from "./steps/FinalStepConfirmation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ReservationPayload, UserFormData } from "@/types";
import { steps } from "@/constants/data";
import { userFormSchema } from "@/validation/userFormSchema";
import { useCart } from "@/context/CartContext";
import clsx from "clsx";
import { Button } from "../ui/button";
import { createOrder } from "@/app/(home)/order/actions";

const getStepFields = (step: number): (keyof UserFormData)[] => {
  switch (step) {
    case 2:
      return ["Nom", "email", "phone", "wilaya"];
    default:
      return [];
  }
};

const ReservationForm = () => {
  const { items, hasHydrated, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const totalSteps = steps.length + 1;
  const isPanierEmpty = hasHydrated && items.length === 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues: {
      Nom: "",
      email: "",
      phone: "",
      wilaya: "",
      baladiya: "",
      comment: "",
    },
  });

  const handleSubmitForm = async () => {
    const formData = getValues();
    const payload: ReservationPayload = {
      client_name: formData.Nom,
      client_email: formData.email,
      client_phone: formData.phone,
      client_wilaya: formData.wilaya,
      client_baladia: formData.baladiya,
      comment: formData.comment || null,
      items: items.map((item) => ({
        product: {
          id: item.id,
          total_price: item.fixed_price * item.quantity,
          fixed_price: item.fixed_price,
        },
        quantity: item.quantity,
      })),
    };

    console.log(payload);
    

    try {
      const response = await createOrder(payload);
      console.log("Order created:", response);
      clearCart();
      setStep(4);
    } catch (error) {
      console.error("Error creating order:", error);
    }
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
                  <div className="flex items-center space-x-0 md:space-x-3 ">
                    <div
                      className={`flex items-center justify-center w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full border-2 transition-all ${
                        isCompleted
                          ? " text-green-500 border-black"
                          : isActive
                          ? "border-black text-primary "
                          : "border-black text-black"
                      }`}
                    >
                      <Icon className="text-sm md:text-xl" />
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
                    <div className=" w-15 md:w-30 lg:w-48 h-0.5 bg-black mx-1 md:mx-2 relative mt-2 ">
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
          {step === 2 && (
            <Step2UserInfo
              setValue={setValue}
              register={register}
              errors={errors}
            />
          )}
          {step === 3 && <Step3Confirmation formData={getValues()} />}
          {step === 4 && <FinalStepConfirmation />}
        </div>

        {/* Buttons */}
        {step <= 3 && (
          <div className="flex justify-between px-4 md:px-0">
            {/* Retour Button */}
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={step === 1}
              className={clsx(
                "px-4 md:px-8 py-2 mb-20 flex items-center gap-1",
                step === 1 &&
                  "cursor-not-allowed opacity-50 pointer-events-none"
              )}
            >
              <MdChevronLeft className="text-xl mt-0.5" />
              Retour
            </Button>

            {/* Suivant or Confirmer Button */}
            {step === 3 ? (
              <Button
                onClick={handleSubmit(handleSubmitForm)}
                className=" px-4 md:px-8 py-2  mb-20 flex items-center gap-1  "
              >
                Confirmer
                <MdChevronRight className="text-xl mt-0.5" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={isPanierEmpty}
                variant="default"
                className={clsx(
                  " px-4 md:px-8 py-2 mb-20 flex items-center gap-1 ",
                  isPanierEmpty
                    ? "bg-muted text-foreground cursor-not-allowed"
                    : "bg-[#9C1137] hover:bg-[#7e0d2d]"
                )}
              >
                Suivant
                <MdChevronRight className="text-xl mt-0.5" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationForm;
