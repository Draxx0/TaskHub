import { CardContent } from "@/components/ui/card";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { Card as ShadCard } from "@/components/ui/card";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import AvatarSelection from "@/components/common/form/AvatarSelection";
import { useUserStore } from "@/store/user.store";
import { Flag, MessageCircle, MoreHorizontal } from "lucide-react";

interface CardProps {
  card: { id: string; title: string; content: string };
  index: number;
}

const Card = ({ card, index }: CardProps) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const { user } = useUserStore();
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          className="whitespace-normal"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ShadCard className="space-y-4">
            <div className="flex justify-between items-center px-6 pt-6">
              <div className="flex items-center gap-2">
                {/* Insert here task tag(s) create Tag component*/}
                <div className="px-3 py-1 rounded-md bg-green-300/50 flex items-center justify-center">
                  <span className="text-green-700 text-xs">Low</span>
                </div>
              </div>
              <div className="p-1 rounded-full transition ease-in-out duration-300 cursor-pointer hover:bg-gray-200">
                <MoreHorizontal size={20} className="text-gray-400" />
              </div>
            </div>
            <CardContent>
              <p className="font-bold mb-2">{card.title}</p>
              <div className="flex flex-col gap-4">
                <p className="text-sm">
                  {card.content.length > 50 ? (
                    <>
                      {showFullContent
                        ? card.content
                        : card.content.substring(0, 50) + "..."}
                      <button
                        onClick={() => setShowFullContent(!showFullContent)}
                        className="font-bold"
                      >
                        {showFullContent ? "Voir moins" : "Voir plus"}
                      </button>
                    </>
                  ) : (
                    card.content
                  )}
                </p>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <Flag size={16} className="text-gray-400" />
                    {/* {goal date} */}
                    <p className="opacity-75 text-xs font-semibold">22/12/23</p>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  {user && user.photoURL && (
                    <div className="flex items-center gap-3">
                      <AvatarSelection
                        url={user.photoURL}
                        fallback="user picture not found"
                        width="w-8"
                        className="rounded-full"
                      />
                      <p>{user.displayName ?? user.email}</p>
                    </div>
                  )}

                  <div className="p-2 relative flex items-center gap-1 rounded-full transition ease-in-out duration-300 cursor-pointer hover:bg-gray-200">
                    <MessageCircle size={20} className="text-gray-400" />
                    <span className="text-xs">8</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </ShadCard>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
