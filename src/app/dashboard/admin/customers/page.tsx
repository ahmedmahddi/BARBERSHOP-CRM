"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { mockCustomers, type Customer } from "@/lib/utils";

export default function CustomersPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const filteredCustomers = customers.filter(customer => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term) ||
      customer.phone.includes(term)
    );
  });

  const applyDiscount = (customerId: number, type: "loyalty" | "referral") => {
    toast({
      title: "Discount Applied",
      description: `${
        type === "loyalty" ? "Loyalty" : "Referral"
      } discount has been applied.`,
    });
  };

  const sendEmailCampaign = () => {
    toast({
      title: "Email Campaign Initiated",
      description:
        "Marketing emails have been queued for sending to selected customers.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-1 bg-amber-400 mr-4"></div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Customer Database
          </h2>
        </div>
        <Button
          onClick={sendEmailCampaign}
          className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-zinc-900 font-medium rounded-lg shadow-[0_0_10px_rgba(251,191,36,0.3)]"
        >
          Send Email Campaign
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex h-10 w-full max-w-sm rounded-md border border-amber-400/30 bg-zinc-800/80 px-4 py-2 text-sm text-white placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
        />
      </div>

      <div className="rounded-xl border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b border-amber-400/20">
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Contact
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Loyalty Points
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Referrals
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Total Spent
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-zinc-400">
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(customer => (
                  <tr
                    key={customer.id}
                    className="border-b border-zinc-700/50 transition-colors hover:bg-zinc-800/50"
                  >
                    <td className="p-4 align-middle font-medium">
                      {customer.name}
                    </td>
                    <td className="p-4 align-middle">
                      <div>{customer.email}</div>
                      <div className="text-zinc-400">{customer.phone}</div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="font-medium">
                        {customer.loyaltyPoints}
                      </div>
                      {customer.loyaltyPoints >= 500 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-1 h-7 px-2 text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                          onClick={() => applyDiscount(customer.id, "loyalty")}
                        >
                          Apply 10% Off
                        </Button>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="font-medium">
                        {customer.referralCount}
                      </div>
                      {customer.referralCount > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-1 h-7 px-2 text-xs border-amber-400/30 text-amber-400 hover:bg-amber-400/10 hover:text-amber-300"
                          onClick={() => applyDiscount(customer.id, "referral")}
                        >
                          Apply Referral Discount
                        </Button>
                      )}
                    </td>
                    <td className="p-4 align-middle font-medium text-amber-400">
                      ${customer.totalSpent.toFixed(2)}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex space-x-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8 px-2 text-xs border-amber-400/30 text-white hover:bg-amber-400/10"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          View History
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8 px-2 text-xs border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                          onClick={() => {
                            toast({
                              title: "Email Sent",
                              description: `A message has been sent to ${customer.name}.`,
                            });
                          }}
                        >
                          Email
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-amber-400/20 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.2)] p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Customer History
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                onClick={() => setSelectedCustomer(null)}
              >
                Close
              </Button>
            </div>

            <div className="space-y-6">
              {/* Haircut History */}
              <div>
                <h4 className="font-medium text-amber-400 mb-2">
                  Haircut History
                </h4>
                <div className="rounded-lg border border-zinc-700/50 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-800">
                      <tr className="border-b border-zinc-700/50">
                        <th className="p-2 text-left text-amber-400">Date</th>
                        <th className="p-2 text-left text-amber-400">
                          Service
                        </th>
                        <th className="p-2 text-left text-amber-400">Barber</th>
                        <th className="p-2 text-left text-amber-400">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCustomer.haircuts.map((haircut, index) => (
                        <tr key={index} className="border-t border-zinc-700/50">
                          <td className="p-2">{haircut.date}</td>
                          <td className="p-2">{haircut.service}</td>
                          <td className="p-2">{haircut.barber}</td>
                          <td className="p-2 text-amber-400">
                            ${haircut.price.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Purchase History */}
              <div>
                <h4 className="font-medium text-amber-400 mb-2">
                  Purchase History
                </h4>
                <div className="rounded-lg border border-zinc-700/50 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-800">
                      <tr className="border-b border-zinc-700/50">
                        <th className="p-2 text-left text-amber-400">Date</th>
                        <th className="p-2 text-left text-amber-400">
                          Product
                        </th>
                        <th className="p-2 text-left text-amber-400">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCustomer.purchases.map((purchase, index) => (
                        <tr key={index} className="border-t border-zinc-700/50">
                          <td className="p-2">{purchase.date}</td>
                          <td className="p-2">{purchase.product}</td>
                          <td className="p-2 text-amber-400">
                            ${purchase.price.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Loyalty Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-amber-400/20 bg-zinc-800/50 p-4">
                  <div className="text-sm text-zinc-400">Loyalty Points</div>
                  <div className="text-2xl font-bold text-white">
                    {selectedCustomer.loyaltyPoints}
                  </div>
                  {selectedCustomer.loyaltyPoints >= 500 && (
                    <div className="text-sm text-emerald-400 mt-1">
                      Eligible for 10% discount
                    </div>
                  )}
                </div>
                <div className="rounded-lg border border-amber-400/20 bg-zinc-800/50 p-4">
                  <div className="text-sm text-zinc-400">Referrals</div>
                  <div className="text-2xl font-bold text-white">
                    {selectedCustomer.referralCount}
                  </div>
                  {selectedCustomer.referralCount > 0 && (
                    <div className="text-sm text-amber-400 mt-1">
                      Referral rewards available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
