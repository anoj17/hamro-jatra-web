import { auth } from "@/auth";
import { LoginPage } from "@/components/login-form";
import { User } from "@/lib/type";

export default async function Page() {
  const session = await auth();
  const user = session?.user as User;

  console.log({ user });

  return (
    <div>
      <LoginPage user={user} />
    </div>
  );
}
