import React from "react";

const About = () => {
  return (
    <div className="relative top-6 min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About NeuraBlog</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to <span className="text-blue-600 font-semibold">NeuraBlog</span>, a platform where words come to life. Our mission is to provide a space for writers, thinkers, and creators to share their stories, insights, and experiences with the world.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-6 text-left">
          <div className="p-4 border-l-4 border-blue-600 bg-gray-50 shadow-sm rounded-md">
            <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
            <p className="text-gray-600 mt-2">
              To empower writers and bloggers by giving them a voice and a platform to connect with like-minded individuals.
            </p>
          </div>
          <div className="p-4 border-l-4 border-blue-600 bg-gray-50 shadow-sm rounded-md">
            <h3 className="text-xl font-semibold text-gray-800">Why NeuraBlog?</h3>
            <p className="text-gray-600 mt-2">
              We offer an intuitive and engaging blogging experience, enhanced by modern web technologies and a supportive community.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900">Meet the Creator</h2>
          <p className="text-gray-700 mt-2">
            <span className="text-blue-600 font-semibold">Ruchi</span>, a passionate web developer and writer, built this platform with the vision of making online storytelling seamless and enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
