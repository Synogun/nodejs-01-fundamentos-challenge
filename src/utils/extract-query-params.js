export function extractQueryParams(query) {
    // query.replace(/(^\?)?/, "");
    return query.substr(1).split('&').reduce((queryParams, param) => {
        const [key, value] = param.split("=");

        queryParams[key] = value;
        return queryParams;
    }, {});
}