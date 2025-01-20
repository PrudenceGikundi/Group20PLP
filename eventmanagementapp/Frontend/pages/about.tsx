import { useState, useEffect, useRef } from "react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const About = () => {
  return (
    <div className="gradient-bg min-h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center text-center py-12">
        {/* About Us Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          We are a platform dedicated to bringing people together through engaging events, learning experiences, and community building. Our mission is to make it easier for you to discover, connect, and participate in amazing events.
        </p>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-lg text-gray-600">
            EventHub was created to solve the problem of connecting people with events that align with their interests. What started as a small project has now grown into a vibrant community, where individuals can find the best events, from workshops to concerts, with ease.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mission & Vision</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="text-center w-80">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600">
                To provide an easy-to-use platform where users can discover, explore, and participate in events that fit their interests and passions.
              </p>
            </div>
            <div className="text-center w-80">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600">
                To become the leading event discovery platform that empowers people to connect, learn, and grow through shared experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="text-center w-80">
              <img
                src="\images\man1.jpg"
                alt="Team Member 1"
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold text-gray-700 mb-2">Mohamed</h3>
              <p className="text-lg text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center w-80">
              <img
                src="\images\man1.jpg"
                alt="Team Member 2"
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold text-gray-700 mb-2">victor</h3>
              <p className="text-lg text-gray-600">Co-Founder & CTO</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
