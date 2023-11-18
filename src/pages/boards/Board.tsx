import BoardList from "@/components/boards/board/BoardLists";
import ListCreate from "@/components/boards/board/list/ListCreate";
import Back from "@/components/common/Back";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section";
import Error from "@/components/common/error/Error";
import Spinner from "@/components/common/loader/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { TEN_MIN_STATE_TIME } from "@/constant/reactQuery.constant";
import useGetDoc from "@/hooks/useGetDoc";
import { queryClient } from "@/main";
import { firebaseCreate } from "@/service/firestore/firebaseCreate";
import { usePreferencesStore } from "@/store/preferences.store";
import { Board as IBoard } from "@/utils/types/board";
import { FormObject } from "@/utils/types/form";
import { ICreateList } from "@/utils/types/list";
import { Workshop } from "@/utils/types/workshop";
import { listSchemas } from "@/validation/FormSchema";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "react-router-dom";

const Board = () => {
  const { t } = useTranslation(["boards", "global"]);
  const { toast } = useToast();
  const { addFavorite, favorites, removeFavorite } = usePreferencesStore();
  const { id: boardId, workshopId } = useParams();
  const location = useLocation();
  const {
    data: board,
    isLoading,
    isError,
  } = useGetDoc<IBoard>({
    docReference: {
      path: "boards",
      pathSegments: [boardId ?? ""],
    },
    queryOptions: {
      staleTime: TEN_MIN_STATE_TIME,
      enabled: !!boardId,
    },
  });

  console.log("check at board", board);

  const { data: workshop } = useGetDoc<Workshop>({
    docReference: {
      path: "workshops",
      pathSegments: [workshopId ?? ""],
    },
    queryOptions: {
      enabled: !!workshopId,
    },
  });

  const formObject: FormObject = {
    formName: "board-list-create-form",
    formData: [
      {
        inputName: "list-title",
        inputPlaceholder: t("list.create-list.list_title_placeholder"),
        inputType: "text",
        labelText: t("list.create-list.list_title"),
      },
    ],
  };

  const formValidation = (listTitle: string, listColor: string): boolean => {
    try {
      const result = listSchemas.createListFormSchema.safeParse({
        listTitle,
        listColor,
      });

      if (!result.success) {
        return false;
      }

      return true;
    } catch (error) {
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSubmitNewList = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const listTitle = String(form.get("list-title"));
    const listColor = String(form.get("list-color"));

    console.log("list color", listColor);

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
      if (boardId) {
        await firebaseCreate.addDocInCollection<ICreateList>({
          docReference: {
            path: "lists",
          },
          data: {
            boardId,
            title: listTitle,
            color: listColor,
            tasks: [],
          },
        });

        await queryClient.invalidateQueries({
          queryKey: ["collection", "lists"],
        });

        toast({
          title: t("toast.list_success.title"),
        });
      }
    } catch (error) {
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleFavorite = (method: "add" | "remove") => {
    if (board) {
      if (method === "add") {
        addFavorite(board);

        toast({
          title: t("favorite.toast.add_success"),
        });
      } else {
        removeFavorite(board);

        toast({
          title: t("favorite.toast.remove_success"),
        });
      }
    }
  };

  return (
    <Section>
      <>
        {isLoading ? (
          <Spinner isCentered />
        ) : isError ? (
          <Error />
        ) : (
          <div className="space-y-6">
            <Back
              url={`/workshops/${workshopId}`}
              variant="link"
              translate={`${t("back")} ${workshop?.name}`}
            />
            <PageHeader title={board.name} description={board.description}>
              <div className="flex gap-3 items-center">
                {favorites.some((favorite) => favorite.id === board.id) ? (
                  <Button
                    variant={"secondary"}
                    onClick={() => handleFavorite("remove")}
                  >
                    {t("favorite.remove")}
                  </Button>
                ) : (
                  <Button
                    variant={"outline"}
                    onClick={() => handleFavorite("add")}
                  >
                    {t("favorite.add")}
                  </Button>
                )}
                <Button variant={"outline"} asChild>
                  <Link to={`${location.pathname}/settings/general`}>
                    Modifier
                  </Link>
                </Button>
                <ListCreate
                  form={formObject}
                  dynamicTranslations={{
                    sheetDescription: t("list.create-list.description"),
                    sheetTitle: t("list.create-list.title"),
                    submitText: t("list.create-list.submit"),
                  }}
                  onSubmitEvent={handleSubmitNewList}
                >
                  <div className="flex flex-col gap-2">
                    <label>{t("list.create-list.list_color")}</label>
                    <Input
                      type="color"
                      className="cursor-pointer"
                      name="list-color"
                    />
                    <small className="opacity-75">
                      {t("list.create-list.list_color_small_text")}
                    </small>
                  </div>

                  {/* Ajouter ici un multi select custom pour sélectionner les tags déjà présent du board */}
                </ListCreate>
              </div>
            </PageHeader>

            <div className="pb-4">
              <BoardList />
            </div>
          </div>
        )}
      </>
    </Section>
  );
};

export default Board;
