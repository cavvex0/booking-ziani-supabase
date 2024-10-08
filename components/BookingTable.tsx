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

const BookingTable = ({ bookings }: { bookings: BookingSchemaTableType[] }) => {
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
      toast.error("La réservation a été basculé comme pas encore venu ❌");
    } else {
      toast.success("La réservation a été basculé comme venu 🎉");
    }
  };
  const handleDelete = (id: number) => {
    deleteBooking(id);
    toast.success("Réservation supprimée avec succès 🎉");
  };

  return (
    <div className=" pb-[90px]">
      <div className="max-w-[90rem] mx-auto">
        <div className="border min-h-[600px]">
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
              <TableDiv>{format(new Date(item.date), "dd/MM/yyyy")}</TableDiv>
              <TableDiv>{format(new Date(item.date), "HH:mm")}</TableDiv>
              <TableDiv>
                {item.status ? (
                  <span className="bg-green-300 text-green-800 text-[15px] leading-[20px] px-4 py-1 rounded">
                    Venu
                  </span>
                ) : (
                  <span className="bg-red-300 text-red-800 text-[15px] leading-[20px] px-4 py-1 rounded">
                    Pas Encore
                  </span>
                )}
              </TableDiv>
              <TableDiv>
                <div className="flex items-center gap-x-3">
                  <Button
                    onClick={() => handleVenu(item.id, item.status)}
                    className="size-[30px] bg-green-600 hover:bg-green-700"
                    size={"icon"}
                  >
                    <Check size={20} />
                  </Button>
                  <EditBooking item={item} />
                  <Button
                    onClick={() => handleDelete(item.id)}
                    className="size-[30px] bg-red-600 hover:bg-red-700"
                    size={"icon"}
                  >
                    <Trash size={20} />
                  </Button>
                </div>
              </TableDiv>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
