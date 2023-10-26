export const formatCurrentPathname = (
  currentPathname: string,
  remplacementPathSegment: string
) => {
  const pathname = currentPathname;
  const newPathSegment = remplacementPathSegment;

  const segments = pathname.split("/");
  segments.pop();
  segments.push(newPathSegment);
  return segments.join("/");
};
