"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

/*
  ─── WHY INLINE STYLES ARE USED FOR WIDTH ────────────────────────────────────
  Identical root cause as About.tsx:
  Edge on Windows carries a classic 17 px scrollbar. Every overflow-x:hidden
  ancestor subtracts that from `width:100%`. Three nested wrappers
  (ThemeProvider → page outer → page inner) compound the loss, making Tailwind's
  `container` class render visibly narrower in Edge than in Chrome.

  Inline styles bypass the cascade entirely. Edge reads them from the element's
  style attribute before any layout pass and uses the viewport width — not the
  compounded content-box — as the reference for percentage calculations.
  ─────────────────────────────────────────────────────────────────────────────
*/

const EMAILJS_SERVICE_ID  = "service_i3co2is";
const EMAILJS_TEMPLATE_ID = "template_jvifwwf";
const EMAILJS_PUBLIC_KEY  = "8TSj0kj-2cY_yk4X2";

/* ── Animation variants (unchanged) ──────────────────────────────────────── */
const fadeInDown = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const fadeInLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  },
};
const fadeInRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  },
};
const containerVariant = {
  hidden:  { opacity: 0 },
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

/* ── Shared inline-style objects ─────────────────────────────────────────── */
/**
 * Inner content container.
 * Replaces `container mx-auto px-4 sm:px-6 lg:px-8`.
 * maxWidth 1280 px matches Tailwind xl container.
 * clamp() keeps padding responsive without Tailwind responsive classes racing
 * against Edge's stylesheet parse.
 */
const innerContainer: React.CSSProperties = {
  width: "100%",
  maxWidth: "min(1440px, 100vw)",
  marginLeft: "auto",
  marginRight: "auto",
  boxSizing: "border-box",
  paddingLeft:  "clamp(1rem, 4vw, 2rem)",   /* px-4 → px-8 */
  paddingRight: "clamp(1rem, 4vw, 2rem)",
};

export default function Contact() {
  const [formData, setFormData] = useState<FormFields>({
    from_name:  "",
    from_email: "",
    subject:    "",
    message:    "",
  });
  const [loading, setLoading] = useState(false);
  const [status,  setStatus]  = useState<StatusMsg>({ text: "", type: "" });
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
      flash("Please fill in all fields", "error"); return;
    }
    if (!emailRx.test(from_email)) {
      flash("Please enter a valid email address", "error"); return;
    }

    setLoading(true);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current!, EMAILJS_PUBLIC_KEY,
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
    /*
      FIX: section gets explicit fullWidth inline style so Edge never shrinks
      it inside the three nested overflow-x:hidden ancestors.
    */
    <section className="relative overflow-hidden" style={{
  width: "100%",
  maxWidth: "100vw",
  overflowX: "clip",
  boxSizing: "border-box",
}}>
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute right-0 bottom-0 w-125 h-125
                   bg-primary/5 blur-[100px] pointer-events-none rounded-full"
      />

      {/*
        FIX: replaced `container mx-auto px-4 sm:px-6 lg:px-8` with
        an inline-style div. See comment block at the top of this file.
      */}
      <div className="relative z-10" style={innerContainer}>

        {/* ── Section header ─────────────────────────────────────────── */}
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

        {/* ── Toast notification ─────────────────────────────────────── */}
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
            {status.type === "success"
              ? <CheckCircle className="w-4 h-4 shrink-0" />
              : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{status.text}</span>
          </motion.div>
        )}

        {/*
          Two-column grid.
          FIX: `width:100%` inline so Edge measures the grid against the
          viewport width anchor set above, not the compounded content-box.
        */}
        <div
  className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 items-start w-full"
  style={{
    width: "100%",
    minWidth: 0,
  }}
>

          {/* ── Left: Contact form ─────────────────────────────────── */}
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            /*
              minWidth:0 lets the flex/grid child shrink in Edge below its
              intrinsic scroll-width (which the long placeholder text creates).
            */
            style={{ minWidth: 0 }}
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
                whileTap={!loading  ? { scale: 0.97      } : {}}
                className={`btn w-auto mx-auto sm:mx-0 text-sm px-8 py-3
                            ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                  : <><Send    className="w-4 h-4"               /> Send Message</>}
              </motion.button>
            </form>
          </motion.div>

          {/* ── Right: Map ─────────────────────────────────────────── */}
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
            style={{ minWidth: 0 }}
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
              {/*
                FIX (map image invisible in Edge):
                next/image with `style={{ minHeight }}` passes the style to
                the <img> element. In Edge, when the image hasn't loaded the
                browser ignores minHeight on a replaced element with no
                containing-block height — it collapses to 0×0 and never
                recovers.

                Solution: an explicit-height wrapper div gives the image a
                concrete containing block whose size exists in the DOM before
                the image loads. A plain <img> (instead of next/image) avoids
                WebP srcset handling differences between Edge and Chrome.
                `position:absolute; inset:0` on the <img> fills that block.
              */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: "400px",
                  display: "block",
                  boxSizing: "border-box",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/contact/addresslocation.png"
                  alt="Ikeja, Lagos location map"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

        </div>{/* end two-column grid */}
      </div>{/* end innerContainer */}
    </section>
  );
}