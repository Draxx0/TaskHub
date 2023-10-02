export const authFormErrorFinder = (messageError: string) => {
  switch (messageError) {
    case "String must contain at least 4 character(s)":
      return {
        error: "password",
      };

    case "":
      return {
        error: "email",
      };

    default:
      return {
        error: null,
      };
  }
};
