import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  subscribeNewsletter,
  clearNewsletterState,
} from "../features/newsletter/newsletterSlice";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { loading, success, error, message } = useSelector(
    (state) => state.newsletter
  );

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    dispatch(subscribeNewsletter(email));
  };

  useEffect(() => {
    if (success) {
      toast.success(message);
      setEmail("");
      dispatch(clearNewsletterState());
    }

    if (error) {
      toast.error(error);
      dispatch(clearNewsletterState());
    }
  }, [success, error, message, dispatch]);

  return (
    <section className="max-w-6xl mx-auto my-12 bg-gray-100 rounded-xl p-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3">
          📚 Subscribe to our Newsletter
        </h2>

        <p className="text-gray-600 mb-6">
          Stay updated with new arrivals, exclusive discounts and special
          offers.
        </p>

        <form
          onSubmit={submitHandler}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-3 w-full md:w-96 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;