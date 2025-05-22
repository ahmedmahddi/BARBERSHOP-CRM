"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  mockOrders,
  mockProducts,
  type Order,
  type OrderStatus,
} from "@/lib/utils";

export default function OrdersPage() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleUpdateStatus = (id: number, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );

    toast({
      title: "Order Status Updated",
      description: `Order #${id} status has been updated to ${newStatus}.`,
    });
  };

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-blue-500/20 text-blue-400";
      case "processing":
        return "bg-amber-500/20 text-amber-400";
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getProductImage = (productId: number) => {
    const product = mockProducts.find(p => p.id === productId);
    return product?.image || "/images/products/pomade.svg"; // Fallback image
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <div className="w-8 h-1 bg-amber-400 mr-4"></div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Customer Orders
          </h2>
        </div>
      </div>

      <div className="rounded-xl border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-[0_0_15px_rgba(251,191,36,0.15)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-amber-400/20">
                <th className="px-4 py-3 text-left text-sm font-medium text-amber-400">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-amber-400">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-amber-400">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-amber-400">
                  Products
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-amber-400">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-amber-400">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-amber-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr
                  key={order.id}
                  className="border-b border-zinc-700/40 hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-zinc-300">
                    #{order.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-300">
                    <div>{order.customerName}</div>
                    <div className="text-xs text-zinc-400">{order.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-300">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-300 max-w-[200px] group relative">
                    <div className="flex flex-col">
                      {order.items.length > 2 ? (
                        <>
                          <div className="truncate">
                            {order.items[0].quantity}x{" "}
                            {order.items[0].productName}
                          </div>
                          <div className="truncate">
                            {order.items[1].quantity}x{" "}
                            {order.items[1].productName}
                          </div>
                          <div className="text-xs text-zinc-400">
                            +{order.items.length - 2} more
                          </div>

                          {/* Tooltip */}
                          <div className="absolute left-0 top-full mt-2 z-50 w-72 bg-zinc-800 border border-amber-400/20 rounded-md shadow-lg p-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <h4 className="text-xs font-medium text-amber-400 mb-2">
                              All Products
                            </h4>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="text-sm text-zinc-300"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="h-8 w-8 relative rounded-sm overflow-hidden bg-zinc-800 flex-shrink-0">
                                      <Image
                                        src={getProductImage(item.productId)}
                                        alt={item.productName}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <span className="truncate">
                                      {item.productName}
                                    </span>
                                  </div>
                                  <div className="flex justify-between pl-10">
                                    <span className="text-xs text-zinc-400">
                                      {item.quantity}x ${item.price.toFixed(2)}
                                    </span>
                                    <span className="text-amber-400">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        order.items.map((item, idx) => (
                          <div key={idx} className="truncate">
                            {item.quantity}x {item.productName}
                          </div>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-amber-400">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                        onClick={() => handleViewOrder(order)}
                      >
                        View
                      </Button>
                      <select
                        value={order.status}
                        onChange={e =>
                          handleUpdateStatus(
                            order.id,
                            e.target.value as OrderStatus
                          )
                        }
                        className="h-8 rounded-md border border-amber-400/30 bg-zinc-800/80 px-2 text-xs text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {isDetailsOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-amber-400/20 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.2)] p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Order #{selectedOrder.id} Details
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="border-amber-400/30 text-zinc-300 hover:bg-zinc-800"
                onClick={() => setIsDetailsOpen(false)}
              >
                Close
              </Button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-amber-400">
                    Customer Information
                  </h4>
                  <p className="text-sm text-zinc-300">
                    Name: {selectedOrder.customerName}
                  </p>
                  <p className="text-sm text-zinc-300">
                    Email: {selectedOrder.email}
                  </p>
                  <p className="text-sm text-zinc-300">
                    Order Date: {formatDate(selectedOrder.date)}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-amber-400">
                    Order Status
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() +
                        selectedOrder.status.slice(1)}
                    </span>
                    <select
                      value={selectedOrder.status}
                      onChange={e =>
                        handleUpdateStatus(
                          selectedOrder.id,
                          e.target.value as OrderStatus
                        )
                      }
                      className="h-8 rounded-md border border-amber-400/30 bg-zinc-800/80 px-2 text-xs text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-amber-400 mb-2">
                  Order Items
                </h4>
                <div className="bg-zinc-800/50 rounded-lg border border-amber-400/10 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-amber-400/20">
                        <th className="px-4 py-2 text-left text-xs font-medium text-amber-400">
                          Product
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-amber-400">
                          Price
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-amber-400">
                          Qty
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-amber-400">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-zinc-700/40 last:border-b-0"
                        >
                          <td className="px-4 py-2 text-sm text-zinc-300">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 relative rounded-md overflow-hidden bg-zinc-800 flex-shrink-0">
                                <Image
                                  src={getProductImage(item.productId)}
                                  alt={item.productName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span>{item.productName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-sm text-zinc-300 text-right">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-2 text-sm text-zinc-300 text-right">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-2 text-sm text-zinc-300 text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-amber-400/20 bg-zinc-800/80">
                        <td
                          colSpan={3}
                          className="px-4 py-2 text-sm font-medium text-amber-400 text-right"
                        >
                          Total Amount:
                        </td>
                        <td className="px-4 py-2 text-sm font-bold text-amber-400 text-right">
                          ${selectedOrder.totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
