import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../layouts/PageWrapper";
import Loader from "../components/ui/Loader";
import usePageLoader from "../hooks/usePageLoader";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGoogle,
  FaPinterest,
} from "react-icons/fa";
import { Calendar, Folder, Plus, ChevronRight } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Join Team HTML Developer Pro Jobs",
    excerpt:
      "Nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non ...",
    content: "Full blog content here",
    date: "14 Dec, 2017",
    category: "IT Jobs",
    author: "Admin",
    image: "/assets/blog1.jpg",
  },
  {
    id: 2,
    title: "Graphic Design Career Path",
    excerpt:
      "Explore the exciting world of graphic design and learn about career opportunities in the creative industry. This comprehensive guide covers...",
    content: "Full blog content here",
    date: "12 Dec, 2017",
    category: "Graphic Designer",
    author: "Admin",
    image: "/assets/blog2.jpg",
  },
  {
    id: 3,
    title: "Senior PHP Developer – WordPress",
    excerpt:
      "The legal industry is booming with new opportunities. Learn about different legal careers and how to break into this field...",
    content: "Full blog content here",
    date: "10 Dec, 2017",
    category: "Legal Jobs",
    author: "Admin",
    image: "/assets/blog3.jpg",
  },
  {
    id: 4,
    title: "Trainee Web Designer, (Fresher)",
    excerpt:
      "Mainframe development is still in high demand. Discover how to start your career in mainframe programming...",
    content: "Full blog content here",
    date: "08 Dec, 2017",
    category: "Mainframe Jobs",
    author: "Admin",
    image: "/assets/blog4.jpg",
  },
  {
    id: 5,
    title: "Hey Seeker, It’s Time to job Now!",
    excerpt:
      "A complete guide to using the PSU job portal and finding your perfect match...",
    content: "Full blog content here",
    date: "06 Dec, 2017",
    category: "PSU Jobs",
    author: "Admin",
    image: "/assets/blog5.jpg",
  },
  {
    id: 6,
    title: "Protection Consultant – Website",
    excerpt:
      "Tips and tricks for breaking into the competitive tech industry...",
    content: "Full blog content here",
    date: "04 Dec, 2017",
    category: "IT Jobs",
    author: "Admin",
    image: "/assets/blog6.jpg",
  },
];

const categories = [
  { name: "Graphic Designer", count: 1 },
  { name: "IT Jobs", count: 3 },
  { name: "Legal Jobs", count: 1 },
  { name: "Mainframe Jobs", count: 1 },
  { name: "PSU Jobs", count: 1 },
  { name: "Uncategorized", count: 1 },
];

export default function BlogPage() {
  const isLoading = usePageLoader(1000);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  if (isLoading) {
    return <Loader />;
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  // Reset to page 1 when filters change
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCurrentPage(1);
  };

  return (
    <PageWrapper disableTopPadding={true}>
      <PageHeader title="The Blogs" breadcrumb="The Blogs" />

      {/* Main Content */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              {paginatedPosts.length > 0 ? (
                <div className="space-y-8">
                  {paginatedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                      {/* Featured Image */}
                      <Link to={`/blog/${post.id}`}>
                        <div className="h-64 overflow-hidden bg-gray-200">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar size={16} className="text-red-500" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Folder size={16} className="text-red-500" />{" "}
                            <span className="text-cyan-500 hover:text-cyan-700">
                              {post.category}
                            </span>
                          </span>
                        </div>

                        <Link to={`/blog/${post.id}`}>
                          <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-cyan-600 transition-colors cursor-pointer">
                            {post.title}
                          </h2>
                        </Link>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Author and Share */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                              A
                            </div>
                            <span className="text-gray-700 font-semibold">
                              {post.author}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">
                              SHARE:
                            </span>
                            <a
                              href="#"
                              className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <FaFacebook size={16} />
                            </a>
                            <a
                              href="#"
                              className="text-gray-600 hover:text-blue-400 transition-colors"
                            >
                              <FaTwitter size={16} />
                            </a>
                            <a
                              href="#"
                              className="text-gray-600 hover:text-blue-700 transition-colors"
                            >
                              <FaLinkedin size={16} />
                            </a>
                            <a
                              href="#"
                              className="text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <FaGoogle size={16} />
                            </a>
                            <a
                              href="#"
                              className="text-gray-600 hover:text-red-500 transition-colors"
                            >
                              <FaPinterest size={16} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pagination */}
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-cyan-500 text-cyan-600 rounded-lg hover:bg-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
                            ? "bg-cyan-500 text-white"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          {page}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-cyan-500 text-cyan-600 rounded-lg hover:bg-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>

                  <div className="text-center text-gray-600 text-sm mt-4">
                    Page {currentPage} of {totalPages} ({filteredPosts.length}{" "}
                    posts)
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No blog posts found.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Search Box */}
              <div className="mb-8">
                <div className="bg-cyan-500 text-white p-4 rounded-t-lg font-bold">
                  Search
                </div>
                <div className="bg-white p-4 rounded-b-lg border border-gray-200">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-700"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <div className="bg-cyan-500 text-white p-4 rounded-t-lg font-bold">
                  Blog Category
                </div>
                <div className="bg-white p-4 rounded-b-lg border border-gray-200 space-y-3">
                  {categories.map((cat) => (
                    <div key={cat.name}>
                      <button
                        onClick={() => handleCategoryClick(cat.name)}
                        className={`flex items-center gap-2 transition-colors ${selectedCategory === cat.name
                          ? "text-cyan-600 font-semibold"
                          : "text-gray-700 hover:text-cyan-600"
                          }`}
                      >
                        <ChevronRight
                          size={16}
                          className={`${selectedCategory === cat.name ? "text-cyan-600" : "text-gray-400"}`}
                        />
                        <span>{cat.name}</span>
                        <span className="text-cyan-500 ml-auto font-semibold">
                          ({cat.count})
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* JobPro Sidebar */}
              <div className="mt-8 bg-linear-to-b from-[#2a3f5f] to-[#1a2f4b] text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="text-4xl font-bold text-cyan-400">
                    <span className="block">JobPro</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3">
                  Get Best Matched Jobs
                </h3>
                <p className="text-sm text-gray-300 mb-6">
                  On your Email.
                  <br />
                  Add Resume NOW!
                </p>
                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                  <Plus size={20} />
                  ADD RESUME
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
