import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Workshop } from "@/utils/types/workshop";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const WorkshopsItem = ({ workshop }: { workshop: Workshop }) => {
 const navigate = useNavigate()
 return (
  <Card className="hover:border-main-500 transition ease-in-out duration-300">
   <CardHeader>
    <div className="w-12 h-12 bg-main-500/30 flex items-center justify-center rounded-lg p-2">
     <svg width="24" height="24" viewBox="0 0 20 20" className="text-main-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 14.42 2.87 18.17 6.84 19.5C7.34 19.58 7.5 19.27 7.5 19V17.31C4.73 17.91 4.14 15.97 4.14 15.97C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.5 16.45 6.97 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.5C3.62 8.39 4 7.5 4.65 6.79C4.55 6.54 4.2 5.5 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.5 15.45 6.54 15.35 6.79C16 7.5 16.38 8.39 16.38 9.5C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26V19C12.5 19.27 12.66 19.59 13.17 19.5C17.14 18.16 20 14.42 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z" fill="currentColor" />
     </svg>
    </div>
    <CardTitle>{workshop.name}</CardTitle>
    <CardDescription className="truncate" title={workshop.description}>{workshop.description}</CardDescription>
   </CardHeader>
   <CardContent>
    <p>Tableaux - <span className="text-main-500 font-semibold">4</span></p>
   </CardContent>
   <CardFooter>
    <small>Dernière modification : <span className="font-semibold">24/11/2023</span></small>
    <Button variant={"outline"} onClick={() => navigate(`/workshops/${workshop.id}`)}>
     Sélectionner
    </Button>
   </CardFooter>
  </Card>
 );
}

export default WorkshopsItem;