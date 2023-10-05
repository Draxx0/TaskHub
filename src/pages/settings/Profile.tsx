import TabHeader from "@/components/settings/TabHeader";
import { useUserStore } from "@/store/user.store";

const Profile = () => {
 const { user } = useUserStore();
 return (
  <div>
   <TabHeader tabDescription="eeee" tabTitle="zzzz" />

  </div>
 );
}

export default Profile;