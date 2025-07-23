import { useCart } from "@/context/CartContext";
import { UserFormData } from "@/types";
import { MdCheck } from "react-icons/md";

const Step3Confirmation = ({ formData }: { formData: UserFormData }) => {
  const { totalPrice } = useCart();
  return (
    <div className="md:max-w-6xl md:h-[480px] p-6  shadow-sm bg-white ">
      <h2 className="font-semibold text-xl md:text-3xl text-primary inline-block border-b-2 border-primary mb-4 pb-1">
        Confirmation Finale
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6 text-sm">
        <div className="mt-7">
          <h3 className="font-bold mb-4 px-2 text-sm md:text-lg">
            D&eacute;tails du produit
          </h3>
          <div className=" px-2 ">
            <p className="text-xs md:text-sm font-medium ">
              Prix Total{" "}
              <span className="text-primary font-bold text-xl md:text-2xl ml-5">
                {totalPrice.toLocaleString()} DA
              </span>
            </p>
          </div>
        </div>

        <div className="mt-7">
          <h3 className="font-bold px-2 mb-4 text-sm md:text-lg">
            Informations de r&eacute;servation
          </h3>
          <p className="font-medium text-xs md:text-sm px-2 py-1.5">
            Nom: <span className="px-2"></span> {formData.Nom}
          </p>
          <p className="font-medium text-xs md:text-sm px-2 py-1.5">
            E-Mail: <span className="px-2"></span> {formData.email}
          </p>
          <p className="font-medium text-xs md:text-sm px-2 py-1.5">
            Num&eacute;ro De T&eacute;l&eacute;phone:{" "}
            <span className="px-2"></span> {formData.phone}
          </p>
          <p className="font-medium text-xs md:text-sm px-2 py-1.5">
            Wilaya: <span className="px-2"></span> {formData.wilaya}
          </p>
        </div>

        <div className="mt-7">
          <h3 className="font-bold px-2 mb-4 text-sm md:text-lg">
            Conditions de r&eacute;servation
          </h3>

          <div className="flex flex-col gap-2">
            {[
              "La Réservation est valable 48 heures à compter de la confirmation.",
              "Vous serez contacté pour confirmer votre réservation et discuter des détails du ramassage.",
            ].map((text, i) => (
              <div key={i} className="flex gap-2 items-start">
                <MdCheck className="text-primary min-w-4 min-h-4 w-4 h-4 mt-[2px]" />
                <p className="font-medium text-xs md:text-sm leading-snug">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Confirmation;
