"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { CalendarIcon, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/utils/cn";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { TimePicker } from "./TimePicker/time-picker-demo";
import { BookingSchema, BookingSchemaType } from "@/schema/bookings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/actions/createBooking";
import { getUsername } from "@/lib/getUserClient";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const people = ["adam", "hannan", "soraya", "fija", "yassine", "amine"];

const Add = () => {
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  const fetchUsername = async () => {
    const name = await getUsername();
    setUsername(name);
    form.setValue("createdBy", name);
    form.setValue("person", name);
  };
  fetchUsername();

  const [open, setOpen] = useState(false);
  const form = useForm<BookingSchemaType>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      hotel: "",
      person: username || "",
      reception: "",
      soin: "",
      people: "",
      details: "",
      status: false,
      deleted: false,
      createdBy: username || "",
      datee: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createBooking,
    mutationKey: ["createBooking"],

    onSuccess: () => {
      setOpen(false);
      form.reset();
      toast.success("Réservation créée avec succès 🎉");
    },
  });

  const onSubmit = async (values: any) => {
    try {
      setDisable(true);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return router.push("/login");
      }
      mutate(values);
    } finally {
      setDisable(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue1 hover:bg-blueHover font-jockey text-[17px]">
          Ajouter
          <Plus className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une réservation</DialogTitle>
          <DialogDescription asChild className="py-4">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center justify-center gap-y-2 gap-x-2 flex-wrap text-black"
            >
              <Input
                placeholder="Hotels / clients"
                className="w-[48%] lg:w-[49%] text-black"
                {...form.register("hotel")}
              />
              <Input
                placeholder="Réception"
                className="w-[48%] lg:w-[49%] text-black"
                {...form.register("reception")}
              />
              <Input
                placeholder="Soin"
                className="w-[48%] lg:w-[49%] text-black"
                {...form.register("soin")}
              />
              <Input
                placeholder="Personnes"
                className="w-[48%] lg:w-[49%] text-black"
                {...form.register("people")}
              />
              <Textarea
                placeholder="Détails"
                {...form.register("details")}
                className="text-black"
              />
              <div className="w-full">
                <DatePicker form={form} />
              </div>

              <Select onValueChange={(e) => form.setValue("person", e)}>
                <SelectTrigger className="w-[48%] lg:w-[49%] ">
                  <SelectValue placeholder="Users" />
                </SelectTrigger>
                <SelectContent>
                  {people.map((user) => {
                    return (
                      <SelectItem
                        key={user}
                        value={user}
                        className="capitalize"
                      >
                        {user}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Button className="w-[48%] lg:w-[49%]" disabled={disable}>
                {isPending ? "En cours..." : "Ajouter"}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Add;

function DatePicker({ form }: { form: any }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (date) form.setValue("datee", format(date, "yyyy-MM-dd HH:mm"));
  }, [form, date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full text-black justify-center gap-x-6 text-left",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "P", { locale: fr }) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex items-center gap-x-3">
          <Calendar
            locale={fr}
            mode="single"
            selected={date}
            onSelect={(selectedDate: Date | undefined) => {
              setDate(selectedDate);
              if (selectedDate) {
                form.setValue(
                  "datee",
                  format(selectedDate, "yyyy-MM-dd HH:mm")
                );
              }
            }}
          />
          <div className="p-3">
            <TimePicker
              date={date}
              setDate={(newDate) => {
                setDate(newDate);
                if (newDate) {
                  form.setValue("date", newDate);
                }
              }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
