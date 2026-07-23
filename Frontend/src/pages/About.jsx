import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

const About = () => {
  return (
    <>
      <PageTitle title="About Us | BookStore" />
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">

          <div className="bg-white rounded-2xl shadow-md p-8">

            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Welcome to BookStore
            </h1>

            <p className="text-gray-700 leading-8 mb-6">
              BookStore is a modern online platform dedicated to bringing books
              closer to readers across the country. Our mission is to make
              quality books accessible, affordable, and convenient for students,
              professionals, and book enthusiasts.
            </p>

            <p className="text-gray-700 leading-8 mb-10">
              Founded with a passion for learning and knowledge sharing,
              BookStore offers a wide collection of books across multiple
              categories including Fiction, Non-Fiction, Self-Help,
              Technology, Business, Finance, Classic Literature,
              Academic Resources, and more.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-blue-700">
              Our Vision
            </h2>

            <p className="text-gray-700 leading-8 mb-8">
              To become the most trusted online bookstore by promoting reading,
              learning, and lifelong education through easy access to quality books.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-blue-700">
              Our Mission
            </h2>

            <p className="text-gray-700 leading-8 mb-4">
              Our mission is to provide readers with a diverse collection of
              books at competitive prices while delivering an exceptional
              shopping experience through technology, reliability, and customer
              satisfaction.
            </p>

            <ul className="list-disc pl-6 text-gray-700 mb-10 space-y-2">
              <li>Make books accessible to everyone.</li>
              <li>Support continuous learning and personal growth.</li>
              <li>Provide a secure and user-friendly online platform.</li>
              <li>Deliver books efficiently and reliably.</li>
              <li>Encourage a culture of reading and knowledge sharing.</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-blue-700">
              What We Offer
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">

              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-bold text-xl mb-2">
                  Fiction Books
                </h3>
                <p>
                  Explore captivating stories, novels, mysteries,
                  fantasy adventures, and literary classics.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-bold text-xl mb-2">
                  Non-Fiction Books
                </h3>
                <p>
                  Discover books on history, science, biographies,
                  psychology, and personal development.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-bold text-xl mb-2">
                  Self-Help Books
                </h3>
                <p>
                  Improve productivity, communication skills,
                  habits, and personal growth.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-bold text-xl mb-2">
                  Technology Books
                </h3>
                <p>
                  Learn programming, AI, Data Science,
                  Cloud Computing, and Web Development.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-bold text-xl mb-2">
                  Business & Finance
                </h3>
                <p>
                  Learn investing, entrepreneurship,
                  leadership, and financial planning.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-bold text-xl mb-2">
                  Academic Resources
                </h3>
                <p>
                  Access textbooks, exam guides,
                  and educational resources.
                </p>
              </div>

            </div>

            <h2 className="text-3xl font-bold mb-4 text-blue-700">
              Why Choose BookStore?
            </h2>

            <ul className="list-disc pl-6 text-gray-700 mb-10 space-y-2">
              <li>Wide range of book categories</li>
              <li>Secure online shopping experience</li>
              <li>Fast and reliable order processing</li>
              <li>Easy search and filtering options</li>
              <li>Customer reviews and ratings</li>
              <li>Affordable pricing and special offers</li>
              <li>User-friendly interface</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4 text-blue-700">
              Our Commitment
            </h2>

            <p className="text-gray-700 leading-8">
              At BookStore, we believe that books have the power to transform
              lives. Every book purchased is an investment in knowledge,
              creativity, and personal development. We are committed to helping
              readers discover books that inspire, educate, and entertain.
            </p>

            <p className="mt-6 text-lg font-semibold text-center text-blue-700">
              Thank you for choosing BookStore as your trusted reading companion.
            </p>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;

