# LOTR SDK – Design Overview
## Purpose
This SDK provides a clean, typed, developer‑friendly interface for interacting with The One API (LOTR API). It wraps the raw HTTP endpoints into organized service modules, handles authentication, error handling, and query parameter construction, and exposes a simple, intuitive API surface for local testing and future packaging.

## Architecture

### 2.1 HttpClient
The HttpClient is the root of the SDK. It is responsible for:
1. Creating and configuring the Axios instance
2. Injecting the LOTR API key into the Authorization header
3. Registering response interceptors for:
    - Network errors
    - Non‑2xx API responses
4. Initializing service modules:
    - MoviesService
    - QuotesService

The client is the main entry point developers use:
- const client = new HttpClient(process.env.LOTR_API_KEY);

### 2.2 Services
Each service corresponds to a LOTR API domain:
1. MoviesService
    Handles:
    - GET /movie
    - GET /movie/{id}
    - GET /movie/{id}/quote
Supports pagination, sorting, and filtering on list endpoints.

2. QuotesService
    Handles:
    - GET /quote
    - GET /quote/{id}
Also supports pagination and filtering on list endpoints.
Services never expose Axios directly; they only return typed models.

### 2.3 Query Builder
The buildQueryParams helper constructs query parameters for list endpoints:
- Pagination: limit, page, offset
- Sorting: sort=name:asc
- Filtering: 
    - operators: =, !=, <, >, >= (TODO)
    - regex (/pattern/i)
    - exists (field)
    - not exists (!field) (TODO)

Single‑item endpoints never use query params.
This helper is internal and not exported to SDK consumers.

## 2.4 Models
The SDK defines TypeScript models for:
1. Movie
2. Quote
3. ApiResponse<T>
4. QueryOptions

These ensure strong typing and IntelliSense throughout the SDK.

### 2.5 Public API Surface
Only the following are exported:
1. HttpClient
2. MoviesService
3. QuotesService
4. Models (Movie, Quote, ApiResponse, QueryOptions)

Internal helpers and Axios configuration remain private.

### 3. Build & Packaging Strategy
The SDK is compiled using TypeScript into the dist/ directory using:
npm run build

The compiled output includes:
- JavaScript files
- TypeScript declaration files (.d.ts)

This allows local testing and prepares the SDK for future packaging.

### 4. Testing Strategy
The SDK uses:
- Mocha for test execution
- Chai for assertions
- Sinon for mocking Axios

Tests cover:
- HttpClient initialization
- Error handling via interceptors
- Service method behavior
- Query parameter building

Developers can run tests locally using:
- npm test

### 5. Example Usage
The example.ts file demonstrates:
- Initializing the client
- Fetching all movies
- Fetching a single movie
- Fetching quotes for a movie
- Filtering quotes
- Fetching a single quote

This file is intended for local testing only, not npm consumption.