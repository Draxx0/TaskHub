import Modal from "../common/Modal";
import { boardSchemas } from "../../validation/FormSchema";
import { useToast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";
import { firebaseCreate } from "@/service/firestore/firebaseCreate";
import { FormObject } from "@/utils/types/form";
import { queryClient } from "@/main";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/service/firebase.config";
import { firebaseGet } from "@/service/firestore/firebaseGet";
import { Board, IBoardCreate } from "@/utils/types/board";
import { useParams } from "react-router-dom";
import { Workshop } from "@/utils/types/workshop";

const BoardsCreate = () => {
  const { toast } = useToast();
  const { t } = useTranslation(["boards", "global"]);
  const { id: workshopId } = useParams();

  const formObject: FormObject = {
    formName: "board-create-form",
    formData: [
      {
        inputName: "board-name",
        inputPlaceholder: t("create.board_title_placeholder"),
        inputType: "text",
        labelText: t("create.board_title"),
      },
      {
        inputName: "board-description",
        inputPlaceholder: t("create.board_description_placeholder"),
        inputType: "text",
        labelText: t("create.board_description"),
        isTextarea: true,
      },
    ],
  };

  const formValidation = (
    boardTitle: string,
    boardDescription: string
  ): boolean => {
    try {
      if (boardTitle && boardDescription) {
        boardSchemas.createBoardFormSchema.parse({
          boardTitle,
          boardDescription,
        });
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const boardTitle = String(form.get("board-name"));
    const boardDescription = String(form.get("board-description"));

    const isFormValid = formValidation(boardTitle, boardDescription);

    if (!isFormValid) {
      throw new Error("Form is invalid");
    }

    try {
      onAuthStateChanged(auth, async (user) => {
        if (user && workshopId) {
          const newBoardRef = await firebaseCreate.addDocInCollection<
            IBoardCreate,
            Board
          >({
            docReference: {
              path: "boards",
            },
            data: {
              name: boardTitle,
              description: boardDescription,
              workshopId: workshopId,
            },
            returnOptions: {
              returnData: true,
              returnWithId: true,
            },
          });

          const workshopBoards = await firebaseGet.getFirebaseCollection<Board>(
            {
              docReference: {
                path: "workshops",
                pathSegments: [workshopId, "boards"],
              },
            }
          );

          if (newBoardRef && workshopBoards) {
            if (workshopBoards.length === 0) {
              await firebaseCreate.setCollectionInDoc<
                Workshop,
                Record<string, string>
              >({
                collectionName: "boards",
                docReference: {
                  path: "workshops",
                  pathSegments: [workshopId],
                },
                newCollectionFirstDoc: {
                  boardIdRef: newBoardRef.id,
                },
              });
            } else {
              await firebaseCreate.addDocInCollection<Record<string, string>>({
                docReference: {
                  path: "workshops",
                  pathSegments: [workshopId, "boards"],
                },
                data: {
                  boardIdRef: newBoardRef.id,
                },
              });
            }

            await queryClient.invalidateQueries({
              queryKey: ["collection", "workshops"],
              exact: true,
            });
          }

          await queryClient.invalidateQueries({
            queryKey: ["collection", "boards"],
            exact: true,
          });

          toast({
            title: t("toast.success.title"),
            description: t("toast.success.description"),
          });
        } else {
          throw new Error("User not connected");
        }
      });
    } catch (error) {
      toast({
        title: t("global:errors.global_title"),
        description: t("global:errors.global_description"),
        variant: "destructive",
      });
    }
  };

  return (
    <Modal
      onSubmitEvent={handleSubmit}
      formData={formObject}
      dynamicTranslation={{
        buttonText: t("create.title"),
        description: t("create.description"),
        title: t("create.title"),
      }}
    />
  );
};

export default BoardsCreate;
