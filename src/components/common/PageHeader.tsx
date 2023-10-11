const PageHeader = ({ title, description, children }: { title: string; description?: string; children?: React.ReactElement }) => {
 return (
  <div className="flex justify-between">
   <div className="flex flex-col gap-2">
    <h1 className="text-secondary-500 font-bold text-3xl">
     {title}
    </h1>
    {description && <p className="opacity-75 max-w-4xl">{description}</p>}
   </div>
   {children}
  </div>
 );
}

export default PageHeader;