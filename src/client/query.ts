import { QueryOptions } from "../models/Api";

/**
 * Builds query parameters for LOTR API list endpoints.
 *
 * Supports:
 * - Pagination: limit, page, offset
 * - Sorting: sort=name:asc
 * - Filtering: Mongo-style operators (>, <, >=, !=, regex, exists)
 *
 * NOTE:
 * Single-item endpoints (e.g., /movie/{id}, /quote/{id}) do NOT support query params.
 * Only list endpoints should call this function.
 *
 * @param options Optional query options for list endpoints.
 * @returns Record<string, any> Query params to be passed to Axios.
 *
 * @example
 * buildQueryParams({
 *   limit: 10,
 *   sort: "name:asc",
 *   filter: { runtimeInMinutes: ">=160" }
 * });
 */
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