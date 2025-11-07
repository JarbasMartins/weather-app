export function formatDateTime(isoString: string): string {
    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];

    return isoString.replace(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/, (match, year, month, day, hours, minutes) => {
        const monthName = months[parseInt(month) - 1];
        return `${monthName} ${parseInt(day)}, ${year} - ${hours}:${minutes}`;
    });
}

export function isValidCityName(city: string | undefined): city is string {
    return typeof city === "string" && city.trim().length > 0;
}
