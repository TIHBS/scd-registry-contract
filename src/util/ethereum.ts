import fetch from "node-fetch";

export async function fetchETHExchangeRate(currency: string): Promise<number> {
  const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=${currency}`);
  const responseJson = await response.json();
  return responseJson[currency];
}
