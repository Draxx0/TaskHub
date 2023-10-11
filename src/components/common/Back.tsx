import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type Props = {
 className?: string;
 translate: string;
 variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"
 url: string;
}

const Back = ({ className, translate, variant, url }: Props) => {
 return (
  <Link className="text-center" to={url}>
   <Button
    asChild
    variant={variant}
    className={className}
   >
    <div className="flex items-center gap-3">
     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={variant === "default" ? "text-white" : "text-secondary-500"} xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_23_8)">
       <path d="M6.04598 11.677C6.88355 10.2621 8.16287 9.1616 9.68709 8.54493C11.2113 7.92825 12.8959 7.82955 14.4817 8.26402C16.0675 8.69848 17.4666 9.64203 18.4637 10.9495C19.4608 12.2569 20.0005 13.8558 20 15.5C20 15.7652 20.1053 16.0196 20.2929 16.2071C20.4804 16.3946 20.7348 16.5 21 16.5C21.2652 16.5 21.5196 16.3946 21.7071 16.2071C21.8946 16.0196 22 15.7652 22 15.5C22.0001 13.4887 21.3619 11.5293 20.1773 9.90394C18.9927 8.27856 17.3227 7.07109 15.408 6.45542C13.4933 5.83976 11.4326 5.84766 9.52265 6.478C7.61271 7.10834 5.9521 8.32858 4.77998 9.963L4.24298 6.918C4.19697 6.65676 4.04906 6.4245 3.8318 6.27232C3.61454 6.12013 3.34572 6.06049 3.08448 6.1065C2.82324 6.15252 2.59098 6.30042 2.4388 6.51768C2.28661 6.73494 2.22697 7.00376 2.27298 7.265L3.31498 13.174C3.36135 13.4351 3.50955 13.6671 3.72698 13.819C3.86867 13.914 4.03052 13.9748 4.19974 13.9965C4.36896 14.0182 4.5409 14.0002 4.70198 13.944L10.382 12.943C10.6432 12.897 10.8755 12.7491 11.0277 12.5318C11.1798 12.3146 11.2395 12.0457 11.1935 11.7845C11.1475 11.5233 10.9996 11.291 10.7823 11.1388C10.565 10.9866 10.2962 10.927 10.035 10.973L6.04598 11.677Z" fill="currentColor" />
      </g>
      <defs>
       <clipPath id="clip0_23_8">
        <rect width="24" height="24" fill="white" />
       </clipPath>
      </defs>
     </svg>

     <p className={variant === "default" ? "text-white" : "text-secondary-500"}>{translate}</p>
    </div>
   </Button>
  </Link>
 );
}

export default Back;