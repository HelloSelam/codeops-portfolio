"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import DishGrid from "../../components/DishGrid";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const page = Math.max(
    1,
    Number.parseInt(searchParams.get("page") || "1", 10) || 1
  );

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");


  useEffect(() => {
    setSearch(urlSearch);
    setDebouncedSearch(urlSearch);
    }, [urlSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextSearch = search.trim();
      setDebouncedSearch(nextSearch);

      const params = new URLSearchParams(window.location.search);

      if (nextSearch) {
        params.set("search", nextSearch);
      } else {
        params.delete("search");
      }

      params.delete("page");

      const query = params.toString();
      const nextUrl = query ? `/menu?${query}` : "/menu";

      router.replace(nextUrl, { scroll: false });
    }, 400);

    return () => clearTimeout(timer);
  }, [search, router]);


  const queryKey = debouncedSearch
    ? `/api/dishes?search=${encodeURIComponent(debouncedSearch)}&page=${page}`
    : null;

  const { data, error, isLoading, isValidating } = useSWR(
    queryKey,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  function changePage(nextPage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));

    router.push(`/menu?${params.toString()}`, { scroll: false });
  }


  return (
    <section>
      <label htmlFor="dish-search">Search dishes</label>

      <input
        id="dish-search"
        type="search"
        placeholder="Try Doro Wat..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {!debouncedSearch ? (
        <p>Enter a dish name to search.</p>
      ) : error ? (
        <p role="alert">Unable to load dishes. Please try again.</p>
      ) : (
        <>
          {isLoading && !data && <p>Searching dishes...</p>}

          {isValidating && data && <p>Updating results...</p>}

          {data && (
            <>
              <DishGrid dishes={data.dishes} />

              <p>
                Page {data.page} of {data.totalPages || 1}
                {" · "}
                {data.totalDishes} dishes found
              </p>

              <div className="pagination">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => changePage(page - 1)}
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={!data || page >= data.totalPages}
                  onClick={() => changePage(page + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </section>

  );
}