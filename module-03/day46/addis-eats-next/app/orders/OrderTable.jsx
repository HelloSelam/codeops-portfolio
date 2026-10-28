import Link from "next/link";

const etb = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function OrderTable({
  orders,
  sort,
  dir,
  page,
  pages,
}) {
  function sortHref(field) {
    const nextDir = 
    sort === field && dir === "asc" ? "desc" : "asc";

  return `/orders?sort=${field}&dir=${nextDir}&page=1`;
  }

  function pageHref(nextPage) {
    return `/orders?sort=${sort}&dir=${dir}&page=${nextPage}`;
  }

  function sortDirection(field) { 
    if (sort !== field) return "none"; 
    return dir === "asc" ? "ascending" : "descending"; 
  }

return ( 
  <section> 
    <h2>Orders</h2>
    <table>
      <caption>
        Your orders, sorted by {sort} in{" "} {dir === "asc" ? "ascending" : "descending"} order.
      </caption>
      <thead>
        <tr>
          <th scope="col" aria-sort={sortDirection("id")}> 
            <Link href={sortHref("id")}>Order ID</Link>
          </th>
          <th scope="col" aria-sort={sortDirection("total")}> 
            <Link href={sortHref("total")}>Total</Link>
          </th>
          <th scope="col" aria-sort={sortDirection("status")}> 
            <Link href={sortHref("status")}>Status</Link>
          </th>
          <th scope="col" aria-sort={sortDirection("createdAt")}> 
            <Link href={sortHref("createdAt")}>Created</Link>
          </th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>
              <Link href={`/orders/${order.id}`}>
                {order.id}
              </Link>
            </td>
            <td>{etb(order.total)}</td>
            <td>{order.status}</td>
            <td>
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "Unknown"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <nav aria-label="Order pages">
      {page > 1 && (
        <Link href={pageHref(page - 1)}>Previous</Link>
      )}

      <span aria-live="polite"> {" "} Page {page} of {pages}{" "} </span>

      {page < pages && (
        <Link href={pageHref(page + 1)}>Next</Link>
      )}
    </nav>
  </section>
  );
}
