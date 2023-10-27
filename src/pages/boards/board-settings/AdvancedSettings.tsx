import TabHeader from "@/components/common/settings/TabHeader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { queryClient } from "@/main";
import { db } from "@/service/firebase.config";
import { firebaseDelete } from "@/service/firestore/firebaseDelete";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const AdvancedSettings = () => {
  const { t } = useTranslation("boards");
  const { workshopId, id: boardId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDeleteBoard = async (): Promise<void> => {
    if (boardId && workshopId) {
      try {
        await firebaseDelete.deleteDocInCollection({
          docReference: {
            path: "boards",
            pathSegments: [boardId],
          },
        });

        //! should be encapsuled

        const workshopRef = doc(db, "workshops", workshopId);
        const workshopBoardsRef = collection(workshopRef, "boards");

        const q = query(workshopBoardsRef, where("boardIdRef", "==", boardId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const boardDocRef = querySnapshot.docs[0].ref;
          await firebaseDelete.deleteDocWithDocRef(boardDocRef);
        }

        //!

        await queryClient.invalidateQueries({
          exact: true,
          queryKey: ["boards"],
        });

        toast({
          title: t("settings.toast.success.title"),
          description: t("settings.toast.success.description"),
        });

        navigate(`/workshops/${workshopId}`);
      } catch (error) {
        toast({
          title: t("global:errors.global_title"),
          description: t("global:errors.global_description"),
          variant: "destructive",
        });
      }
    }
  };
  return (
    <div className="space-y-10">
      <TabHeader
        tabTitle={t("settings.advanced.title")}
        tabDescription={t("settings.advanced.description")}
      />
      <Button variant={"destructive"} onClick={handleDeleteBoard}>
        {t("settings.advanced.delete")}
      </Button>
    </div>
  );
};

export default AdvancedSettings;
