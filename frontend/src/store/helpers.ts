function formatDecimals(number: number) {
    //If decimal value is [zero] then truncate it
    //Otherwise format to 1 decimal place
    return number % 1 === 0
        ? number.toFixed(0)
        : number.toFixed(1);
}

/**
 * Format a number with appropriate suffix and 1 decimal place.
 * @param number - The number to format.
 * @returns Formatted string with a suffix (T, B, M, K) and 1 decimal place.
 */
export function formatLargeNumber(number: number) {
    let result;

    if (!number) return "";

    switch (true) {
        case number >= 1e12:
            // If value is in trillions
            result = formatDecimals((number / 1e12)) + 'T';
            break;
        case number >= 1e9:
            // If value is in billions
            result = formatDecimals((number / 1e9)) + 'B ';
            break;
        case number >= 1e6:
            // If value is in millions
            result = formatDecimals((number / 1e6)) + 'M';
            break;
        case number >= 1e3:
            // If value is in thousands
            result = formatDecimals((number / 1e3)) + 'K';
            break;
        default:
            // If it's not in thousands, millions, billions, or trillions, return the number as is
            result = number.toString();
    }

    return result;
}
