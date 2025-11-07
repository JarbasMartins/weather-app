import { listCity, containerListCity } from "../Ui/DomElements";
import type { LocationResult, SelectedCity } from "../../types/forecast";

export function renderCitySuggestions(
    results: LocationResult[] | null,
    onCitySelected: (city: SelectedCity) => void
): void {
    if (!listCity || !containerListCity) return;

    clearCityList();
    showCityList();

    if (!results?.length) {
        renderEmptyMessage();
        return;
    }

    results.forEach((result) => {
        const li = createCityListItem(result, onCitySelected);
        if (!listCity) return;
        listCity.appendChild(li);
    });
}

function clearCityList(): void {
    if (listCity) listCity.innerHTML = "";
}

function showCityList(): void {
    containerListCity?.classList.replace("hidden", "block");
}

function hideCityList(): void {
    containerListCity?.classList.replace("block", "hidden");
}

function renderEmptyMessage(): void {
    if (!listCity) return;
    listCity.innerHTML = `
		<li class="p-2 text-gray-400">Nenhuma cidade encontrada.</li>
	`;
}

function createCityListItem(result: LocationResult, onCitySelected: (city: SelectedCity) => void): HTMLLIElement {
    const li = document.createElement("li");
    li.className = "p-2 hover:bg-[#45456f] cursor-pointer rounded-lg text-white z-50";
    li.textContent = formatCityDisplay(result);

    setDataset(li, result);

    li.addEventListener("click", () => {
        onCitySelected(extractCityData(li));
        hideCityList();
    });

    return li;
}

function formatCityDisplay(result: LocationResult): string {
    const { name, admin1, country } = result;
    return `${name}, ${admin1 || ""}, ${country}`;
}

function setDataset(el: HTMLElement, result: LocationResult): void {
    el.dataset.name = result.name;
    el.dataset.state = result.admin1 || result.admin2 || "";
    el.dataset.lat = String(result.latitude);
    el.dataset.lon = String(result.longitude);
}

function extractCityData(el: HTMLElement): SelectedCity {
    return {
        name: el.dataset.name ?? "",
        state: el.dataset.state ?? "",
        latitude: parseFloat(el.dataset.lat ?? "0"),
        longitude: parseFloat(el.dataset.lon ?? "0"),
    };
}
