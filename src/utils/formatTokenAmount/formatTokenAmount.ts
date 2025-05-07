export function formatTokenAmount(weiAmount: bigint, decimals: number, displayDecimals: number = 2): string {
    // Convert to string for precise decimal handling
    const amountStr = weiAmount.toString();

    // Handle zero amount
    if (amountStr === '0') {
        return `0.${'0'.repeat(displayDecimals)}`;
    }

    let formattedAmount: string;

    if (amountStr.length <= decimals) {
        // Amount is less than 1 token
        const paddedStr = '0'.repeat(decimals - amountStr.length) + amountStr;
        formattedAmount = '0.' + paddedStr;
    } else {
        // Amount is at least 1 token
        const integerPart = amountStr.slice(0, amountStr.length - decimals);
        const fractionalPart = amountStr.slice(amountStr.length - decimals);
        formattedAmount = integerPart + '.' + fractionalPart;
    }

    // Convert to a number for formatting
    const num = parseFloat(formattedAmount);

    return num.toLocaleString(undefined, {
        minimumFractionDigits: displayDecimals,
        maximumFractionDigits: displayDecimals,
    });
}