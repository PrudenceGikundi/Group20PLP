import React from "react";
import { Venue } from "@/Frontend/interface"; // Import the Venue type

const PopularVenue = ({ venues }: { venues: Venue[] }) => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Popular Venues</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={venue.image} alt={venue.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{venue.name}</h3>
              <p className="text-sm text-gray-600">{venue.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularVenue;
