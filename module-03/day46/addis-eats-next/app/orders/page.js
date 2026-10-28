import { requireAuth } from "../../lib/auth";
import { getOrdersFor } from "../../db";
import { signOut } from "../action";
import OrderTable from "./OrderTable";

const PAGE_SIZE = 5; 
const SORT_FIELDS = ["id", "total", "status", "createdAt"];

export default async function OrdersPage({ searchParams }) {
  const session = await requireAuth();
  const allOrders = await getOrdersFor(session.userId); 
  const params = await searchParams; 

  const sort = SORT_FIELDS.includes(params?.sort) 
    ? params.sort 
    : "createdAt"; 
  
  const dir = params?.dir === "asc" ? "asc" : "desc"; 
  
  const sortedOrders = [...allOrders].sort((a, b) => { 
    let comparison; 
    if (sort === "total") { 
      comparison = Number(a.total || 0) - Number(b.total || 0); 
    } else if (sort === "createdAt") { 
      comparison = 
      new Date(a.createdAt || 0).getTime() - 
      new Date(b.createdAt || 0).getTime(); 
    } else { 
      comparison = String(a[sort] || "").localeCompare( 
        String(b[sort] || "") 
      ); 
    } 
    
    return dir === "asc" ? comparison : -comparison; 
  }); 
  
  const pages = Math.max(1, Math.ceil(sortedOrders.length / PAGE_SIZE)); 
  const requestedPage = Number(params?.page || 1); 
  const page = Number.isInteger(requestedPage) 
    ? Math.min(Math.max(requestedPage, 1), pages) 
    : 1; 
  
  const pageOrders = sortedOrders.slice( 
    (page - 1) * PAGE_SIZE, 
    page * PAGE_SIZE 
  );
  

  return (
    <main>
      <h1>Your Orders</h1>

      <p>Signed in as {session.email}</p>

      <form action={signOut}>
        <button type="submit">Sign Out</button>
      </form>

      {allOrders.length === 0 ? (
        <section> 
          <h2>No orders yet</h2> 
          <p>You haven't placed any orders yet.</p> 
        </section>
      ) : (
        <OrderTable 
          orders={pageOrders} 
          sort={sort} 
          dir={dir} page={page} 
          pages={pages} 
        />
      )}
    </main>
  );
}