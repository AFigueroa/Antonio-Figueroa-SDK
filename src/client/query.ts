import { QueryOptions } from "../models/Api";

export function buildQueryParams(options?: QueryOptions) {
    // Skip logic if options are empty
    if (!options) return {};

    // Initiate Params dictionary
    const params: Record<string, any> = {};

    // Register existing query options to the dictionary
    if (options.limit) params.limit = options.limit;
    if (options.page) params.page = options.page;
    if (options.offset) params.offset = options.offset;
    if (options.sort) params.sort = options.sort;

    if (options.filter) {
        // Loop over each filter option and register it to the dictionary
        Object.entries(options.filter).forEach(([key, value]) => {
            params[key] = value;
        });
    }

    // Return the built object
    return params;
}