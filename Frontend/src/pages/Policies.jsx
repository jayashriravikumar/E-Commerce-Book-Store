import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  RotateCcw,
  Truck,
  ArrowRight,
} from "lucide-react";

const Policies = () => {
  const policies = [
    {
      title: "Privacy Policy",
      description:
        "Learn how we collect, store and protect your personal information.",
      path: "/privacy-policy",
      icon: <ShieldCheck size={40} />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Terms & Conditions",
      description:
        "Understand the rules and conditions governing our bookstore.",
      path: "/terms-conditions",
      icon: <FileText size={40} />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Refund & Return Policy",
      description:
        "Know our return, replacement and refund guidelines.",
      path: "/refund-policy",
      icon: <RotateCcw size={40} />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Shipping Policy",
      description:
        "View delivery timelines, shipping charges and logistics details.",
      path: "/shipping-policy",
      icon: <Truck size={40} />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-4">
            Policies & Customer Support
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Transparency and trust are important to us.
            Review our policies to understand your rights,
            responsibilities and shopping experience.
          </p>

        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {policies.map((policy) => (
            <Link
              key={policy.title}
              to={policy.path}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
            >

              <div
                className={`bg-gradient-to-r ${policy.color} p-6 text-white`}
              >
                {policy.icon}
              </div>

              <div className="p-6">

                <h2 className="text-xl font-bold mb-3 text-gray-900">
                  {policy.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {policy.description}
                </p>

                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                  View Policy
                  <ArrowRight size={18} />
                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Policies;