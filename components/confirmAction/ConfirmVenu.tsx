import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { BookingSchemaTableType } from "@/schema/bookings";
import { useMediaQuery } from "@/hooks/use-media-query";

type Props = {
  item: BookingSchemaTableType;
  handleVenu: (id: number, status: boolean) => void;
};
const ConfirmVenu = ({ handleVenu, item }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="size-6 lg:size-[30px] bg-green-600 hover:bg-green-700"
          size={"icon"}
        >
          <Check size={isDesktop ? 20 : 15} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous absolument sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Si vous avez cliqué sur continuer || {item.hotel} || sera marqué
            comme venu!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleVenu(item.id, item.status)}
            className="bg-green-600 hover:bg-green-700"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmVenu;
