"use server";

import axios from "axios";

const oneInchApi = axios.create({
  baseURL: "https://api.1inch.dev",
  headers: {
    accept: "application/json",
    Authorization: process.env.ONE_INCH_PRIVATE_KEY,
  },
});

export { oneInchApi };
