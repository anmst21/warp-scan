"use server";

import axios from "axios";

const instanse = axios.create({
  baseURL: "https://api.neynar.com/v2/farcaster",
  headers: {
    accept: "application/json",
    api_key: process.env.NEYNAR_API_KEY,
  },
});

export { instanse };
