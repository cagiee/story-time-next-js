export function useNumber() {
    const numberFormat = (value: number) => {
        return Intl.NumberFormat().format(value);
    };

    return {
        numberFormat,
    };
}
