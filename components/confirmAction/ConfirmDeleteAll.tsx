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
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ConfirmDeleteAll = () => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const handleDeleteAll = async () => {
    const supabase = createClient();
    await supabase.from("bookings").delete().eq("deleted", true);
    router.refresh();
    toast.success("Tout les réservations sont supprimées avec succès 🎉");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="font-jockey bg-blue-600 hover:bg-blue-700">
          Supprimer tout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous absolument sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Si vous avez cliqué sur continuer toutes les réservations seront supprimées!
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
