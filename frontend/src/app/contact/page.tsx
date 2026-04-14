"use client";

import React, { useState } from "react";
import axiosInstance from "@/lib/api/axios";
import styles from "./contact.module.scss";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const SUBJECT_MAP: Record<string, string> = {
  general: "General Inquiry",
  project: "New Project",
  quote: "Request a Quote",
  support: "Technical Support",
  careers: "Careers",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSubmitted(false);

    try {
      await axiosInstance.post("/contact", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: SUBJECT_MAP[formData.subject] || formData.subject,
        message: formData.message,
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      setError(msg);
      setTimeout(() => setError(null), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Get In Touch</span>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroDescription}>
            Have a project in mind? Our team of façade engineering experts is
            ready to bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <h3>Our Office</h3>
            <p>Elite Solutions, 140/2B, Anna Industrial Estate, Mettukuppam Road, Porur Garden Phase II, Odamangar, Vanagaram, Chennai - 600095</p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <span className="material-symbols-outlined">call</span>
            </div>
            <h3>Phone</h3>
            <p>+971 4 123 4567</p>
            <p>+971 4 765 4321</p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <span className="material-symbols-outlined">mail</span>
            </div>
            <h3>Email</h3>
            <p>info@elitefacade.com</p>
            <p>projects@elitefacade.com</p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <h3>Working Hours</h3>
            <p>Mon – Fri: 8:00 AM – 6:00 PM</p>
            <p>Sat: 9:00 AM – 1:00 PM</p>
          </div>
        </div>
      </section>

      {/* Form + Map Section */}
      <section className={styles.formSection}>
        <div className={styles.formWrapper}>
          {/* Left: Form */}
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2>Send Us a Message</h2>
              <p>
                Fill in the form below and our team will get back to you within
                24 hours.
              </p>
            </div>

            {submitted && (
              <div className={styles.successMessage}>
                <span className="material-symbols-outlined">check_circle</span>
                <p>Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            {error && (
              <div className={styles.errorMessage}>
                <span className="material-symbols-outlined">error</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option value="general">General Inquiry</option>
                    <option value="project">New Project</option>
                    <option value="quote">Request a Quote</option>
                    <option value="support">Technical Support</option>
                    <option value="careers">Careers</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us about your project or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className={styles.spinner} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="material-symbols-outlined">send</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Map */}
          <div className={styles.mapContainer}>
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8128808835895!2d80.1581058!3d13.0475796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52610060df5007%3A0xa4a2372029bfa237!2sElite%20facade%20solutions!5e0!3m2!1sen!2sin!4v1776190270201!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "16px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}