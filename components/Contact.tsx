"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const fadeInDown = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface StatusMsg {
  text: string;
  type: "success" | "error" | "";
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusMsg>({ text: "", type: "" });
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const flash = (text: string, type: "success" | "error") => {
    setStatus({ text, type });
    setTimeout(() => setStatus({ text: "", type: "" }), 5000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const emailRx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!name || !email || !subject || !message) {
      flash("Please fill in all fields", "error");
      return;
    }
    if (!emailRx.test(email)) {
      flash("Please enter a valid email address", "error");
      return;
    }

    setLoading(true);
    try {
      await emailjs.sendForm(
        "service_i3co2is",   // ← your EmailJS service ID
        "template_jvifwwf",  // ← your EmailJS template ID
        formRef.current!,
        "8TSj0kj-2cY_yk4X2"  // ← your EmailJS public key
      );
      flash("Message sent successfully! 🎉", "success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      flash("Failed to send. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div
        aria-hidden
        className="absolute right-0 bottom-0 w-[500px] h-[500px]
                   bg-primary/5 blur-[100px] pointer-events-none rounded-full"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag mb-4 inline-flex">Get In Touch</span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-foreground mt-4">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base">
            Open to new opportunities where I can add value and grow. Drop a
            message and I&apos;ll get back within 24 hours.
          </p>
        </motion.div>

        {/* Toast */}
        {status.text && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed top-24 right-4 z-50 px-4 py-3 rounded-xl shadow-xl
                        flex items-center gap-2.5 text-sm font-semibold max-w-sm
                        ${status.type === "success"
                          ? "bg-emerald-500/95 text-white"
                          : "bg-red-500/95 text-white"
                        }`}
          >
            {status.type === "success" ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{status.text}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* ── Form ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              variants={fadeInDown}
              className="font-heading text-2xl font-bold text-foreground mb-2"
            >
              Send a Message
            </motion.h3>
            <motion.p
              variants={fadeInDown}
              className="text-muted-foreground text-sm mb-6"
            >
              I&apos;m a Software Engineer driven by innovation and results.
            </motion.p>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {(
                [
                  { id: "name", placeholder: "Full Name", type: "text" },
                  { id: "email", placeholder: "Email Address", type: "email" },
                  { id: "subject", placeholder: "Subject", type: "text" },
                ] as const
              ).map((field) => (
                <motion.input
                  key={field.id}
                  type={field.type}
                  name={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required
                  variants={fadeInLeft}
                  className="contact-input"
                />
              ))}

              <motion.textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                variants={fadeInLeft}
                className="contact-input resize-none"
              />

              <motion.button
                type="submit"
                disabled={loading}
                variants={fadeInLeft}
                whileHover={!loading ? { scale: 1.03, x: 4 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
                className={`btn w-full sm:w-auto text-sm px-8 py-3 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* ── Map + info ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <motion.h3
              variants={fadeInDown}
              className="font-heading text-2xl font-bold text-foreground"
            >
              Find Me Here
            </motion.h3>

            <motion.div
              variants={fadeInRight}
              className="rounded-2xl overflow-hidden border border-border shadow-lg"
            >
              <Image
                src="/images/addresslocation.png"
                alt="Ikeja, Lagos location map"
                width={600}
                height={400}
                className="w-full object-cover"
                style={{ minHeight: 300 }}
              />
            </motion.div>

            <motion.div variants={fadeInRight} className="glass-card p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground mb-0.5">
                    My Location
                  </h4>
                  <p className="text-sm text-foreground/80">
                    Ikeja, Lagos State, Nigeria
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Accessible via major highways and public transportation
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick contacts */}
            <motion.div
              variants={fadeInRight}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { label: "Email", value: "charles@example.com" },
                { label: "Response time", value: "Within 24 hrs" },
                { label: "Location", value: "Lagos, Nigeria" },
                { label: "Status", value: "Open to work 🟢" },
              ].map((item) => (
                <div key={item.label} className="glass-card p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground font-medium">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}