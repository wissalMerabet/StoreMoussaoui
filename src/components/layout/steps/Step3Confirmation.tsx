import { useCart } from "@/context/CartContext";

import { FaCheck } from "react-icons/fa6";

const Step3Confirmation = ({ formData }: any) => {
  const { totalPrice } = useCart();
  return (
    <div className="md:max-w-6xl md:h-[480px] p-6  shadow-sm bg-white ">
      <h2 className=" font-semibold text-xl sm:text-3xl text-primary inline-block border-b-2 border-primary my:2 md:my-8 pb-1">
        Confirmation finale
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6 text-sm">
        <div className="mt-7">
          <h3 className="font-bold mb-4 px-2 text-xl">Détails du produit</h3>
          <div className=" px-2 ">
            <p className="text-sm font-medium ">
              prix Total{" "}
              <span className="text-primary font-bold text-xl md:text-2xl ml-5">
                {totalPrice.toLocaleString()} DZ
              </span>
            </p>
          </div>
        </div>

        <div className="mt-7">
          <h3 className="font-bold px-2 mb-4 text-xl">
            Informations de réservation
          </h3>
          <p className="font-medium text-sm px-2 py-1.5">
            Nom: <span className="px-2"></span> {formData.Nom}
          </p>
          <p className="font-medium text-sm px-2 py-1.5">
            E-Mail: <span className="px-2"></span> {formData.email}
          </p>
          <p className="font-medium text-sm px-2 py-1.5">
            numéro de téléphone: <span className="px-2"></span> {formData.phone}
          </p>
          <p className="font-medium text-sm px-2 py-1.5">
            Wilaya: <span className="px-2"></span> {formData.wilaya}
          </p>
        </div>

        <div className="mt-7">
          <h3 className="font-bold px-2 mb-4 text-xl">
            Conditions de réservation
          </h3>
          <div className=" flex flex-col gap-2">
            <div className="flex gap-2 mt-1 ">
              <FaCheck size={20} className="text-primary" />
              <p className="font-medium text-sm">
                La réservation est valable 48 heures à compter de la
                confirmation.
              </p>
            </div>
            <div className="flex gap-2 mt-1 ">
              <FaCheck size={26} className="text-primary" />
              <p className="font-medium text-sm">
                Vous serez contacté pour confirmer votre réservation et discuter
                des détails du ramassage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Confirmation;
