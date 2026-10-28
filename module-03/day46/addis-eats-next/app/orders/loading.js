export default function LoadingOrders() {
  return (
    <main aria-busy="true">
      <h1>Your Orders</h1>
      <p role="status">Loading your orders...</p>

      <table>
        <caption>Loading order records</caption>
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, index) => (
            <tr key={index}>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
