"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";

interface Ticket {
  id: number;
  departure: string;
  destination: string;
  date_of_departure: string; 
}

export default function TicketsPage() {
  const router = useRouter();
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000";

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingTicketId, setBookingTicketId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [search, setSearch] = useState({ from: "", to: "" });

  // Load tickets and filter out expired ones
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    fetch(`${BaseUrl}/tickets/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Ticket[]) => {
        const today = new Date();

        // Only include future dates
        const validTickets = data.filter((ticket) => {
          const ticketDate = new Date(ticket.date_of_departure);
          return ticketDate >= today;
        });

        setTickets(validTickets);
        setFilteredTickets(validTickets);
      })
      .catch(() => setError("Failed to load tickets."))
      .finally(() => setLoading(false));
  }, [BaseUrl, router]);

  // Apply search filtering
  useEffect(() => {
    const filtered = tickets.filter(
      (ticket) =>
        ticket.departure.toLowerCase().includes(search.from.toLowerCase()) &&
        ticket.destination.toLowerCase().includes(search.to.toLowerCase())
    );
    setFilteredTickets(filtered);
  }, [search, tickets]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) {
      setBookingError("Not authenticated. Please login.");
      return;
    }

    if (!bookingTicketId) return;

    try {
      const res = await fetch(`${BaseUrl}/book/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          ticket: bookingTicketId,
          name: form.name,
          phone: form.phone,
          email: form.email,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Booking failed.");
      }

      setBookingSuccess("Ticket booked successfully!");
      setBookingError(null);
      setForm({ name: "", phone: "", email: "" });
      setBookingTicketId(null);
    } catch (err: any) {
      setBookingError(err.message);
      setBookingSuccess(null);
    }
  };

  return (
    <div id="tickets" className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Tickets</h1>

      {/* Search section */}
      <div className="flex gap-4 mb-6">
        <label className="font-medium text-gray-700">Search for a Ticket</label>
        <input
          type="text"
          placeholder="From"
          value={search.from}
          onChange={(e) => setSearch({ ...search, from: e.target.value })}
          className="border px-3 py-2 rounded w-[1/2]"
        />
        <input
          type="text"
          placeholder="To (Destination)"
          value={search.to}
          onChange={(e) => setSearch({ ...search, to: e.target.value })}
          className="border px-3 py-2 rounded w-[1/2]"
        />
      </div>

      {/* Tickets Table */}
      {loading ? (
        <p>Loading tickets...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredTickets.length === 0 ? (
        <p>No tickets found matching your search.</p>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">From</th>
              <th className="p-2">Destination</th>
              <th className="p-2">Departure Date</th>
              <th className="p-2">Book Ticket</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="border-t">
                <td className="p-2">{ticket.departure}</td>
                <td className="p-2">{ticket.destination}</td>
                <td className="p-2">{ticket.date_of_departure}</td>
                <td className="p-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => setBookingTicketId(ticket.id)}
                  >
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Booking form */}
      {bookingTicketId && (
        <div className="relative mt-8 p-6 border rounded bg-gray-50 max-w-md mx-auto">
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
            onClick={() => setBookingTicketId(null)}
            title="Close"
          >
            <FaTimes size={18} />
          </button>

          <h2 className="text-xl font-semibold mb-4">Complete Your Booking</h2>

          <form onSubmit={handleBook} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              required
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Confirm Booking
              </button>
              <button
                type="button"
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setBookingTicketId(null)}
              >
                Cancel
              </button>
            </div>
            {bookingError && <p className="text-red-600">{bookingError}</p>}
            {bookingSuccess && <p className="text-green-600">{bookingSuccess}</p>}
          </form>
        </div>
      )}
    </div>
  );
}
