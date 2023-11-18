export const convertToBlob = (
  formDataEntry: FormDataEntryValue
): File | null => {
  if (formDataEntry instanceof File) {
    return formDataEntry;
  } else if (formDataEntry instanceof Blob) {
    return new File([formDataEntry], "filename.txt", { type: "text/plain" });
  } else if (typeof formDataEntry === "string") {
    const blob = new Blob([formDataEntry], { type: "text/plain" });
    return new File([blob], "filename.txt", { type: "text/plain" });
  } else {
    return null;
  }
};
