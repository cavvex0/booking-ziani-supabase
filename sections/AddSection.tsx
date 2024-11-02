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
  date: Date | null;
  setDate: any;
  handleShowAll: () => void;
};
const AddSection = ({ date, setDate, handleShowAll }: Props) => {
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
              selected={date ? new Date(date) : undefined}
              locale={fr}
              onSelect={(selectedDate: Date | undefined) => {
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          </PopoverContent>
        </Popover>

        <Button
          onClick={() => setDate(new Date())}
          className="bg-red-600 hover:bg-red-500 size-[36px]"
          size={"icon"}
        >
          <Trash size={21} />
        </Button>
      </div>
      <Button
        onClick={handleShowAll}
        className="bg-blue1 hover:bg-blueHover font-jockey text-[17px]"
      >
        {date ? "Tout afficher" : "Aujour d'hui"}
      </Button>
    </div>
  );
};

export default AddSection;
