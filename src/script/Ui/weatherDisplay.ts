import {
    todayTemp,
    todayDescription,
    todayTitleCity,
    todayIcon,
    todayTitleState,
    infoDescription,
    dailyElements,
} from "./DomElements";
import { formatDateTime } from "../../utils/Validators";
import type { SelectedCity, ForecastResponse } from "../../types/Forecast";
import { getWeatherDescription } from "../../utils/weatherMap";

export const formatTemp = (value: number | undefined): string => (value !== undefined ? `${Math.round(value)}°` : "—");

export function updateCityDisplay(city: SelectedCity): void {
    todayTitleCity!.textContent = city.name;
    todayTitleState!.textContent = city.state;
}

export function updateWeatherDisplay(weather: ForecastResponse): void {
    const { current } = weather;

    todayTemp!.textContent = `${Math.round(current.temperature_2m)}°`;
    todayDescription!.textContent = formatDateTime(current.time);
    todayIcon!.textContent = current.is_day ? "☀️" : "🌙";

    updateAdditionalInfo(infoDescription, current);
    updateDailyForecast(dailyElements, weather);
}

function updateAdditionalInfo(elements: NodeListOf<HTMLParagraphElement>, data: ForecastResponse["current"]): void {
    const info = [
        `${Math.round(data.apparent_temperature)}°C`,
        `${data.relative_humidity_2m}%`,
        `${data.cloud_cover}%`,
        getWeatherDescription(data.weather_code),
    ];

    elements.forEach((element, i) => {
        element.textContent = info[i] ?? "—";
    });
}

function updateDailyForecast(cards: NodeListOf<HTMLDivElement>, weather: ForecastResponse): void {
    cards.forEach((card, i) => {
        const max = card.querySelector(".container-temperature span:first-child")!;
        const min = card.querySelector(".container-temperature span:last-child")!;
        max.textContent = formatTemp(weather.daily.temperature_max[i]);
        min.textContent = formatTemp(weather.daily.temperature_min[i]);
    });
}
