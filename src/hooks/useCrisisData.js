import { useState } from 'react';

const useCrisisData = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (searchPhrase) => {
        setIsLoading(true);
        try {
            const apiKey = process.env.REACT_APP_BING_API_KEY;
            const apiUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(searchPhrase)}&mkt=no-NO&safeSearch=Moderate&responseFilter=Webpages,Images`;

            const headers = {
                'Ocp-Apim-Subscription-Key': apiKey,
            };

            const response = await fetch(apiUrl, { method: 'GET', headers: headers });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('An error occurred:', error);
            setError(error);
        }
        setIsLoading(false);
    };

    return { data, isLoading, error, fetchData };
};

export default useCrisisData;