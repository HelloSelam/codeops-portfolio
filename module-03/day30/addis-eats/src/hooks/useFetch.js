import { useEffect, useState } from "react";

function useFetch(url, dependency) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		setLoading(true);
		setError("");

		fetch(url, {
			signal: controller.signal,
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to fetch data.");
				}

				return res.json();
			})
			.then((result) => {
				setData(result);
				setLoading(false);
			})
			.catch((err) => {
				if (err.name !== "AbortError") {
					setError(err.message);
					setLoading(false);
				}
			});

		return () => {
			controller.abort();
		};
	}, [url, dependency]);

	return { data, loading, error };
}

export default useFetch;