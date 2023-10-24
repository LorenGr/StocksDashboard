/**
 * Format a number with appropriate suffix and 1 decimal place.
 * @param number - The number to format.
 * @returns Formatted string with a suffix (T, B, M, K) and 1 decimal place.
 */

type FormatterReturn = (number: number) => string

export function createFormatter(): FormatterReturn {
    /**
     * Format it to 1 decimal place.
     * @param number - The number to format.
     * @returns Formatted string with 1 decimal place.
     */
    const formatDecimals = (number: number, decimalPlaces: number = 0) => number % 1 === 0
        ? number.toFixed(0)
        : number.toFixed(decimalPlaces);

    function formatLargeNumber(number: number): string {
        let result;

        if (!number) return "";
        const trunc1Decimal = (number: number) => formatDecimals(number, 1);
        const trunc2Decimal = (number: number) => formatDecimals(number, 2);

        switch (true) {
            case number >= 1e12:
                // If value is in trillions
                result = trunc1Decimal((number / 1e12)) + 'T';
                break;
            case number >= 1e9:
                // If value is in billions
                result = trunc1Decimal((number / 1e9)) + 'B ';
                break;
            case number >= 1e6:
                // If value is in millions
                result = trunc2Decimal((number / 1e6)) + 'M';
                break;
            case number >= 1e3:
                // If value is in thousands
                result = trunc2Decimal((number / 1e3)) + 'K';
                break;
            default:
                // If it's not in thousands, millions, billions, or trillions, return the number as is
                result = number.toString();
        }
        return result;
    }
    return formatLargeNumber;
}
export const formatLargeNumber = createFormatter();