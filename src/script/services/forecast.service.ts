import type { ForecastParams, ForecastResponse } from "../../types/forecast";
import { updateWeatherDisplay } from "../Ui/weatherDisplay";
import { showLoadingContent, removeLoadingContent } from "../Ui/loading";
import { loadingElements } from "../Ui/DomElements";

const FORECAST_CONFIG = {
    baseUrl: import.meta.env.VITE_API_FORECAST,
    defaultParams: {
        timezone: "auto",
        daily: ["temperature_2m_max", "temperature_2m_min"],
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "is_day",
            "cloud_cover",
            "weather_code",
        ],
    },
} as const;

function buildForecastUrl(params: ForecastParams): string {
    const searchParams = new URLSearchParams({
        latitude: params.latitude,
        longitude: params.longitude,
        timezone: params.timezone,
        daily: params.daily.join(","),
        current: params.current.join(","),
    });

    return `${FORECAST_CONFIG.baseUrl}?${searchParams.toString()}`;
}

export async function getCityStats(latitude: number, longitude: number): Promise<ForecastResponse | null> {
    showLoadingContent(loadingElements);

    const params: ForecastParams = {
        latitude: String(latitude),
        longitude: String(longitude),
        daily: [...FORECAST_CONFIG.defaultParams.daily],
        current: [...FORECAST_CONFIG.defaultParams.current],
        timezone: FORECAST_CONFIG.defaultParams.timezone,
    };

    const url = buildForecastUrl(params);

    try {
        const response = await fetch(url);
        if (!response.ok) return null;

        const data = await response.json();

        const forecastResponse: ForecastResponse = {
            current: data.current,
            daily: {
                temperature_max: data.daily.temperature_2m_max,
                temperature_min: data.daily.temperature_2m_min,
            },
        };

        updateWeatherDisplay(forecastResponse);
        return forecastResponse;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        removeLoadingContent(loadingElements);
    }
}
