'use client';

import { useEffect, useState } from 'react';
import wilayasData from '@/constants/wilayas.json';

const Step2UserInfo = ({ register, errors, setValue, watch }: any) => {
  const [selectedWilaya, setSelectedWilaya] = useState<string>('');
  const [communes, setCommunes] = useState<string[]>([]);

  const wilayaValue = watch('wilaya');
  const baladiaValue = watch('baladia');

  // Sync selectedWilaya when wilayaValue changes
  useEffect(() => {
    if (wilayaValue) {
      setSelectedWilaya(wilayaValue);
    }
  }, [wilayaValue]);

  // Update communes when selectedWilaya changes
  useEffect(() => {
    const wilaya = wilayasData.find(
      (w) => w.n.trim().toLowerCase() === selectedWilaya.trim().toLowerCase()
    );
    if (wilaya) {
      const communesList = wilaya.c.map((commune) => commune.n);
      setCommunes(communesList);
    } else {
      setCommunes([]);
    }
  }, [selectedWilaya]);

  const handleWilayaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedWilaya(selected);
    setValue('wilaya', selected);
    setValue('baladia', ''); // reset baladia when wilaya changes
  };

  const handleBaladiaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setValue('baladia', selected);
  };

  return (
    <div className="md:max-w-6xl p-6 shadow-sm bg-white">
      <h2 className="font-semibold text-xl sm:text-3xl text-primary border-b-2 border-primary mb-4 pb-1">
        Informations personnelles
      </h2>

      <form className="space-y-3">
        {/* Nom */}
        <div className="flex flex-col">
          <label className="text-sm">Nom et Prénom</label>
          <input type="text" className="input-style" {...register('Nom')} />
          {errors.Nom && <span className="text-primary text-xs">{errors.Nom.message}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm">E-mail</label>
          <input type="email" className="input-style" {...register('email')} />
          {errors.email && <span className="text-primary text-xs">{errors.email.message}</span>}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm">Numéro de téléphone</label>
          <input type="text" className="input-style" {...register('phone')} />
          {errors.phone && <span className="text-primary text-xs">{errors.phone.message}</span>}
        </div>

        {/* Wilaya */}
        <div className="flex flex-col">
          <label className="text-sm">Wilaya</label>
          <select
            className="input-style"
            onChange={handleWilayaChange}
            value={wilayaValue || ''}
          >
            <option value="">-- Sélectionner une wilaya --</option>
            {wilayasData.map((w) => (
              <option key={w.i} value={w.n}>
                {w.n}
              </option>
            ))}
          </select>
          {errors.wilaya && <span className="text-primary text-xs">{errors.wilaya.message}</span>}
        </div>

        {/* Baladia */}
        <div className="flex flex-col">
          <label className="text-sm">Commune / Baladia</label>
          <select
            className="input-style"
            {...register('baladia')}
            onChange={handleBaladiaChange}
            value={baladiaValue || ''}
            disabled={!communes.length}
          >
            <option value="">-- Sélectionner une baladia --</option>
            {communes.map((commune, index) => (
              <option key={index} value={commune}>
                {commune}
              </option>
            ))}
          </select>
          {errors.baladia && (
            <span className="text-primary text-xs">{errors.baladia.message}</span>
          )}
        </div>

        {/* Commentaire */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm">Commentaires (facultatif)</label>
          <textarea
            rows={4}
            placeholder="Ajoutez vos commentaires ici..."
            className="w-full max-h-[200px] border px-4 py-2 rounded-lg text-sm"
            {...register('comment')}
          />
        </div>
      </form>
    </div>
  );
};

export default Step2UserInfo;
