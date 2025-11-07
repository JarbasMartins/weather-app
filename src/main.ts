import "./style.css";

import { searchButton } from "./script/Ui/DomElements";
import { initWeather } from "./script/services/index";
import { getCityStats } from "./script/services/forecast.service";
import type { SelectedCity } from "./types/forecast";
import { updateCityDisplay } from "./script/Ui/weatherDisplay";

searchButton?.addEventListener("click", (e) => {
    e.preventDefault();
    initWeather();
});

window.addEventListener("load", () => {
    const lastRequest = localStorage.getItem("LastRequest");
    if (!lastRequest) return;
    const parsed: SelectedCity = JSON.parse(lastRequest);
    getCityStats(parsed.latitude, parsed.longitude);
    updateCityDisplay(parsed);
});
