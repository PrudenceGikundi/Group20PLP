import { useRouter } from "next/router";
import { PageRouteProps } from "@/interface";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import PopularVenue from "@/components/common/PopularVenue";
import LatestMedia from "@/components/common/LatestMedia";
import FeaturedVideos from "@/components/common/FeaturedVideos";
import { Venue, Media, Video } from "@/interface"; // Importing types

export default function Home() {
  const router = useRouter();

  // Imperative routing with useRouter
  const routeToNextPage = ({ pageRoute }: PageRouteProps) => {
    router.push(pageRoute, undefined, { shallow: false });
  };

  // Sample data for Popular Venues, Latest Media, and Featured Videos
  const popularVenues: Venue[] = [
    { id: 1, name: "Venue A", location: "Location A", image: "/images/venue1.jpg" },
    { id: 2, name: "Venue B", location: "Location B", image: "/images/venue2.jpg" },
    { id: 3, name: "Venue C", location: "Location C", image: "/images/venue2.jpg" },
    { id: 4, name: "Venue D", location: "Location D", image: "/images/venue2.jpg" },
    { id: 5, name: "Venue E", location: "Location E", image: "/images/venue2.jpg" },
    { id: 6, name: "Venue F", location: "Location F", image: "/images/venue2.jpg" },
  ];

  const latestMedia: Media[] = [
    { id: 1, title: "Media A", description: "Description A", image: "/images/media1.jpg" },
    { id: 2, title: "Media B", description: "Description B", image: "/images/media2.jpg" },
    { id: 3, title: "Media B", description: "Description B", image: "/images/media2.jpg" },
    { id: 4, title: "Media B", description: "Description B", image: "/images/media2.jpg" },

  ];
 

  const featuredVideos: Video[] = [
    { id: 1, title: "Video A", videoUrl: "https://www.youtube.com/watch?v=xyz", thumbnail: "/images/video1.jpg" },
    { id: 2, title: "Video B", videoUrl: "https://www.youtube.com/watch?v=abc", thumbnail: "/images/video2.jpg" },
    { id: 2, title: "Video C", videoUrl: "https://www.youtube.com/watch?v=abc", thumbnail: "/images/video2.jpg" },
    { id: 2, title: "Video D", videoUrl: "https://www.youtube.com/watch?v=abc", thumbnail: "/images/video2.jpg" },
    { id: 2, title: "Video E", videoUrl: "https://www.youtube.com/watch?v=abc", thumbnail: "/images/video2.jpg" },
    { id: 2, title: "Video F", videoUrl: "https://www.youtube.com/watch?v=abc", thumbnail: "/images/video2.jpg" },
  ];

  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center text-center py-12">
        {/* Welcome Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to EventHub!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your one-stop platform for every event you need. Start exploring by
          navigating to our features below.
        </p>

        {/* Render Components */}
        <section className="w-full max-w-7xl mx-auto">
          <PopularVenue venues={popularVenues} />
          <LatestMedia mediaItems={latestMedia} />
          <FeaturedVideos videos={featuredVideos} />
        </section>
      </div>
      <Footer />
    </div>
  );
}
