import React from "react";
import { Media } from "@/interface"; // Import the Media type

const LatestMedia = ({ mediaItems }: { mediaItems: Media[] }) => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Latest Media</h2>
      <div className="space-y-6">
        {mediaItems.map((media) => (
          <div key={media.id} className="flex items-center space-x-4 bg-white p-4 shadow-lg rounded-lg">
            <img src={media.image} alt={media.title} className="w-32 h-32 object-cover rounded-lg" />
            <div>
              <h3 className="text-xl font-semibold">{media.title}</h3>
              <p className="text-sm text-gray-600">{media.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestMedia;
