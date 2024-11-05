"use client";
import { deleteBooking } from "@/actions/deleteBooking";
import ConfirmDelete from "@/components/confirmAction/ConfirmDelete";
import ConfirmDeleteAll from "@/components/confirmAction/ConfirmDeleteAll";
import { BookingSchemaTableType } from "@/schema/bookings";
import { format } from "date-fns";
import Image from "next/image";
import toast from "react-hot-toast";
import PathIcon from "@/assets/path.webp";
import { useMediaQuery } from "@/hooks/use-media-query";
import TableDiv from "@/components/TableDiv";

const DeletedPage = ({ bookings }: { bookings: BookingSchemaTableType[] }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const handleDelete = (id: number) => {
    deleteBooking(id);
    toast.success("Réservation supprimée avec succès 🎉");
  };

  return (
    <div className="">
      <div>
        <ConfirmDeleteAll />
      </div>
      {isDesktop ? (
        <div className="mt-4">
          <div className="bg-white w-full  min-h-[500px] mb-9 rounded-[35px] border-[1.5px] border-black hidden lg:inline-block">
            <div className="grid grid-cols-10 py-4 text-sm font-semibold bg-gray-200 rounded-t-[35px] ">
              <div className="flex items-center justify-center ">@</div>
              <div className="flex items-center justify-center border-l border-black ">
                Hotels/Clients
              </div>
              <div className="flex items-center justify-center border-l border-black ">
                Réception
              </div>
              <div className="flex items-center justify-center border-l border-black ">
                Soin
              </div>
              <div className="flex items-center justify-center border-l border-black ">
                Personnes
              </div>
              <div className="flex items-center justify-center border-l border-black ">
                Détails
              </div>
              <div className="flex items-center justify-center border-l border-black ">
                La date
              </div>
              <div className="flex items-center justify-center border-l border-black ">
                Heure
              </div>
              <div className="flex items-center justify-center border-l border-black ">
                Statut
              </div>
              <div className="flex items-center justify-center border-l border-black ">
                Actions
              </div>
            </div>
            {bookings.map((item) => (
              <div
                className="grid grid-cols-10 border-b py-2 text-[13px] font-semibold"
                key={item.id}
              >
                <TableDiv>
                  <span className="font-semibold text-[13px] bg-red-500 text-white px-2 py-0.5 capitalize">
                    {item.createdBy}
                  </span>
                </TableDiv>
                <TableDiv>{item.hotel}</TableDiv>
                <TableDiv>{item.reception}</TableDiv>
                <TableDiv>{item.soin}</TableDiv>
                <TableDiv>{item.people}</TableDiv>
                <TableDiv>{item.details}</TableDiv>
                <TableDiv>
                  <div>{format(new Date(item.date), "dd/MM/yyyy")}</div>
                </TableDiv>
                <TableDiv>{format(new Date(item.date), "HH:mm")}</TableDiv>
                <TableDiv>
                  {item.status ? (
                    <span className="bg-green-300 text-green-800 text-[15px] leading-[20px] px-4 py-1 rounded font-jockey">
                      Venue
                    </span>
                  ) : (
                    <span className="bg-red-300 text-red-800 text-[15px] leading-[20px] px-4 py-1 rounded font-jockey">
                      Pas Encore
                    </span>
                  )}
                </TableDiv>
                <TableDiv>
                  <div className="flex items-center gap-x-3">
                    <ConfirmDelete item={item} handleDelete={handleDelete} />
                  </div>
                </TableDiv>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {bookings.map((item) => (
            <div className="relative mt-4 font-jockey" key={item.id}>
              {/* Shadow behind the card */}
              <div className="absolute -bottom-2 left-2 -right-2 top-2 bg-black rounded-lg opacity-70 z-[-1]"></div>

              {/* Card content */}
              <div className="border border-gray-400 rounded-lg bg-white z-10">
                <div className="p-2.5 border-b border-gray-400 flex flex-row items-center justify-between">
                  <div className="relative">
                    <h1 className="capitalize text-[15px]">
                      ajouter par <span className="ml-1">{item.createdBy}</span>
                    </h1>
                    <Image
                      className="absolute -bottom-1.5 -right-1.5"
                      src={PathIcon}
                      alt="path"
                      width={50}
                      height={50}
                    />
                  </div>
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
                          Venue
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
      )}
    </div>
  );
};

export default DeletedPage;
