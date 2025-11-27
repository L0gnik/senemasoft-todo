type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiClientOptions = {
    baseUrl: string;
    defaultHeaders?: Record<string, string>;
};

type RequestOptions = {
    headers?: Record<string, string>;
    body?: unknown;
};

export class ApiClient {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;

    constructor(options: ApiClientOptions) {
        this.baseUrl = options.baseUrl;
        this.defaultHeaders = options.defaultHeaders || {
            "Content-Type": "application/json",
        };
    }

    private buildUrl(path: string) {
        return `${this.baseUrl}${path}`;
    }

    private async request<T>(
        method: HttpMethod,
        path: string,
        options: RequestOptions = {}
    ): Promise<T> {
        const { headers, body } = options;

        const res = await fetch(this.buildUrl(path), {
            method,
            headers: { ...this.defaultHeaders, ...headers },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`HTTP ${res.status}: ${text}`);
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return res.json();
        }

        return res.text() as unknown as T;
    }

    get<T>(path: string, options?: RequestOptions) {
        return this.request<T>("GET", path, options);
    }

    post<T>(path: string, body?: unknown, options?: RequestOptions) {
        return this.request<T>("POST", path, { ...options, body });
    }

    put<T>(path: string, body?: unknown, options?: RequestOptions) {
        return this.request<T>("PUT", path, { ...options, body });
    }

    patch<T>(path: string, body?: unknown, options?: RequestOptions) {
        return this.request<T>("PATCH", path, { ...options, body });
    }

    delete<T>(path: string, options?: RequestOptions) {
        return this.request<T>("DELETE", path, options);
    }
}

export const apiClient = new ApiClient({
    baseUrl: process.env.REACT_APP_API_URL!,
});
