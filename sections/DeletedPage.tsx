"use client";
import { deleteBooking } from "@/actions/deleteBooking";
import ConfirmDelete from "@/components/confirmAction/ConfirmDelete";
import ConfirmDeleteAll from "@/components/confirmAction/ConfirmDeleteAll";
import { Button } from "@/components/ui/button";
import { BookingSchemaTableType } from "@/schema/bookings";
import { format } from "date-fns";
import toast from "react-hot-toast";

const DeletedPage = ({ bookings }: { bookings: BookingSchemaTableType[] }) => {
  const handleDelete = (id: number) => {
    deleteBooking(id);
    toast.success("Réservation supprimée avec succès 🎉");
  };

  return (
    <div className="">
      <div>
        <ConfirmDeleteAll />
      </div>
      <div>
        {bookings.map((item) => (
          <div className="relative mt-4 font-jockey" key={item.id}>
            {/* Shadow behind the card */}
            <div className="absolute -bottom-2 left-2 -right-2 top-2 bg-black rounded-lg opacity-70 z-[-1]"></div>

            {/* Card content */}
            <div className="border border-gray-400 rounded-lg bg-white z-10">
              <div className="p-2.5 border-b border-gray-400 flex flex-row items-center justify-between">
                <h1 className="capitalize text-[15px]">
                  ajouter par <span className="ml-1">{item.createdBy}</span>
                </h1>
                <h1 className="capitalize  text-[15px]">de {item.person}</h1>
                <div className="flex flex-row items-center gap-x-4">
                  <ConfirmDelete item={item} handleDelete={handleDelete} />
                </div>
              </div>

              <div className="p-3 flex flex-row items-center justify-between">
                <h1 className="capitalize  text-[15px]">{item.hotel}</h1>
                <h1 className="capitalize  text-[15px]">{item.reception}</h1>
                <h1 className="capitalize  text-[15px]">{item.soin}</h1>
              </div>
              <div className="px-3 flex flex-row items-center justify-between">
                <div className="flex-1">
                  <h1 className="capitalize  text-[15px]">{item.people}</h1>
                </div>
                <div className="flex-1 justify-end w-full items-end">
                  <h1 className="capitalize  text-[15px]">{item.details}</h1>
                </div>
              </div>
              <div className="p-3 flex flex-row items-center justify-between">
                <h1 className="capitalize  text-[15px]">
                  {format(new Date(item.date), "yyyy-MM-dd")}
                </h1>
                <h1 className="capitalize  text-[15px]">
                  {format(new Date(item.date), "HH:mm")}
                </h1>
                <div>
                  {item.status ? (
                    <div className="bg-green-500 px-2 py-1 rounded">
                      <h1 className="capitalize  text-[12px] text-white">
                        Venu
                      </h1>
                    </div>
                  ) : (
                    <div className="bg-red-500 px-2 py-1 rounded">
                      <h1 className="capitalize  text-[12px] text-white">
                        Pas Encore
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeletedPage;
