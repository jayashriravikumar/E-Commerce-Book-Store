import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

const Contact = () => {
  return (
    <>
      <PageTitle title="Contact Us | BookStore" />
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">

          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Contact Us
            </h1>

            <p className="text-gray-600 text-lg">
              We're here to help! Whether you have questions about books,
              orders, payments, or delivery, our support team is ready to assist.
            </p>
          </div>

          {/* Contact Info + Form */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">
                Contact Information
              </h2>

              <div className="space-y-5">

                <div>
                  <h3 className="font-semibold text-lg">
                     Location
                  </h3>
                  <p className="text-gray-600">
                    India
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                     Phone
                  </h3>
                  <p className="text-gray-600">
                    +91 98765 43210
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                     Email
                  </h3>
                  <p className="text-gray-600">
                    support@bookstore.com
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                     Address
                  </h3>
                  <p className="text-gray-600">
                    BookStore Headquarters <br />
                    Jansons Institute of Technology <br />
                    Coimbatore, Tamil Nadu, India
                  </p>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">
                Write a Message
              </h2>

              <form className="space-y-4">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 p-3 rounded-xl"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 p-3 rounded-xl"
                />

                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full border border-gray-300 p-3 rounded-xl"
                ></textarea>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Send Message
                </button>

              </form>
            </div>

          </div>

          {/* Newsletter */}
          <div className="bg-white rounded-2xl shadow-md p-8 mt-10">
            <h2 className="text-2xl font-bold mb-3">
              Stay Connected
            </h2>

            <p className="text-gray-600 mb-5">
              Join our newsletter to receive updates about new books,
              best sellers, offers, and reading recommendations.
            </p>

            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border border-gray-300 p-3 rounded-xl"
              />

              <button className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;


