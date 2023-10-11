import { Loader2 } from 'lucide-react';
import { useEffect } from "react";
const Spinner = ({ isCentered }: { isCentered: boolean }) => {

 useEffect(() => {
  document.body.style.overflow = "hidden"
  return () => {
   document.body.style.overflow = "auto"
  }
 }, [])
 return (
  <div className="min-h-screen">
   <div className={isCentered ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""}>
    <Loader2 className={`h-10 w-10 animate-spin`} />
   </div>
  </div>
 );
}

export default Spinner;