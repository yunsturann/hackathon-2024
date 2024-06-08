/* 
<div className="overflow-auto contents">
  <table className="w-full border border-slate-200 overflow-auto rounded-lg shadow-lg shadow-purple-200/50">
    <thead>
      <tr className="bg-slate-400 text-white">
        <th className="border border-white text-left tracking-wide font-semibold px-3 py-2">
          Order ID
        </th>
        <th className="border border-white text-left tracking-wide font-semibold px-3 py-2">
          Adress Title
        </th>
        <th className="border border-white text-left tracking-wide font-semibold px-3 py-2">
          Quantity
        </th>
        <th className="border border-white text-left tracking-wide font-semibold px-3 py-2">
          Status
        </th>
        <th className="border border-white text-left tracking-wide font-semibold px-3 py-2">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order, index) => {
        const isEven = index % 2 === 0;
        return (
          <tr
            key={order.id}
            className={`${isEven ? "bg-white" : "bg-slate-100"}`}
          >
            <td
              className={cn("px-3 py-2 whitespace-nowrap border border-white", {
                "border-slate-100": isEven,
              })}
            >
              {order.id}
            </td>
            <td
              className={cn("px-3 py-2 whitespace-nowrap border border-white", {
                "border-slate-100": isEven,
              })}
            >
              {order.contactInfo.title}
            </td>
            <td
              className={cn("px-3 py-2 whitespace-nowrap border border-white", {
                "border-slate-100": isEven,
              })}
            >
              {order.quantity}
            </td>
            <td
              className={cn("px-3 py-2 whitespace-nowrap border border-white", {
                "border-slate-100": isEven,
                "text-green-600": order.status === "RECEIVED",
                "text-blue-600": order.status === "DELIVERED",
                "text-red-500": order.status === "CANCELLED",
              })}
            >
              {order.status}
            </td>
            <td
              className={cn("px-3 py-2 whitespace-nowrap border border-white", {
                "border-slate-100": isEven,
              })}
            >
              <Button color="red" onClick={() => handleCancel(order.id)}>
                Cancel
              </Button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>;

*/
