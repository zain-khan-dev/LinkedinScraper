"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildURL = exports.SEARCH_DOM_NODES = void 0;
const URL_MAPPER = {
    "PEOPLE": "https://www.linkedin.com/search/results/PEOPLE/?keywords=",
    "COMPANIES": "https://www.linkedin.com/search/results/companies/?keywords="
};
exports.SEARCH_DOM_NODES = {
    "PEOPLE": ".entity-result__title-text > a > span > span",
    "COMPANIES": ".entity-result__title-text > a"
};
const buildURL = (type, keyword) => {
    return URL_MAPPER[type] + keyword;
};
exports.buildURL = buildURL;
