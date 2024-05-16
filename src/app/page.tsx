import UserInfo from "@/components/user-info";
// import { client } from "@/features/neynar";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <UserInfo />
      </div>
    </main>
  );
}
