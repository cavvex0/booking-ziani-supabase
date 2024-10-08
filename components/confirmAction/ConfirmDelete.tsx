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
import { Trash } from "lucide-react";
import { BookingSchemaTableType } from "@/schema/bookings";
import { useMediaQuery } from "@/hooks/use-media-query";

type Props = {
  handleDelete: (id: number) => void;
  item: BookingSchemaTableType;
};

function ConfirmDelete({ handleDelete, item }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="size-6 lg:size-[30px] bg-red-600 hover:bg-red-700"
          size={"icon"}
        >
          <Trash size={isDesktop ? 20 : 15} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous absolument sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Si vous avez cliqué sur continuer || {item.hotel} || sera supprimé!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(item.id)}
            className="bg-red-500 hover:bg-red-600"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default ConfirmDelete;
