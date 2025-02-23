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
  EditBookingSchemaType,
  EditSchemaTable,
} from "@/schema/bookings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { editeBooking } from "@/actions/editeBooking";
import toast from "react-hot-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Props = {
  item: BookingSchemaTableType;
};

const EditBooking = ({ item }: Props) => {
  const router = useRouter();
  const [date, setDate] = useState<Date | null>(
    item.datee ? parse(item.datee, "yyyy-MM-dd HH:mm", new Date()) : new Date()
  );
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const form = useForm<EditBookingSchemaType>({
    resolver: zodResolver(EditSchemaTable),
    defaultValues: {
      id: item.id,
      hotel: item.hotel,
      reception: item.reception,
      soin: item.soin,
      people: item.people,
      details: item.details,
      createdBy: item.createdBy,
      datee: item.datee,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: editeBooking,
    mutationKey: ["editeBooking"],

    onSuccess: () => {
      setOpen(false);
      toast.success("Mis à jour avec succès 🎉");
      router.refresh();
    },
    onError: (error) => {
      toast.error("Vous n'êtes pas autorisé à modifier cette réservation");
    },
  });

  const onSubmit = async (values: EditBookingSchemaType) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return router.push("/login");
    }
    mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn("size-6 lg:size-[30px] bg-blue-600 hover:bg-blue-700")}
          size={"icon"}
        >
          <Pen size={isDesktop ? 20 : 15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mettre à jour la réservation</DialogTitle>
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
    form.setValue("datee", format(date, "yyyy-MM-dd HH:mm"));
  }, [date, form]);
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
                  form.setValue("datee", newDate);
                }
              }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
