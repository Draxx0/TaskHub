import { Separator } from "@/components/ui/separator";

const TabHeader = ({ tabTitle, tabDescription }: { tabTitle: string; tabDescription: string; }) => {
 return (
  <div className="space-y-8">
   <div>
    <h2 className="font-semibold text-xl">{tabTitle}</h2>
    <p className="opacity-75">{tabDescription}</p>
   </div>
   <Separator />
  </div>
 );
}

export default TabHeader;