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
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ConfirmDeleteAll = () => {
  const router = useRouter();
  const handleDeleteAll = async () => {
    const supabase = createClient();
    await supabase.from("bookings").delete().eq("deleted", true);
    router.refresh();
    toast.success("Toutes les réservations sont supprimées avec succès. 🎉");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="font-jockey bg-blue1 hover:bg-blueHover">
          Supprimer tout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous absolument sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Si vous cliquez sur continuer, toutes les réservations seront
            supprimées!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAll}
            className="bg-red-500 hover:bg-red-600"
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteAll;
