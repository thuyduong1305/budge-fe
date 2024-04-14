export const formatMoney = (amount, currencySymbol = ' đ') => {
  let strAmount = amount.toString();
  let parts = strAmount
    .split('')
    .reverse()
    .join('')
    .match(/\d{1,3}/g);
  let formattedAmount = parts.join(',').split('').reverse().join('');
  formattedAmount = formattedAmount + currencySymbol;
  return formattedAmount;
};
