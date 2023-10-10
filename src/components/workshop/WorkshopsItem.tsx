import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Workshop } from "@/utils/types/workshop";
import { useNavigate } from "react-router-dom";

const WorkshopsItem = ({ workshop }: { workshop: Workshop }) => {
 const navigate = useNavigate()
 return (
  <Card className="hover:border-main-500 transition ease-in-out duration-300" onClick={() => navigate(`/workshops/${workshop.id}`)}>
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