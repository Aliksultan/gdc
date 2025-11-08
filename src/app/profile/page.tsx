import { ProfilePage } from "@/modules/profile";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { User } from "firebase/auth";

export default async function Page() {
  const {currentUser} = await getAuthenticatedAppForUser();
  return <ProfilePage initialUser={currentUser?.toJSON() as User | null} />;
}
  