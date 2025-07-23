"use client";

import { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import wilayasData from "@/constants/wilayas.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserFormData } from "@/types";



const Step2UserInfo = ({
  register,
  errors,
  setValue,
}: {
  register: UseFormRegister<UserFormData>;
  errors: FieldErrors<UserFormData>;
  setValue: UseFormSetValue<UserFormData>;
}) => {
  const [selectedWilaya, setSelectedWilaya] = useState<string>("");

  const selectedBaladiya =
    wilayasData.find((w) => w.n === selectedWilaya)?.c || [];

  return (
    <div className="md:max-w-6xl p-6 shadow-sm bg-white">
      <h2 className="font-semibold text-xl md:text-3xl text-primary inline-block border-b-2 border-primary mb-4 pb-1">
        Informations personnelles
      </h2>

      <form className="space-y-5 tracking-wide text-xs md:text-sm">
        {/* Nom */}
        <div className="flex flex-col">
          <label htmlFor="Nom">Nom et Prénom</label>
          <input
            id="Nom"
            type="text"
            className="mt-1 px-2 py-1.5 border border-foreground/50 rounded-lg"
            {...register("Nom")}
          />
          {errors.Nom && (
            <span className="text-sm text-red-600 mt-1">{errors.Nom.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            className="mt-1 px-2 py-1.5 border border-foreground/50 rounded-lg"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-sm text-red-600 mt-1">{errors.email.message}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone">Numéro De Téléphone</label>
          <input
            id="phone"
            type="text"
            className="mt-1 px-2 py-1.5 border border-foreground/50 rounded-lg"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-sm text-red-600 mt-1">{errors.phone.message}</span>
          )}
        </div>

        {/* Wilaya (ShadCN Select) */}
        <div className="flex flex-col gap-1">
          <label htmlFor="wilaya">Wilaya</label>
          <Select
            onValueChange={(value) => {
              setSelectedWilaya(value);
              setValue("wilaya", value);
              setValue("baladiya", ""); // reset baladiya
            }}
          >
            <SelectTrigger className="w-full border-foreground/50 rounded-lg">
              <SelectValue placeholder="Sélectionner une wilaya" />
            </SelectTrigger>
            <SelectContent>
              {wilayasData.map((wilaya) => (
                <SelectItem key={wilaya.i} value={wilaya.n}>
                  {wilaya.n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.wilaya && (
            <span className="text-sm text-red-600 mt-1">{errors.wilaya.message}</span>
          )}
        </div>

        {/* Baladiya (ShadCN Select) */}
        <div className="flex flex-col gap-1">
          <label htmlFor="baladiya">Baladiya</label>
          <Select
            onValueChange={(value) => setValue("baladiya", value)}
            disabled={!selectedWilaya}
          >
            <SelectTrigger className="w-full border-foreground/50 rounded-lg">
              <SelectValue placeholder="Sélectionner une baladiya" />
            </SelectTrigger>
            <SelectContent>
              {selectedBaladiya.map((baladiya, index) => (
                <SelectItem key={index} value={baladiya.n}>
                  {baladiya.n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.baladiya && (
            <span className="text-sm text-red-600 mt-1">{errors.baladiya.message}</span>
          )}
        </div>

        {/* Comment */}
        <div className="flex flex-col">
          <label htmlFor="comment">
            Si Vous Avez Des Exigences Ou Des Questions Particulières,
             Veuillez les Ajouter Ici (facultatif):
          </label>
          <textarea
            id="comment"
            rows={4}
            placeholder="Ajoutez vos commentaires ici..."
            className="mt-1 px-2 py-1.5 border border-foreground/50 rounded-lg"
            {...register("comment")}
          />
        </div>
      </form>
    </div>
  );
};

export default Step2UserInfo;
