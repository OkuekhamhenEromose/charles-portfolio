"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

// ════════════════════════════════════════════════════════════════════════════
// EMAILJS SETUP GUIDE — read before changing any of the IDs below
// ════════════════════════════════════════════════════════════════════════════
//
// 1. Go to https://emailjs.com → Dashboard → Email Services
//    Connect your Gmail / Outlook account. Copy the SERVICE ID.
//
// 2. Dashboard → Email Templates → create a template.
//    In the template body use these EXACT variable names (they map to the
//    `name` attributes on your form inputs below):
//
//      {{from_name}}    ← sender's name
//      {{from_email}}   ← sender's email  (set this as "Reply-To" in the
//                          template "Reply To" field so you can reply
//                          directly to the submitter from your inbox)
//      {{subject}}      ← message subject
//      {{message}}      ← message body
//
//    Example template body:
//      You received a new message from {{from_name}} ({{from_email}}).
//      Subject: {{subject}}
//      ---
//      {{message}}
//
// 3. Dashboard → Account → Public Key. Copy it.
//
// 4. Paste all three values into the constants below.
//    Do NOT commit real keys to a public repo — use .env.local:
//      NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
//      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
//      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
//    Then reference them as process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID etc.
//
// ════════════════════════════════════════════════════════════════════════════
const EMAILJS_SERVICE_ID  = "service_i3co2is";
const EMAILJS_TEMPLATE_ID = "template_jvifwwf";
const EMAILJS_PUBLIC_KEY  = "8TSj0kj-2cY_yk4X2";

const fadeInDown = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

interface FormFields {
  from_name:  string;
  from_email: string;
  subject:    string;
  message:    string;
}

interface StatusMsg {
  text: string;
  type: "success" | "error" | "";
}

export default function Contact() {
  const [formData, setFormData] = useState<FormFields>({
    from_name:  "",
    from_email: "",
    subject:    "",
    message:    "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus]   = useState<StatusMsg>({ text: "", type: "" });
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const flash = (text: string, type: "success" | "error") => {
    setStatus({ text, type });
    setTimeout(() => setStatus({ text: "", type: "" }), 5000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { from_name, from_email, subject, message } = formData;
    const emailRx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!from_name || !from_email || !subject || !message) {
      flash("Please fill in all fields", "error");
      return;
    }
    if (!emailRx.test(from_email)) {
      flash("Please enter a valid email address", "error");
      return;
    }

    setLoading(true);
    try {
      // ── sendForm reads form input `name` attributes and maps them to
      //    EmailJS template variables automatically. ──────────────────────
      // WHY sendForm instead of send():
      //   sendForm(serviceId, templateId, formElement, publicKey) reads the
      //   HTML form's `name` attributes directly — no manual object needed.
      //   This is the most reliable approach because EmailJS sees exactly
      //   what the template expects, with no key-mismatch risk.
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY,
      );
      flash("Message sent successfully! 🎉", "success");
      setFormData({ from_name: "", from_email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      flash("Failed to send. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute right-0 bottom-0 w-125 h-125
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

        {/* Toast notification */}
        {status.text && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed top-24 right-4 z-50 px-4 py-3 rounded-xl shadow-xl
                        flex items-center gap-2.5 text-sm font-semibold max-w-sm
                        ${status.type === "success"
                          ? "bg-emerald-500/95 text-white"
                          : "bg-red-500/95 text-white"}`}
          >
            {status.type === "success" ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
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
            <motion.h3 variants={fadeInDown} className="font-heading text-2xl font-bold text-foreground mb-2">
              Send a Message
            </motion.h3>
            <motion.p variants={fadeInDown} className="text-muted-foreground text-sm mb-6">
              I&apos;m a Software Engineer driven by innovation and results.
            </motion.p>

            {/* ══════════════════════════════════════════════════════════════
                FORM — input `name` attributes MUST match your EmailJS template
                variable names exactly (see the setup guide at the top).

                  name="from_name"   → {{from_name}}  in template
                  name="from_email"  → {{from_email}} in template (+ Reply-To)
                  name="subject"     → {{subject}}    in template
                  name="message"     → {{message}}    in template
            ══════════════════════════════════════════════════════════════ */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <motion.input
                type="text"
                name="from_name"
                placeholder="Full Name"
                value={formData.from_name}
                onChange={handleChange}
                required
                variants={fadeInLeft}
                className="contact-input"
              />

              <motion.input
                type="email"
                name="from_email"
                placeholder="Email Address"
                value={formData.from_email}
                onChange={handleChange}
                required
                variants={fadeInLeft}
                className="contact-input"
              />

              <motion.input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                variants={fadeInLeft}
                className="contact-input"
              />

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
                className={`btn w-auto mx-auto sm:mx-0 text-sm px-8 py-3
                            ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* ── Map + Info ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <motion.h3 variants={fadeInDown} className="font-heading text-2xl font-bold text-foreground">
              Find Me Here
            </motion.h3>

            <motion.div
              variants={fadeInRight}
              className="rounded-2xl overflow-hidden border border-border shadow-lg"
            >
              <Image
                src="/images/contact/addresslocation.png"
                alt="Ikeja, Lagos location map"
                width={600}
                height={600}
                className="w-full object-cover"
                style={{ minHeight: 400 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}