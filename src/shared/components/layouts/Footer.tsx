import {
  Bell,
  Briefcase,
  ArrowRight,
  ChevronRight,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Instagram,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0b2c3d] text-white mt-auto font-sans relative">
      {/* Newsletter Section */}
      <div className="bg-[#11354d] border-b border-[#1f4866]">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-full">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Get Jobs Notifications</h3>
              <p className="text-gray-400 text-sm">
                Free Subscribe Our Newsletter Now!
              </p>
            </div>
          </div>

          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Type your Email Address"
              className="bg-white text-gray-800 px-4 py-2 rounded-md w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
            />
            <button className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-6 py-2 rounded-md font-semibold transition-colors uppercase text-sm">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center mb-12">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-2 mb-2"
          >
            <div className="border-2 border-[#00b4d8] rounded p-1">
              <Briefcase className="w-6 h-6 text-[#00b4d8]" />
            </div>
            <span>JOB PORTAL.rw</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Who We Are */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase border-b-2 border-[#00b4d8] w-fit pb-1">
              Who We Are
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel
              velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Proin akshay handge vel velit auctor aliquet. Aenean sollicitudin,
            </p>
            <Link
              to="/about"
              className="flex items-center gap-2 text-white text-sm font-semibold hover:text-[#00b4d8] transition-colors"
            >
              <div className="bg-white/10 rounded-full p-1">
                <ArrowRight className="w-3 h-3" />
              </div>
              READ MORE
            </Link>
          </div>

          {/* For Candidate */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase border-b-2 border-[#00b4d8] w-fit pb-1">
              For Candidate
            </h4>
            <ul className="space-y-3">
              {[
                "Add a Resume",
                "Candidate Dashboard",
                "Past Applications",
                "Job Alerts",
                "Bookmarks",
                "My Account",
                "Your Jobs",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-[#00b4d8] text-sm flex items-center gap-2 transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00b4d8] group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase border-b-2 border-[#00b4d8] w-fit pb-1">
              For Employers
            </h4>
            <ul className="space-y-3">
              {[
                "Browse Candidates",
                "Employer Dashboard",
                "Add Job",
                "Job Page",
                "Job Packages",
                "Work Process",
                "My Account",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-[#00b4d8] text-sm flex items-center gap-2 transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00b4d8] group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase border-b-2 border-[#00b4d8] w-fit pb-1">
              Information
            </h4>
            <ul className="space-y-3">
              {[
                "About Us",
                "Terms & Conditions",
                "Privacy Policy",
                "Careers with Us",
                "Sitemap",
                "Contact Us",
                "FAQs",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-[#00b4d8] text-sm flex items-center gap-2 transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#00b4d8] group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#092636] py-6 border-t border-[#1f4866]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} JOB PORTAL.rw All Rights Reserved.
          </p>

          {/* Scroll to top button centered */}
          <button
            onClick={scrollToTop}
            className="absolute left-1/2 -top-10 -translate-x-1/2 bg-[#1f4866] hover:bg-[#00b4d8] text-white p-3 rounded-lg transition-colors border-2 border-[#0b2c3d]"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>{" "}
            {/* Used Linkedin as Pinterest/Google+ are less standard/icon availability */}
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
