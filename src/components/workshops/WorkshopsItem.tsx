import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Workshop } from "@/utils/types/workshop";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { formatDate } from "@/utils/functions/formatDate";
import { storedLang } from "@/main";
import { useTranslation } from "react-i18next";
import useGetCollection from "@/hooks/useGetCollection";
import { Skeleton } from "../ui/skeleton";

const WorkshopsItem = ({ workshop }: { workshop: Workshop }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["workshops", "global"]);
  const { data: workshopBoards, isLoading } = useGetCollection({
    docReference: {
      path: "workshops",
      pathSegments: [workshop.id, "boards"],
    },
    queryOptions: {
      enabled: !!workshop.id,
    },
  });
  return (
    <Card className="hover:border-main-500 transition ease-in-out duration-300">
      <CardHeader className="p-0">
        <img
          src={workshop.coverUrl}
          className="h-40 object-cover rounded-t-lg"
          alt=""
        />
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-main-500/30 flex items-center justify-center rounded-lg p-2">
              <p className="font-bold text-main-500 uppercase">
                {workshop.name[0]}
              </p>
            </div>
            <CardTitle className="capitalize truncate">
              {workshop.name}
            </CardTitle>
          </div>
          <CardDescription className="truncate" title={workshop.description}>
            {workshop.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <Skeleton className="h-2" />
        ) : (
          <p>
            {t("workshop_card.board")}
            {workshopBoards && workshopBoards.length > 1 ? "x" : null} -{" "}
            <span className="text-main-500 font-semibold">
              {workshopBoards && workshopBoards.length}
            </span>
          </p>
        )}
      </CardContent>
      <CardFooter className="flex p-4 justify-between">
        <small>
          {" "}
          {t("global:date")}{" "}
          <span className="font-semibold">
            {formatDate({
              date: workshop.createdAt,
              locale: storedLang || "fr",
            })}
          </span>
        </small>
        <Button
          variant={"outline"}
          onClick={() => navigate(`/workshops/${workshop.id}`)}
        >
          {t("global:button.select")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkshopsItem;
