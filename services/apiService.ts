/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: A service abstraction for making API calls with standardized headers, 
 * including support for JSON and FormData payloads. Handles GET, POST, and PUT 
 * requests with optional authorization tokens and customizable headers.
 */

import { getAccessToken } from "@/lib/actions";

const apiService = {
  get: async (url: string): Promise<any> => {
    const token = await getAccessToken();
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // Add Authorization header only if the token is present
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "GET",
        headers,
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  post: async (
    url: string,
    data: any,
    options?: { headers?: Record<string, string> }
  ): Promise<any> => {
    const token = await getAccessToken();
    const defaultHeaders: Record<string, string> = {
      Accept: "application/json", // Always accept JSON responses
    };

    // Add Authorization header if the token exists
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    // Determine if data is FormData and set headers accordingly
    const isFormData = data instanceof FormData;
    const headers = {
      ...defaultHeaders,
      ...(isFormData ? {} : { "Content-Type": "application/json" }), // No manual Content-Type for FormData
      ...(options?.headers || {}),
    };

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: "POST",
      body: isFormData ? data : JSON.stringify(data), // Send FormData or stringified JSON
      headers,
    }).then((response) => response.json());
  },
  put: async (
    url: string,
    data: any,
    options?: { headers?: Record<string, string> }
  ): Promise<any> => {
    const token = await getAccessToken();
    const defaultHeaders: Record<string, string> = {
      Accept: "application/json",
    };

    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const isFormData = data instanceof FormData;
    const headers = {
      ...defaultHeaders,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options?.headers || {}),
    };

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: "PUT",
      body: isFormData ? data : JSON.stringify(data),
      headers,
    }).then((response) => response.json());
  },
};

export default apiService;
