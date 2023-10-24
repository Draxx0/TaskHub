import Modal from "../common/Modal";
import { boardSchemas } from "../common/form/FormSchema";
import { useToast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";
import { firebaseCreate } from "@/service/firebaseCreate";
import { FormObject } from "@/utils/types/form";
import { queryClient } from "@/main";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/service/firebase.config";
import { firebaseGet } from "@/service/firebaseGet";
import { IBoardCreate } from "@/utils/types/board";
import { useParams } from "react-router-dom";
import { firebaseUpdate } from "@/service/firebaseUpdate";
import { Workshop } from "@/utils/types/workshop";
import { FirebaseDocData } from "@/utils/types/firebase";

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
          const workshopRef = (await firebaseGet.getFirebaseDoc<Workshop>({
            docReferenceParams: {
              path: "workshops",
              pathSegments: [workshopId],
            },
            returnWithId: true,
          })) as FirebaseDocData<Workshop> | undefined;

          if (workshopRef) {
            const newBoardRef = await firebaseCreate.addDocInCollection<
              IBoardCreate<Workshop>
            >({
              docReferenceParams: {
                path: "boards",
              },
              data: {
                name: boardTitle,
                description: boardDescription,
                workshop: workshopRef,
              },
              params: {
                returnRef: true,
              },
            });

            await firebaseUpdate.docInCollection({
              collection: "workshops",
              docId: workshopId,
              updateData: {
                boards: [...workshopRef.boards, newBoardRef],
              },
            });
          } else {
            throw new Error("Workshop reference not found..");
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
