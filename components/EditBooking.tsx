import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { CalendarIcon, Pen } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { TimePicker } from "./TimePicker/time-picker-demo";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/utils/cn";
import { format, parse } from "date-fns";
import { fr } from "date-fns/locale";
import { useForm } from "react-hook-form";
import {
  BookingSchema,
  BookingSchemaTable,
  BookingSchemaTableType,
  BookingSchemaType,
} from "@/schema/bookings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { editeBooking } from "@/actions/editeBooking";
import toast from "react-hot-toast";

type Props = {
  item: BookingSchemaTableType;
};

const EditBooking = ({ item }: Props) => {
  const [date, setDate] = useState<Date | null>(new Date(item.date));
  const [open, setOpen] = useState(false);

  const form = useForm<BookingSchemaTableType>({
    resolver: zodResolver(BookingSchemaTable),
    defaultValues: {
      id: item.id,
      hotel: item.hotel,
      date: item.date,
      person: item.person,
      reception: item.reception,
      soin: item.soin,
      people: item.people,
      details: item.details,
      createdBy: item.createdBy,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: editeBooking,
    mutationKey: ["editeBooking"],

    onSuccess: () => {
      setOpen(false);
      form.reset();
      toast.success("Mis à jour avec succès 🎉");
    },
  });

  const onSubmit = async (values: BookingSchemaTableType) => {
    mutate(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="size-[30px] bg-blue-600 hover:bg-blue-700"
          size={"icon"}
        >
          <Pen size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mettre a jour la réservation</DialogTitle>
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

              <DatePicker form={form} date={date} setDate={setDate} />

              <Button className="w-[48%] lg:w-[49%]" disabled={isPending}>
                {isPending ? "Mise à jour en cours..." : "Mettre à jour"}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditBooking;

type DateProps = {
  form: any;
  date: any;
  setDate: any;
};

function DatePicker({ form, date, setDate }: DateProps) {
  useEffect(() => {
    form.setValue("date", date);
  }, [form, date]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[48%]  text-black justify-center gap-x-6 text-left",
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
                form.setValue("date", selectedDate);
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
