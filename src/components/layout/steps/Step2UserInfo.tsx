'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

type FormData = {
  Nom: string;
  email: string;
  phone: string;
  wilaya: string;
  comment?: string;
};

const Step2UserInfo = ({
  register,
  errors,
}: {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}) => {
  return (
    <div className="md:max-w-6xl md:h-[520px] p-6 shadow-sm bg-white">
      <h2 className="font-semibold text-xl sm:text-3xl text-primary inline-block border-b-2 border-primary mb-4 pb-1">
        Informations personnelles
      </h2>

      <form className="space-y-3">

        {/* Nom */}
        <div className="flex flex-col">
          <label htmlFor="Nom" className="text-sm">Nom et Prénom</label>
          <input
            id="Nom"
            type="text"
            className="w-full h-[40px] md:h-[30px] border border-foreground px-4 py-2 rounded-lg text-sm border-opacity-50"
            {...register("Nom")}
          />
          {errors.Nom && (
            <span className="text-primary text-xs mt-0.5">
              {errors.Nom.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm">E-mail</label>
          <input
            id="email"
            type="email"
            className="w-full h-[40px] md:h-[30px] border border-foreground px-4 py-2 rounded-lg text-sm border-opacity-50"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-primary text-xs mt-0.5">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm">Numéro de téléphone</label>
          <input
            id="phone"
            type="text"
            className="w-full h-[40px] md:h-[30px] border border-foreground px-4 py-2 rounded-lg text-sm border-opacity-50"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-primary text-xs mt-0.5">
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* Wilaya */}
        <div className="flex flex-col">
          <label htmlFor="wilaya" className="text-sm">Wilaya</label>
          <input
            id="wilaya"
            type="text"
            className="w-full h-[40px] md:h-[30px] border border-foreground px-4 py-2 rounded-lg text-sm border-opacity-50"
            {...register("wilaya")}
          />
          {errors.wilaya && (
            <span className="text-primary text-xs mt-0.5">
              {errors.wilaya.message}
            </span>
          )}
        </div>

        {/* Comment */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="comment" className="text-sm">
            Si vous avez des exigences ou des questions particulières, veuillez les ajouter ici (facultatif):
          </label>
          <textarea
            id="comment"
            rows={4}
            placeholder="Ajoutez vos commentaires ici..."
            className="w-full max-h-[200px] md:h-[85px] border border-foreground px-4 py-2 rounded-lg text-sm"
            {...register("comment")}
          />
        </div>

      </form>
    </div>
  );
};

export default Step2UserInfo;
