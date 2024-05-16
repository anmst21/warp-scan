"use client";
import { useAccount } from "wagmi";
import { getInfo } from "@/axios/neynarApi";
import { useState, useEffect } from "react";
import { setCookie, getCookie } from "@/utils/cookies";
import Button from "../btn";

export default function UserInfo() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [userInfo, setUserInfo] = useState(null);
  const getUserInfo = async (address: string) => {
    const data = await getInfo();
    setUserInfo(data);
  };

  useEffect(() => {
    getUserInfo(String(address));
  }, [address]);

  return (
    <div>
      <div>{JSON.stringify(userInfo)}</div>
      <Button callback={() => {}} name="warpcast" content="Connect" />
      <div>{!isConnecting && isDisconnected && "Connect Your Wallet"}</div>
    </div>
  );
}

interface UserProfile {
  active_status: string;
  custody_address: string;
  display_name: string;
  fid: number;
  follower_count: number;
  following_count: number;
  notes: {
    active_status: string;
  };
  object: string;
  pfp_url: string;
  power_badge: boolean;
  profile: {
    bio: {
      text: string;
    };
  };
  username: string;
  verifications: string[];
  verified_addresses: {
    eth_addresses: string[];
    sol_addresses: string[];
  };
}
