import { useCallback, useState } from "react";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    let data = null;
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      data = await response.json();
      setIsLoading(false);

      if (!data.isSuccess) setError(data.message);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong. Please try again");
      data = { isSuccess: false };
    }
    return data;
  }, []);

  return { isLoading, error, sendRequest };
};
