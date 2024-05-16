"use server";
import Web3 from "web3";
import yesno from "yesno";
import fetch from "node-fetch";
const chainId = 56;
const web3RpcUrl = "https://bsc-dataseed.binance.org";
const walletAddress = process.env.WALLET_ADDRESS;
const privateKey = process.env.ONE_INCH_PRIVATE_KEY;

const swapParams = {
  fromTokenAddress: "0x111111111117dc0aa78b770fa6a738034120c302", // The address of the token you want to swap from (1INCH)
  toTokenAddress: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3", // The address of the token you want to swap to (DAI)
  amount: "100000000000000000", // The amount of the fromToken you want to swap (in wei)
  fromAddress: walletAddress, // Your wallet address from which the swap will be initiated
  slippage: 1, // The maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
  disableEstimate: false, // Whether to disable estimation of swap details (set to true to disable)
  allowPartialFill: false, // Whether to allow partial filling of the swap order (set to true to allow)
};

const broadcastApiUrl =
  "https://tx-gateway.1inch.io/v1.1/" + chainId + "/broadcast";
const apiBaseUrl = "https://api.1inch.io/v5.0/" + chainId;

// Create a new instance of Web3 using the provided RPC URL
const web3 = new Web3(web3RpcUrl);

// Construct the full API request URL based on the method and query parameters
function apiRequestUrl(methodName: any, queryParams: any) {
  return (
    apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString()
  );
}

// Post a raw transaction to the 1inch API and return the transaction hash
async function broadCastRawTransaction(rawTransaction: any) {
  return fetch(broadcastApiUrl, {
    method: "post",
    body: JSON.stringify({ rawTransaction }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res: any) => {
      return res.transactionHash;
    });
}

// Sign and send a transaction using the provided private key
async function signAndSendTransaction(transaction: any) {
  const { rawTransaction } = await web3.eth.accounts.signTransaction(
    transaction,
    String(privateKey)
  );

  return await broadCastRawTransaction(rawTransaction);
}

// Prepare the transaction data for the swap by making an API request
async function buildTxForSwap(swapParams: any) {
  const url = apiRequestUrl("/swap", swapParams);

  // Fetch the swap transaction details from the API
  return fetch(url)
    .then((res) => res.json())
    .then((res: any) => res.tx);
}

// First, let's build the body of the transaction
const swap = async () => {
  const swapTransaction = await buildTxForSwap(swapParams);
  console.log("Transaction for swap: ", String(swapTransaction));
};

swap();
