"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        setSubmitStatus({
          type: "error",
          message: "Server error. Please check the console for details.",
        });
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Success! Your message has been sent.",
        });
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Show the specific error message from the API
        setSubmitStatus({
          type: "error",
          message: data.error || "Error, please try again.",
        });
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: error.message || "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-black py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 shadow-2xl">
            {/* Glassmorphism glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-50" />
            
            <h2 className="relative z-10 mb-4 text-3xl font-bold text-white sm:text-4xl">
              Get In Touch
            </h2>
            <p className="relative z-10 mb-8 text-base font-medium text-gray-300">
              Have a project in mind? Let&apos;s work together to bring your ideas to life.
            </p>
            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-3 block text-sm font-medium text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-base text-white placeholder-gray-400 backdrop-blur-sm outline-none transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm font-medium text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-base text-white placeholder-gray-400 backdrop-blur-sm outline-none transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-sm font-medium text-white"
                  >
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-base text-white placeholder-gray-400 backdrop-blur-sm outline-none transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-3 block text-sm font-medium text-white"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Enter your message"
                    className="w-full resize-none rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-base text-white placeholder-gray-400 backdrop-blur-sm outline-none transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/20"
                  ></textarea>
                </div>
                {submitStatus.type && (
                  <div
                    className={`rounded-lg p-4 ${
                      submitStatus.type === "success"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-9 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
