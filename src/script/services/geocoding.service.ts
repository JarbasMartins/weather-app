import type { LocationResult, GeocodingParams, GeocodingResponse } from "../../types/Forecast";
import { isValidCityName } from "../../utils/Validators";

const GEOCODING_CONFIG = {
    baseUrl: import.meta.env.VITE_API_GEOCODING,
    defaultParams: {
        count: 5,
        language: "en",
        format: "json",
    },
} as const;

function buildGeocodingUrl(params: GeocodingParams): string {
    const searchParams = new URLSearchParams({
        name: params.name,
        count: String(params.count ?? GEOCODING_CONFIG.defaultParams.count),
        language: params.language ?? GEOCODING_CONFIG.defaultParams.language,
        format: params.format ?? GEOCODING_CONFIG.defaultParams.format,
    });

    return `${GEOCODING_CONFIG.baseUrl}?${searchParams.toString()}`;
}

export async function getCoordinates(city: string): Promise<LocationResult[] | null> {
    if (!isValidCityName) return null;

    const url = buildGeocodingUrl({ name: city });

    try {
        const response = await fetch(url);
        if (!response.ok) return null;

        const data: GeocodingResponse = await response.json();
        const results = data?.results || [];
        return results.length > 0 ? results : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
