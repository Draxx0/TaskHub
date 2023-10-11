import { settingsSchemas } from "@/components/common/form/FormSchema";
import SettingsForm from "@/components/common/form/SettingsForm";
import TabHeader from "@/components/settings/TabHeader";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store/user.store";
import { FormObject } from "@/utils/types/form";
import { ILanguage, Language } from "@/utils/types/language";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import ReauthenticateModal from "@/components/common/ReauthenticateModal";
import { usePreferencesStore } from "@/store/preferences.store";

const Account = () => {
 const { user } = useUserStore();
 const { changeLanguage } = usePreferencesStore()
 const { t, i18n } = useTranslation(["settings", "global"]);
 const { toast } = useToast();
 const [newEmail, setNewEmail] = useState<string | null>(null);
 const [isModalOpen, setIsModalOpen] = useState(false)
 const preferencesStore = usePreferencesStore.getState();

 const storedLang = useMemo(() => {
  return preferencesStore.language;
 }, [preferencesStore.language])

 const languages: ILanguage[] = [
  {
   text: t("account.language.language_french"),
   value: "fr"
  },
  {
   text: t("account.language.language_english"),
   value: "en"
  }
 ]

 const formObject: FormObject = {
  formName: "Account form",
  formData: [
   {
    labelText: t("account.email.email_label"),
    inputName: "email",
    inputPlaceholder: t("account.email.input_placeholder"),
    inputType: "email",
    inputDescription: t("account.email.email_description"),
    inputDefaultValue: user?.email || ""
   },
  ],
 };

 const formValidation = (email?: string, language?: string): boolean => {
  const currentEmail = user?.email
  try {
   //! IT SHOULD BE REVIEW
   if (language && email === currentEmail) {
    // IF ONLY LANGUAGE HAVE BEEN CHANGED
    settingsSchemas.accountFormSchema.parse({ language })
   } else if (email !== currentEmail && !language) {
    // IF ONLY EMAIL HAVE BEEN CHANGED
    settingsSchemas.accountFormSchema.parse({ email })
   } else if (language && email !== currentEmail) {
    // IF LANGUAGE & EMAIL CHANGED 
    settingsSchemas.accountFormSchema.parse({ email, language })
   }
   return true
  } catch (error) {
   toast({
    title: t("global:errors.global_title"),
    description: t("global:errors.global_description"),
    variant: "destructive"
   })
   return false
  }
 }

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const email = String(form.get("email"));
  const language = String(form.get("language"));

  const isFormValid = formValidation(email, language)

  if (!isFormValid) {
   throw new Error("Form is invalid")
  }

  try {
   //UPDATE ACCOUNT

   if (email) {
    setNewEmail(email)
    setIsModalOpen(true)
   }

   if (language) {
    i18n.changeLanguage(language)
    changeLanguage(language as Language)
   }


   toast({
    title: t("utils.profile_update.profile_update_title"),
    description: t("utils.profile_update.profile_update_description"),
   })
  } catch (error) {
   toast({
    title: t("global:errors.global_title"),
    description: t("global:errors.global_description"),
    variant: "destructive"
   })
  }
 }

 return (
  <div className="space-y-10">
   <TabHeader tabTitle={t("account.title")} tabDescription={t("account.description")} />
   <SettingsForm onSubmitEvent={handleSubmit} formObject={formObject} t={t}>
    <div className="flex flex-col gap-2">
     <label htmlFor="language">{t("account.language.language_label")}</label>
     <Select name="language" defaultValue={storedLang as string}>
      <SelectTrigger className="w-full" id="language">
       <SelectValue placeholder={t("account.language.language_select")} />
      </SelectTrigger>
      <SelectContent position="popper">
       <SelectGroup>
        <SelectLabel>{t("account.language.language_label")}</SelectLabel>
        {languages.map((language, index) => (
         <SelectItem key={index} value={language.value}>{language.text}</SelectItem>
        ))}
       </SelectGroup>
      </SelectContent>
     </Select>
     <small className="opacity-75">{t("account.language.language_description")}</small>
    </div>
   </SettingsForm>
   {newEmail && newEmail !== user?.email && (
    <ReauthenticateModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} newEmail={newEmail} setNewEmail={setNewEmail} />
   )}
  </div>
 );
}

export default Account;