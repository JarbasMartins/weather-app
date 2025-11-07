import { searchInput } from "../Ui/DomElements";
import { getCoordinates } from "./geocoding.service";
import { renderCitySuggestions } from "../Ui/cityRenderer";
import { getCityStats } from "./forecast.service";
import { updateCityDisplay } from "../Ui/weatherDisplay";

export async function initWeather() {
    const city = searchInput?.value.trim();
    if (!city) return;

    const results = await getCoordinates(city);
    if (!results) return;

    renderCitySuggestions(results, (city) => {
        localStorage.setItem("LastRequest", JSON.stringify(city));
        getCityStats(city.latitude, city.longitude);
        updateCityDisplay(city);
    });
}
