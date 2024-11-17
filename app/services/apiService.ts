const apiService = {
    get: async (url: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then((json) => {
                console.log("Response: ", json);
                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    post: async (url: string, data: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then((json) => {
                console.log("Response: ", json);
                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
}

export default apiService;