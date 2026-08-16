export const totalByType = (txns, type) => {
  return txns
    .filter(transaction => transaction.type === type)
    .reduce((total, { amount }) => total + amount, 0);
};

export const makeReceipts = (txns) => {
  return txns.map(({ customer, amount }) => {
    return `${customer} paid ${amount} ETB`;
  });
};