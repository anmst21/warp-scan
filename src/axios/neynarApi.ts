"use server";
import { instanse } from ".";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getInfo() {
  const cook = cookies();
  const wagmi = cook.get("wagmi.store");
  const dataObject = JSON.parse(wagmi?.value as string);
  const address = dataObject.state.connections.value[0][1].accounts[0];
  const { data } = await instanse.get("/user/bulk-by-address", {
    params: { addresses: String(address) },
  });
  const userProfiles: any = Object.values(data);
  const firstUserProfile = userProfiles[0][0];
  revalidatePath("/");
  return firstUserProfile;
}
