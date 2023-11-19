import DefaultForm from "@/components/common/form/DefaultForm";
import { Button } from "@/components/ui/button";
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
import { FormObject } from "@/utils/types/form";
import { List } from "@/utils/types/list";
import { Plus } from "lucide-react";

const TaskCreate = ({
  onSubmitEvent,
  form,
  children,
  dynamicTranslations,
  list,
}: {
  onSubmitEvent: (event: React.FormEvent<HTMLFormElement>) => void;
  form: FormObject;
  children: React.ReactElement;
  dynamicTranslations: {
    sheetTitle: string;
    sheetDescription: string;
    submitText: string;
  };
  list: List;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Plus size={20} className="text-gray-400" />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>
            <span className="text-main-500 underline font-bold">
              {list.title}
            </span>{" "}
            - {dynamicTranslations.sheetTitle}
          </SheetTitle>
          <SheetDescription>
            {dynamicTranslations.sheetDescription}
          </SheetDescription>
        </SheetHeader>
        <DefaultForm
          formObject={form}
          onSubmitEvent={onSubmitEvent}
          hasSubmitButton={false}
        >
          <>
            {children}
            <SheetFooter>
              <Button className="flex m-auto ml-0" type="submit">
                {dynamicTranslations.submitText}
              </Button>

              <SheetClose asChild>
                <Button variant={"outline"}>Fermer l'onglet</Button>
              </SheetClose>
            </SheetFooter>
          </>
        </DefaultForm>
      </SheetContent>
    </Sheet>
  );
};

export default TaskCreate;
