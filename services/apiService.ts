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

  post: async (url: string, data: any): Promise<any> => {
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
        method: "POST",
        body: JSON.stringify(data),
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
};

export default apiService;
