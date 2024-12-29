"use client";
import AddSection from "@/sections/AddSection";
import TableDiv from "./TableDiv";
import { useState } from "react";
import { BookingSchemaTableType } from "@/schema/bookings";
import { format } from "date-fns";
import { markAsVenue } from "@/actions/markAsVenue";
import EditBooking from "./EditBooking";
import toast from "react-hot-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import TableMobile from "./TableMobile";
import ConfirmVenue from "./confirmAction/ConfirmVenue";
import ConfirmDelete from "./confirmAction/ConfirmDelete";
import { markAsDelete } from "@/actions/markAsDelete";

const BookingTable = ({ bookings }: { bookings: BookingSchemaTableType[] }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [date, setDate] = useState<Date | null>(new Date());

  const filteredBookings = date
    ? bookings.filter(
        (item) =>
          format(new Date(item.date), "yyyy-MM-dd") ===
          format(new Date(date), "yyyy-MM-dd")
      )
    : bookings;

  const handleShowAll = () => {
    if (date) {
      setDate(null);
    } else {
      setDate(new Date());
    }
  };
  const handleVenue = async (id: number) => {
    await markAsVenue(id);
    toast.success("La réservation a été marquée comme venue. 🎉");
  };
  const handleDelete = async (id: number, createdBy: string) => {
    try {
      const data = await markAsDelete(id, createdBy);
      if (data instanceof Error) {
        toast.error(data.message);
      } else {
        toast.success("Réservation supprimée avec succès 🎉");
      }
    } catch (error) {
      toast.error("Vous n'êtes pas autorisé à supprimer cette réservation");
    }
  };

  if (isDesktop) {
    return (
      <div className="bg-white w-full  min-h-[500px] mb-9 rounded-[35px] border-[1.5px] border-black hidden lg:inline-block">
        <div className="h-[80px] border-b-[1.5px]  border-black flex items-center justify-between px-9">
          <div className="flex-1">
            <AddSection
              date={date}
              setDate={setDate}
              handleShowAll={handleShowAll}
            />
          </div>
        </div>
        <div className="grid grid-cols-10 py-4 text-sm font-semibold bg-gray-200 ">
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
        {filteredBookings.map((item) => (
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
                <ConfirmVenue item={item} handleVenue={handleVenue} />
                <EditBooking item={item} />
                <ConfirmDelete item={item} handleDelete={handleDelete} />
              </div>
            </TableDiv>
          </div>
        ))}
      </div>
    );
  }

  return (
    <TableMobile
      date={date}
      setDate={setDate}
      handleShowAll={handleShowAll}
      filteredBookings={filteredBookings}
      handleVenue={handleVenue}
      handleDelete={handleDelete}
    />
  );
};

export default BookingTable;
