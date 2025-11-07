export const showLoadingContent = (elements: NodeListOf<any>) => {
    elements.forEach((el) => el.classList.add("loading-skeleton"));
};

export const removeLoadingContent = (elements: NodeListOf<any>) => {
    elements.forEach((el) => el.classList.remove("loading-skeleton"));
};
