import React from "react";

const About = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#f8f9fa] via-[#eef1f6] to-[#e6ebf5] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-10 space-y-10 mt-10">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">
          About <span className="text-indigo-600">NeuraBlog</span>
        </h1>

        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
          Welcome to <span className="font-semibold text-indigo-600">NeuraBlog</span>, a modern blogging platform crafted with passion. We’re here to help writers, thinkers, and storytellers bring their ideas to life — beautifully and effortlessly.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-50 hover:shadow-md transition-shadow duration-200 border-l-4 border-indigo-600 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">🌟 Our Mission</h3>
            <p className="text-gray-600 mt-3">
              To empower creators with an elegant space where writing feels natural, expressive, and impactful.
            </p>
          </div>
          <div className="p-6 bg-gray-50 hover:shadow-md transition-shadow duration-200 border-l-4 border-indigo-600 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">🚀 Why NeuraBlog?</h3>
            <p className="text-gray-600 mt-3">
              A seamless and intuitive blogging experience — powered by modern web technologies, designed for every storyteller.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold text-gray-800">👩‍💻 Meet the Creator</h2>
          <p className="mt-3 text-gray-700 leading-relaxed max-w-2xl mx-auto">
            <span className="text-indigo-600 font-semibold">Ruchi</span>, a passionate web developer and creative thinker, envisioned NeuraBlog as a haven for expressive minds — blending tech with creativity to build a truly inspiring writing platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
