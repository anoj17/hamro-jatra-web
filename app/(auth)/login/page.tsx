import { auth } from "@/auth";
import { LoginPage } from "@/components/login-form";
import { User } from "@/types";

export default async function Page() {
  const session = await auth();
  const user = session?.user as User;

  return (
    <div>
      <LoginPage user={user} />
    </div>
  );
}
