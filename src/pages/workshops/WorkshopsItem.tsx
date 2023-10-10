import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Workshop } from "@/utils/types/workshop";

const WorkshopsItem = ({ workshop }: { workshop: Workshop }) => {
 return (
  <Card>
   <CardHeader>
    <CardTitle>{workshop.name}</CardTitle>
    <CardDescription className="truncate">{workshop.description}</CardDescription>
   </CardHeader>
   <CardContent>
    <p>Card Content</p>
   </CardContent>
   <CardFooter>
    <p>Card Footer</p>
   </CardFooter>
  </Card>
 );
}

export default WorkshopsItem;