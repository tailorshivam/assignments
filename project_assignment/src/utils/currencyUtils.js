export const getCurrencySymbol = (currencyCode) => {
    const map = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      INR: "₹",
      AUD: "A$",
    };
    return map[currencyCode] || currencyCode;
  };