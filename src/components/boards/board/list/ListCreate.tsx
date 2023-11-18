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

const ListCreate = ({
  onSubmitEvent,
  form,
  children,
  dynamicTranslations,
}: {
  onSubmitEvent: (event: React.FormEvent<HTMLFormElement>) => void;
  form: FormObject;
  children: React.ReactElement;
  dynamicTranslations: {
    sheetTitle: string;
    sheetDescription: string;
    submitText: string;
  };
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>{dynamicTranslations.sheetTitle}</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>{dynamicTranslations.sheetTitle}</SheetTitle>
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

export default ListCreate;
