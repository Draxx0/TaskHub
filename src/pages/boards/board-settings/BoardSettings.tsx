import Tabs from "@/components/boards/board-settings/BoardSettingsTabs";
import Section from "@/components/common/Section";
import Error from "@/components/common/error/Error";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useGetDoc from "@/hooks/useGetDoc";
import { Board } from "@/utils/types/board";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { TabItem } from "@/utils/types/settings";
import Back from "@/components/common/Back";

const BoardSettings = ({ children }: { children: React.ReactElement }) => {
  const { t } = useTranslation(["boards"]);
  const tabs: TabItem[] = t("settings.tabs", { returnObjects: true });
  const { workshopId, id: boardId } = useParams();
  const { data: board, isLoading } = useGetDoc<Board>({
    docReference: {
      path: "boards",
      pathSegments: [boardId ?? ""],
    },
    queryOptions: {
      enabled: !!boardId,
    },
  });
  return (
    <Section>
      <>
        <div className="space-y-6">
          <Back
            url={`/workshops/${workshopId}/boardId/${boardId}`}
            variant="link"
            translate={t("back") + " " + board?.name}
          />
          <div>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ) : board ? (
              <>
                <h1 className="text-2xl font-bold">
                  {t("settings.title")}{" "}
                  <span className="text-main-500 underline">{board.name}</span>
                </h1>
                <p className="opacity-75">{t("settings.description")}</p>
              </>
            ) : (
              <Error />
            )}
          </div>
          <Separator />
        </div>

        <div className="flex gap-10">
          <div className="w-1/5">
            <Tabs tabs={tabs} />
          </div>
          <div className="w-4/5 max-w-3xl">{children}</div>
        </div>
      </>
    </Section>
  );
};

export default BoardSettings;
