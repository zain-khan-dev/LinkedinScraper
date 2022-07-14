const URL_MAPPER = {
    
    "PEOPLE":"https://www.linkedin.com/search/results/PEOPLE/?keywords=",
    "COMPANIES":"https://www.linkedin.com/search/results/companies/?keywords="
}

export const SEARCH_DOM_NODES = {
    "PEOPLE":".entity-result__title-text > a > span > span",
    "COMPANIES":".entity-result__title-text > a"
}



export const buildURL = (type:"PEOPLE"|"COMPANIES", keyword:string) => {
    return URL_MAPPER[type] + keyword
}

