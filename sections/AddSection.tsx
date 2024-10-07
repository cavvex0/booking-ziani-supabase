import Add from "@/components/Add";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/cn";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Trash } from "lucide-react";

type Props = {
  date: Date | undefined;
  setDate: any;
  setShowAll: any;
};
const AddSection = ({ date, setDate, setShowAll }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <Add />
      <div className="flex items-center gap-x-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px]  justify-center gap-x-6 text-left font-jockey lg:text-[17px] bg-gray-200",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "P", { locale: fr })
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              locale={fr}
              onSelect={(selectedDate: Date | undefined) => {
                if (selectedDate) {
                  setDate(selectedDate);
                  setShowAll(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>

        <Button
          onClick={() => setDate(null)}
          className="bg-red-600 hover:bg-red-500 size-[36px]"
          size={"icon"}
        >
          <Trash size={21} />
        </Button>
      </div>
      <Button className="bg-blue-700 hover:bg-blue-600 font-jockey text-[17px]">
        Show All
      </Button>
    </div>
  );
};

export default AddSection;
