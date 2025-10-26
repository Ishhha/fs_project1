import { useState } from "react";

/**
 * usePagination
 * Simple pagination hook to manage paginated views or tables.
 */
export function usePagination<T>(data: T[], pageSize = 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);

  const currentData = data.slice((page - 1) * pageSize, page * pageSize);

  return {
    page,
    totalPages,
    currentData,
    next: () => setPage((p) => Math.min(p + 1, totalPages)),
    prev: () => setPage((p) => Math.max(p - 1, 1)),
    setPage,
  };
}
