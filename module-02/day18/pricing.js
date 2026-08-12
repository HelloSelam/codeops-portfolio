const withVat = (amount) => {
    return amount * 1.15;
};

const format = (amount) => {
    return `${amount.toFixed(2)} ETB`;
};

export { withVat, format };