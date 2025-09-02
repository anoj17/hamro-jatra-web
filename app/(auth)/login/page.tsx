import { auth } from "@/auth";
import { LoginPage } from "@/components/login-form";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  return (
    <div>
      <div>{user?.email}</div>
      <LoginPage />
    </div>
  );
}
