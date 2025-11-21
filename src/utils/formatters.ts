// format currency 
export const formatCurrency = (
    value: number,
    currency: string = 'USD',
    decimals: number = 2
): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
};

// format percentage
export const formatPercentage = (value: number): string => {
    const formatted = value.toFixed(2);
    return `${value > 0 ? '+' : ''}${formatted}%`;
};

// format large numbers
export const formatLargeNumber = (value: number): string => {
    if (value >= 1e9) return (value / 1e9).toFixed(2) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(2) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(2) + 'K';
    return value.toFixed(2);
};

// format date
export const formatDate = (date: string | number | Date): string => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(date));
};