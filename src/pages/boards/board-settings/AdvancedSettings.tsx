import TabHeader from "@/components/common/settings/TabHeader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useGetDoc from "@/hooks/useGetDoc";
import { queryClient } from "@/main";
import { firebaseDelete } from "@/service/firestore/firebaseDelete";
import { WorkshopBoardRef } from "@/utils/types/board";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const AdvancedSettings = () => {
  const { t } = useTranslation("boards");
  const { workshopId, id: boardId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: currentWorkshopBoard } = useGetDoc<WorkshopBoardRef>({
    docReference: {
      path: "workshops",
      pathSegments: [workshopId ?? ""],
    },
    getSubCollectionData: {
      path: "boards",
    },
    condition: {
      leftConditon: "boardIdRef",
      operator: "==",
      rightCondition: boardId,
    },
    queryOptions: {
      enabled: !!boardId && !!workshopId,
    },
  });
  console.log("CURRENT WORKSHOP BOARD", currentWorkshopBoard);
  const handleDeleteBoard = async (): Promise<void> => {
    if (boardId && workshopId && currentWorkshopBoard) {
      try {
        await firebaseDelete.deleteDocInCollection({
          docReference: {
            path: "boards",
            pathSegments: [boardId],
          },
        });

        await firebaseDelete.deleteDocInCollection({
          docReference: {
            path: "workshops",
            pathSegments: [workshopId, "boards", currentWorkshopBoard.id],
          },
        });

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
