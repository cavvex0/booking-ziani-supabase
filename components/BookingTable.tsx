"use client";
import AddSection from "@/sections/AddSection";
import TableDiv from "./TableDiv";
import { useState } from "react";
import { BookingSchemaTableType } from "@/schema/bookings";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Check, Edit, Pen, Trash } from "lucide-react";
import { markAsVenu } from "@/actions/markAsVenu";
import { deleteBooking } from "@/actions/deleteBooking";
import EditBooking from "./EditBooking";
import toast from "react-hot-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import TableMobile from "./TableMobile";
import ConfirmVenu from "./confirmAction/ConfirmVenu";
import ConfirmDelete from "./confirmAction/ConfirmDelete";
import { markAsDelete } from "@/actions/markAsDelete";

const BookingTable = ({ bookings }: { bookings: BookingSchemaTableType[] }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [tapped, setTapped] = useState(false);
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
  const handleVenu = async (id: number, status: boolean) => {
    await markAsVenu(id, status);
    if (status) {
      toast.error("La réservation a été marquée comme pas encore venue.");
    } else {
      toast.success("La réservation a été marquée comme venue. 🎉");
    }
  };
  const handleDelete = (id: number) => {
    markAsDelete(id);
    toast.success("Réservation supprimée avec succès 🎉");
  };

  return (
    <div className=" pb-[90px]">
      <div className="max-w-[90rem] mx-auto ">
        {isDesktop ? (
          <div className="border min-h-[600px] hidden lg:block">
            <div className="border-b py-4 px-12">
              <AddSection
                date={date}
                setDate={setDate}
                handleShowAll={handleShowAll}
              />
            </div>
            <div className="grid grid-cols-10 border-b font-semibold text-[15px]">
              <TableDiv>@</TableDiv>
              <TableDiv>Hotels/Clients</TableDiv>
              <TableDiv>Réception</TableDiv>
              <TableDiv>Soin</TableDiv>
              <TableDiv>Personnes</TableDiv>
              <TableDiv>Détails</TableDiv>
              <TableDiv>La date</TableDiv>
              <TableDiv>Heure</TableDiv>
              <TableDiv>Statut</TableDiv>
              <TableDiv>Actions</TableDiv>
            </div>
            {filteredBookings.map((item) => (
              <div
                className="grid grid-cols-10 border-b py-2 font-jockey text-[17px]"
                key={item.id}
              >
                <TableDiv>
                  <span className="font-bold text-sm bg-red-500 text-white px-2 py-0.5 capitalize">
                    {item.createdBy}
                  </span>
                </TableDiv>
                <TableDiv>{item.hotel}</TableDiv>
                <TableDiv>{item.reception}</TableDiv>
                <TableDiv>{item.soin}</TableDiv>
                <TableDiv>{item.people}</TableDiv>
                <TableDiv>{item.details}</TableDiv>
                <TableDiv>
                  {tapped ? (
                    <div>{format(new Date(item.created_at), "dd/MM/yyyy")}</div>
                  ) : (
                    <div>{format(new Date(item.date), "dd/MM/yyyy")}</div>
                  )}
                </TableDiv>
                <TableDiv>{format(new Date(item.date), "HH:mm")}</TableDiv>
                <TableDiv>
                  {item.status ? (
                    <span className="bg-green-300 text-green-800 text-[15px] leading-[20px] px-4 py-1 rounded">
                      Venue
                    </span>
                  ) : (
                    <span className="bg-red-300 text-red-800 text-[15px] leading-[20px] px-4 py-1 rounded">
                      Pas Encore
                    </span>
                  )}
                </TableDiv>
                <TableDiv>
                  <div className="flex items-center gap-x-3">
                    <ConfirmVenu item={item} handleVenu={handleVenu} />
                    <EditBooking item={item} />
                    <ConfirmDelete item={item} handleDelete={handleDelete} />
                  </div>
                </TableDiv>
              </div>
            ))}
          </div>
        ) : (
          <TableMobile
            date={date}
            setDate={setDate}
            handleShowAll={handleShowAll}
            filteredBookings={filteredBookings}
            handleVenu={handleVenu}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default BookingTable;
