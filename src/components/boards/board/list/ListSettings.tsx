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
import { firebaseUpdate } from "@/service/firestore/firebaseUpdate";
import { List, UpdateList } from "@/utils/types/list";
import { listSchemas } from "@/validation/FormSchema";
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

  const formValidation = (listTitle: string, listColor: string) => {
    if (listTitle && listColor) {
      const result = listSchemas.createListFormSchema.safeParse({
        listTitle,
        listColor,
      });

      if (!result.success) {
        toast({
          title: t("global:errors.global_title"),
          description: t("global:errors.global_description"),
          variant: "destructive",
        });
        return false;
      }

      return true;
    }
    toast({
      title: t("global:errors.global_title"),
      description: t("global:errors.global_description"),
      variant: "destructive",
    });
    return false;
  };

  const handleUpdateList = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const listTitle = String(form.get("list-title"));
    const listColor = String(form.get("list-color"));

    const isFormValid = formValidation(listTitle, listColor);

    if (!isFormValid) {
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
      return;
    }

    try {
      await firebaseUpdate.docInCollection<UpdateList>({
        docReference: {
          path: "lists",
          pathSegments: [listData.id],
        },
        updateData: {
          title: listTitle,
          color: listColor,
        },
      });

      await queryClient.invalidateQueries({
        queryKey: ["collection", "lists"],
      });

      toast({
        title: t("toast.update_list_success.title"),
      });
    } catch (error) {
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
    }

    console.log(listTitle, listColor);
  };

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
        title: t("toast.delete_list_success.title"),
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
      <SheetContent className="flex flex-col justify-between">
        <div className="space-y-4">
          <SheetHeader>
            <SheetTitle>{dynamicTranslations.sheetTitle}</SheetTitle>
            <SheetDescription>
              {dynamicTranslations.sheetDescription}
            </SheetDescription>
          </SheetHeader>
          <>
            <form onSubmit={handleUpdateList} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label>{t("list.create-list.list_title")}</label>
                <Input
                  type="text"
                  defaultValue={listData.title}
                  name="list-title"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>{t("list.create-list.list_color")}</label>
                <Input
                  type="color"
                  defaultValue={listData.color}
                  name="list-color"
                />
              </div>
              <SheetFooter className="sm:justify-between">
                <SheetClose asChild>
                  <Button variant={"outline"}>Fermer l'onglet</Button>
                </SheetClose>

                <Button className="flex m-auto ml-0" type="submit">
                  {dynamicTranslations.submitText}
                </Button>
              </SheetFooter>
            </form>
          </>
        </div>

        <Button className="" onClick={handleDeleteList} variant={"destructive"}>
          {t("list.update-list.delete")}
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default ListSettings;
