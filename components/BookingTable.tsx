"use client";
import AddSection from "@/sections/AddSection";
import TableDiv from "./TableDiv";
import { useState } from "react";
import { BookingSchemaTableType, BookingSchemaType } from "@/schema/bookings";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Check, Pen, Trash } from "lucide-react";
import { markAsVenu } from "@/actions/markAsVenu";
import { deleteBooking } from "@/actions/deleteBooking";

type Props = {
  bookings: BookingSchemaTableType[];
};
const BookingTable = ({ bookings }: Props) => {
  const [date, setDate] = useState(undefined);
  const [Showall, setShowall] = useState(false);

  const handleVenu = (id: number) => {
    markAsVenu(id);
  };
  const handleDelete = (id: number) => {
    deleteBooking(id);
  };
  return (
    <div className="">
      <div className="max-w-[90rem] mx-auto">
        <div className="border min-h-[600px]">
          <div className="border-b py-4 px-12">
            <AddSection date={date} setDate={setDate} setShowAll={setShowall} />
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
          {bookings.map((item) => (
            <div
              className="grid grid-cols-10 border-b py-2 font-jockey text-[17px]"
              key={item.id}
            >
              <TableDiv>
                <span className="font-bold text-sm bg-red-500 text-white px-2 py-0.5">
                  Yassine
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
                    onClick={() => handleVenu(item.id)}
                    className="size-[30px] bg-green-600 hover:bg-green-700"
                    size={"icon"}
                  >
                    <Check size={20} />
                  </Button>{" "}
                  <Button
                    className="size-[30px] bg-blue-600 hover:bg-blue-700"
                    size={"icon"}
                  >
                    <Pen size={20} />
                  </Button>
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
