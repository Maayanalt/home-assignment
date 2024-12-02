export function convertPriceToNumber(priceInString: string | null): number {
  const parts = priceInString?.split(" ");
  const numericPart = parts ? parts[0] : "0";
  const lastPrice = parseFloat(numericPart);

  return lastPrice;
}
