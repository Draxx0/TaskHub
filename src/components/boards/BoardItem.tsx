import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { formatDate } from "@/utils/functions/formatDate";
import { storedLang } from "@/main";
import { useTranslation } from "react-i18next";
import { Board } from "@/utils/types/board";

const BoardItem = ({ board }: { board: Board }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["boards", "global"]);
  const { id: workshopId } = useParams();
  return (
    <Card className="hover:border-main-500 transition ease-in-out duration-300">
      <CardHeader className="p-0">
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-main-500/30 flex items-center justify-center rounded-lg p-2">
              <p className="font-bold text-main-500">{board.name[0]}</p>
            </div>
            <CardTitle className="capitalize">{board.name}</CardTitle>
          </div>
          <CardDescription className="truncate" title={board.description}>
            {board.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p>
          {t("workshop_card.board")} -{" "}
          <span className="text-main-500 font-semibold">4</span>
        </p>
      </CardContent>
      <CardFooter className="flex p-4 justify-between">
        <small>
          {t("global:date")}{" "}
          <span className="font-semibold">
            {formatDate({ date: board.createdAt, locale: storedLang || "fr" })}
          </span>
        </small>
        <Button
          variant={"outline"}
          onClick={() =>
            navigate(`/workshops/${workshopId}/boardId/${board.id}`)
          }
        >
          {t("global:button.select")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BoardItem;
