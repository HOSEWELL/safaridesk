"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: number;
  ticket: {
    id: number;
    departure: string;
    destination: string;
    date_of_departure: string;
  };
  name: string;
  phone: string;
  email: string;
}

export default function MyTicketsPage() {
  const router = useRouter();
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000";

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const email = localStorage.getItem("user_email");

    if (!token || !email) {
      router.push("/auth/login");
      return;
    }

    fetch(`${BaseUrl}/bookings/${email}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings.");
        return res.json();
      })
      .then(setBookings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [BaseUrl, router]);

  return (
    <div  id="mytickets" className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      {loading ? (
        <p>Loading your tickets...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : bookings.length === 0 ? (
        <p>You have not booked any tickets yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow-lg border rounded-xl p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Ticket #{booking.ticket.id}</span>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {booking.ticket.date_of_departure}
                </span>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {booking.ticket.departure} → {booking.ticket.destination}
                </h2>
              </div>

              <div className="text-sm text-gray-600">
                <p><span className="font-medium">Passenger:</span> {booking.name}</p>
                <p><span className="font-medium">Phone:</span> {booking.phone}</p>
                <p><span className="font-medium">Email:</span> {booking.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
