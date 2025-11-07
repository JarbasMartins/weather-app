export interface LocationResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    admin1: string;
    admin1_id: number;
    admin2: string;
    admin2_id: number;
    country: string;
    country_code: string;
    country_id: number;
    population: number;
    timezone: string;
}

export interface GeocodingParams {
    name: string;
    count?: number;
    language?: string;
    format?: string;
}

export interface GeocodingResponse {
    results?: LocationResult[];
}

export interface ForecastParams {
    latitude: string;
    longitude: string;
    daily: string[];
    current: string[];
    timezone: string;
}

export interface ForecastResponse {
    current: CurrentWeatherResponse;
    daily: DailyWeatherResponse;
}

export interface CurrentWeatherResponse {
    time: string;
    interval?: number;
    temperature_2m: number;
    is_day: number | boolean;
    apparent_temperature: number;
    weather_code: number;
    cloud_cover: number;
    relative_humidity_2m: number;
}

export interface DailyWeatherResponse {
    temperature_max: number[];
    temperature_min: number[];
}

export interface SelectedCity {
    name: string;
    state: string;
    latitude: number;
    longitude: number;
}
