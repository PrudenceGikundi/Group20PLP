import React from "react";
import { Video } from "@/interface"; // Import the Video type

const FeaturedVideos = ({ videos }: { videos: Video[] }) => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Featured Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{video.title}</h3>
              <a
                href={video.videoUrl}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedVideos;
