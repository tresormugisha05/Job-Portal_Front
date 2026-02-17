import React, { useState } from "react";
import PageWrapper from "../shared/layouts/PageWrapper";
import Loader from "../shared/components/ui/Loader";
import usePageLoader from "../shared/components/hooks/usePageLoader";
import {
  User,
  Mail,
  MessageSquare,
  MapPin,
  Phone,
  Printer,
  Send,
} from "lucide-react";
import PageHeader from "../shared/components/ui/PageHeader";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// Fix for default marker icon in React-Leaflet
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ContactInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  href?: string;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({
  icon,
  label,
  value,
  href,
}) => {
  const content = (
    <div className="flex gap-5 py-5 border-b border-white/15 last:border-b-0 transition-all duration-300 hover:translate-x-1.5 group cursor-pointer">
      <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-white/25 transition-all">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-xs font-normal opacity-80 mb-1.5 uppercase tracking-wider">
          {label}
        </h4>
        <p className="text-base font-medium m-0">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="text-white no-underline">
        {content}
      </a>
    );
  }

  return content;
};

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <a
    href={href}
    aria-label={label}
    className="w-11 h-11 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:bg-white hover:text-teal-600 hover:-translate-y-1"
  >
    {icon}
  </a>
);

const ContactPage: React.FC = () => {
  const isLoading = usePageLoader(1000);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const isAnimated = true;

  if (isLoading) {
    return <Loader />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (data: FormData) => {
    const errors: Record<string, string> = {};
    if (!data.name.trim()) errors.name = "Please enter your full name.";
    if (!data.email.trim()) errors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = "Please enter a valid email address.";
    if (!data.subject.trim()) errors.subject = "Please enter a subject.";
    if (!data.message.trim() || data.message.trim().length < 10)
      errors.message = "Please enter a message (at least 10 characters).";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus({ status: "submitting" });
    const errors = validate(formData);
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      setSubmitStatus({ status: "error", message: "Please fix the errors." });
      return;
    }

    try {
      // Simulate async submission (replace with real API call)
      await new Promise((res) => setTimeout(res, 900));
      setSubmitStatus({
        status: "success",
        message: "Message sent successfully.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setFormErrors({});
    } catch (err) {
      console.error(err);
      setSubmitStatus({
        status: "error",
        message: "Failed to send message. Try again.",
      });
    }
  };

  return (
    <PageWrapper disableTopPadding={true}>
      <PageHeader title="Contact Us" breadcrumb="Contact Us" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-5 py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-10 items-start">
          {/* Contact Info Card */}
          <aside className="flex flex-col gap-6">
            <div
              className={`bg-linear-to-br from-teal-600 to-teal-700 rounded-3xl p-10 text-white shadow-2xl shadow-teal-600/25 transition-all duration-700 delay-300 ${
                isAnimated
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h3
                className="font-serif text-3xl mb-2.5 relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-0.5 after:bg-white/50"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contact Info
              </h3>

              <div className="mt-6">
                <ContactInfoItem
                  icon={<MapPin size={18} />}
                  label="Location"
                  value={<>Kigali, Rwanda</>}
                />

                <ContactInfoItem
                  icon={<Mail size={18} />}
                  label="Email"
                  value="support@jobportal.com"
                  href="mailto:support@jobportal.com"
                />

                <ContactInfoItem
                  icon={<Phone size={18} />}
                  label="Phone"
                  value="+250 790900569"
                  href="tel:+250790900569"
                />

                <ContactInfoItem
                  icon={<Printer size={18} />}
                  label="Working Hours"
                  value="Mon – Fri, 8:00 AM – 5:00 PM"
                />
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-white/15">
                <SocialLink
                  href="https://www.facebook.com/"
                  label="Facebook"
                  icon={
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  }
                />
                <SocialLink
                  href="https://twitter.com/"
                  label="Twitter"
                  icon={
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  }
                />
                <SocialLink
                  href="https://pinterest.com/"
                  label="Pinterest"
                  icon={
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  }
                />
                <SocialLink
                  href="https://www.linkedin.com/"
                  label="LinkedIn"
                  icon={
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  }
                />
                <SocialLink
                  href="https://plus.google.com/"
                  label="Google Plus"
                  icon={
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7.635 10.909v2.619h4.335c-.173 1.125-1.31 3.295-4.331 3.295-2.604 0-4.731-2.16-4.731-4.823 0-2.662 2.122-4.822 4.728-4.822 1.485 0 2.479.633 3.045 1.178l2.073-1.994c-1.33-1.245-3.056-1.995-5.115-1.995C3.412 4.365 0 7.785 0 12s3.414 7.635 7.635 7.635c4.41 0 7.332-3.098 7.332-7.461 0-.501-.054-.885-.12-1.265H7.635zm16.365 0h-2.183V8.726h-2.183v2.183h-2.182v2.181h2.181v2.183h2.184v-2.183H24" />
                    </svg>
                  }
                />
              </div>
              {/* FAQ referral */}
              <div className="mt-6 text-sm opacity-90">
                <p>
                  Before contacting us, you may find answers in our{" "}
                  <a href="/faq" className="text-white underline">
                    FAQ
                  </a>
                  .
                </p>
              </div>
            </div>
          </aside>

          {/* Contact Form Card */}
          <div
            className={`bg-white rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-700 delay-300 ${
              isAnimated
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-9">
              <h2
                className="font-serif text-4xl text-slate-900 mb-2.5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Leave a Message
              </h2>
              <p className="text-slate-600 text-base">
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {submitStatus.status === "success" && (
                <div className="mb-6 rounded-md bg-green-50 border border-green-200 p-4 text-green-800">
                  {submitStatus.message}
                </div>
              )}
              {submitStatus.status === "error" && submitStatus.message && (
                <div className="mb-6 rounded-md bg-rose-50 border border-rose-200 p-4 text-rose-800">
                  {submitStatus.message}
                </div>
              )}
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-600 text-lg pointer-events-none">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    required
                    className="w-full py-4 px-5 pl-14 border-2 border-slate-200 rounded-xl font-sans text-base transition-all focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                  />
                  {formErrors.name && (
                    <p className="text-rose-600 text-sm mt-2">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-600 text-lg pointer-events-none">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email *"
                    required
                    className="w-full py-4 px-5 pl-14 border-2 border-slate-200 rounded-xl font-sans text-base transition-all focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                  />
                  {formErrors.email && (
                    <p className="text-rose-600 text-sm mt-2">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone (optional) */}
              <div className="mb-6">
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-600 text-lg pointer-events-none">
                    <Phone size={18} />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number (optional)"
                    className="w-full py-4 px-5 pl-14 border-2 border-slate-200 rounded-xl font-sans text-base transition-all focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-600 text-lg pointer-events-none">
                    <MessageSquare size={18} />
                  </span>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject *"
                    required
                    className="w-full py-4 px-5 pl-14 border-2 border-slate-200 rounded-xl font-sans text-base transition-all focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                  />
                  {formErrors.subject && (
                    <p className="text-rose-600 text-sm mt-2">
                      {formErrors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <div className="relative">
                  <span className="absolute left-5 top-9 text-teal-600 text-lg pointer-events-none">
                    <MessageSquare size={18} />
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type Your Message *"
                    required
                    rows={6}
                    className="w-full py-5 px-5 pl-14 border-2 border-slate-200 rounded-xl font-sans text-base resize-y min-h-37.5 transition-all focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                  />
                  {formErrors.message && (
                    <p className="text-rose-600 text-sm mt-2">
                      {formErrors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-linear-to-r from-rose-500 to-red-500 text-white border-none py-4 px-11 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 hover:-translate-y-0.5 active:translate-y-0 tracking-wide flex items-center gap-2 justify-center"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
};

export default ContactPage;
