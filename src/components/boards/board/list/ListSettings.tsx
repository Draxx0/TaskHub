import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { queryClient } from "@/main";
import { firebaseDelete } from "@/service/firestore/firebaseDelete";
import { List } from "@/utils/types/list";
import { MoreHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";

const ListSettings = ({
  dynamicTranslations,
  listData,
}: {
  dynamicTranslations: {
    sheetTitle: string;
    sheetDescription: string;
    submitText: string;
  };
  listData: List;
}) => {
  const { t } = useTranslation(["boards", "global"]);
  const { toast } = useToast();
  const handleUpdateList = async () => {};

  const handleDeleteList = async () => {
    try {
      await firebaseDelete.deleteDocInCollection({
        docReference: {
          path: "lists",
          pathSegments: [listData.id],
        },
      });

      await queryClient.invalidateQueries({
        queryKey: ["collection", "lists"],
      });

      toast({
        title: t("toast.task_success.title"),
      });
    } catch (error) {
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
      throw new Error("An error occured during deletion");
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MoreHorizontal size={20} className="text-gray-400" />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>{dynamicTranslations.sheetTitle}</SheetTitle>
          <SheetDescription>
            {dynamicTranslations.sheetDescription}
          </SheetDescription>
        </SheetHeader>
        <>
          <form onSubmit={handleUpdateList}>
            <div className="flex flex-col gap-2">
              <label>Titre</label>
              <Input
                type="text"
                defaultValue={listData.title}
                name="list-title"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Couleur</label>
              <Input
                type="color"
                defaultValue={listData.color}
                name="list-color"
              />
            </div>
          </form>
          <Button
            className=""
            onClick={handleDeleteList}
            variant={"destructive"}
          >
            Supprimer
          </Button>
          <SheetFooter>
            <Button className="flex m-auto ml-0" type="submit">
              {dynamicTranslations.submitText}
            </Button>

            <SheetClose asChild>
              <Button variant={"outline"}>Fermer l'onglet</Button>
            </SheetClose>
          </SheetFooter>
        </>
      </SheetContent>
    </Sheet>
  );
};

export default ListSettings;
