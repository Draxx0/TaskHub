import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { Timestamp } from "firebase/firestore";
import { Language } from "../types/language";

export const formatDate = ({
  date,
  locale,
}: {
  date: Timestamp;
  locale: Language;
}): string => {
  const dateToFormat = new Date(date.seconds * 1000);
  const localeLanguage = locale === "fr" ? fr : enUS;
  return format(
    dateToFormat,
    `${localeLanguage === fr ? "dd MMMM" : "MMMM dd '-'"} yyyy`,
    {
      locale: localeLanguage,
    }
  );
};
