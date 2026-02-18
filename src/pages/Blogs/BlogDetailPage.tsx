import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageWrapper from "../../shared/layouts/PageWrapper";
import Loader from "../../shared/components/ui/Loader";
import usePageLoader from "../../shared/components/hooks/usePageLoader";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGoogle,
  FaPinterest,
} from "react-icons/fa";
import {
  Calendar,
  Folder,
  Tag,
  User,
  Plus,
  ChevronRight,
  Mail,
  UserIcon,
} from "lucide-react";
import PageHeader from "../../shared/components/ui/PageHeader";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  fullContent: string;
  date: string;
  category: string;
  author: string;
  image: string;
  keywords: string[];
  authorBio: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Join Team HTML Developer Pro Jobs",
    excerpt:
      "Nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mris.",
    content: "Full blog content here",
    fullContent: `Are you passionate about web development and looking to join a dynamic team? HTML Developer positions are in high demand across the tech industry. Companies are seeking skilled developers who can create responsive, accessible, and modern web applications.

In this comprehensive guide, we'll explore what it takes to become a successful HTML developer, the skills you need, and how to land your dream job in web development.

From mastering semantic HTML to understanding modern CSS frameworks and JavaScript libraries, we'll cover everything you need to know to advance your career in web development.`,
    date: "14 Dec, 2017",
    category: "IT Jobs",
    author: "Admin",
    image: "/assets/blog1.jpg",
    keywords: ["html", "developer", "web development"],
    authorBio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor lacinia tesue. Vivamus et tellus in urna faucibus porttitor. Sed auctor ut nunc..",
  },
  {
    id: 2,
    title: "Graphic Design Career Path",
    excerpt:
      "Explore the exciting world of graphic design and learn about career opportunities in the creative industry.",
    content: "Full blog content here",
    fullContent: `The world of graphic design offers endless opportunities for creative professionals. Whether you're interested in branding, web design, print media, or digital marketing, there's a path that suits your artistic vision.

Graphic design combines creativity with technical skills, requiring proficiency in design software like Adobe Creative Suite, understanding of color theory, typography, and layout principles.

This comprehensive guide will help you navigate the graphic design industry, from building a strong portfolio to finding clients and advancing your career in this competitive but rewarding field.`,
    date: "12 Dec, 2017",
    category: "Graphic Designer",
    author: "Admin",
    image: "/assets/blog2.jpg",
    keywords: ["design", "graphics", "creativity"],
    authorBio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor lacinia tesue. Vivamus et tellus in urna faucibus porttitor. Sed auctor ut nunc..",
  },
  {
    id: 3,
    title: "Senior PHP Developer – WordPress",
    excerpt:
      "The legal industry is booming with new opportunities. Learn about different legal careers and how to break into this field.",
    content: "Full blog content here",
    fullContent: `Senior PHP developers specializing in WordPress are among the most sought-after professionals in web development. With WordPress powering over 40% of all websites, the demand for skilled PHP developers continues to grow.

This role requires deep understanding of PHP programming, WordPress architecture, custom theme development, plugin creation, and database optimization. Senior developers also need leadership skills to guide development teams.

Learn about the requirements, salary expectations, and career progression opportunities for senior PHP developers in the WordPress ecosystem.`,
    date: "10 Dec, 2017",
    category: "Legal Jobs",
    author: "Admin",
    image: "/assets/blog3.jpg",
    keywords: ["php", "wordpress", "senior developer"],
    authorBio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor lacinia tesue. Vivamus et tellus in urna faucibus porttitor. Sed auctor ut nunc..",
  },
  {
    id: 4,
    title: "Trainee Web Designer, (Fresher)",
    excerpt:
      "Mainframe development is still in high demand. Discover how to start your career in mainframe programming.",
    content: "Full blog content here",
    fullContent: `Starting your career as a trainee web designer is an exciting journey into the digital creative world. This entry-level position is perfect for fresh graduates and career changers looking to break into web design.

As a trainee, you'll learn essential skills including HTML, CSS, responsive design, user experience principles, and design tools like Figma and Adobe XD. You'll work under experienced designers while building your portfolio.

Discover what employers look for in trainee web designers, how to prepare for interviews, and the learning path to advance from trainee to senior designer.`,
    date: "08 Dec, 2017",
    category: "Mainframe Jobs",
    author: "Admin",
    image: "/assets/blog4.jpg",
    keywords: ["trainee", "web designer", "fresher"],
    authorBio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor lacinia tesue. Vivamus et tellus in urna faucibus porttitor. Sed auctor ut nunc..",
  },
  {
    id: 5,
    title: "Hey Seeker, It's Time to job Now!",
    excerpt:
      "A complete guide to using the PSU job portal and finding your perfect match.",
    content: "Full blog content here",
    fullContent: `Job seekers, the market is ripe with opportunities! Whether you're a recent graduate, career changer, or looking for advancement, now is the perfect time to make your move.

The job market has evolved significantly, with remote work options, flexible schedules, and competitive benefits becoming the norm. Companies are actively seeking talented individuals across all industries.

This guide provides actionable tips for job seekers: optimizing your resume, leveraging professional networks, acing interviews, and negotiating offers. Don't wait – your dream job is out there!`,
    date: "06 Dec, 2017",
    category: "PSU Jobs",
    author: "Admin",
    image: "/assets/blog5.jpg",
    keywords: ["job seeker", "career", "opportunities"],
    authorBio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor lacinia tesue. Vivamus et tellus in urna faucibus porttitor. Sed auctor ut nunc..",
  },
  {
    id: 6,
    title: "Protection Consultant – Website",
    excerpt: "Tips and tricks for breaking into the competitive tech industry.",
    content: "Full blog content here",
    fullContent: `Website security has become a critical concern for businesses of all sizes. Protection consultants specializing in website security are in high demand as cyber threats continue to evolve.

This specialized role involves assessing website vulnerabilities, implementing security measures, monitoring for threats, and developing incident response plans. Consultants work with various technologies including firewalls, SSL certificates, and security plugins.

Explore the skills needed to become a website protection consultant, including cybersecurity knowledge, technical expertise, and client communication skills essential for success in this growing field.`,
    date: "04 Dec, 2017",
    category: "IT Jobs",
    author: "Admin",
    image: "/assets/blog6.jpg",
    keywords: ["security", "consultant", "website protection"],
    authorBio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor lacinia tesue. Vivamus et tellus in urna faucibus porttitor. Sed auctor ut nunc..",
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

interface Comment {
  id: number;
  name: string;
  email: string;
  comment: string;
  date: string;
}

export default function BlogDetailPage() {
  const isLoading = usePageLoader(1000);
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (isLoading) {
    return <Loader />;
  }

  const post = blogPosts.find((p) => p.id === parseInt(id || "0"));

  if (!post) {
    return (
      <PageWrapper>
        <div className="pt-20 p-8 text-center">
          <p className="text-gray-500 text-lg">Blog post not found.</p>
          <Link
            to="/blog"
            className="text-cyan-500 hover:text-cyan-700 mt-4 inline-block"
          >
            Back to Blog
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.comment) {
      alert("Please fill in all fields");
      return;
    }

    const newComment: Comment = {
      id: comments.length + 1,
      name: formData.name,
      email: formData.email,
      comment: formData.comment,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    setComments((prev) => [newComment, ...prev]);
    setFormData({ name: "", email: "", comment: "" });
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <PageWrapper disableTopPadding={true}>
      <PageHeader title={post.title} breadcrumb={post.category} />

      {/* Main Content */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Post Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <div className="h-96 overflow-hidden rounded-lg shadow-lg mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Post Metadata */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span className="flex items-center gap-1">
                  <Calendar size={16} className="text-red-500" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Folder size={16} className="text-red-500" /> {post.category}
                </span>
              </div>

              {/* Post Title */}
              <h1 className="text-4xl font-bold text-gray-800 mb-8">
                {post.title}
              </h1>

              {/* Post Content */}
              <div className="prose max-w-none mb-8 text-gray-700 leading-relaxed space-y-4">
                {post.fullContent.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Keywords */}
              <div className="mb-8 flex items-center gap-3 pt-4 border-t border-gray-200">
                <Tag className="text-red-500" size={20} />
                <div>
                  <span className="font-bold text-gray-800">Keywords:</span>
                  <span className="text-gray-600 ml-2">
                    {post.keywords.join(", ")}
                  </span>
                </div>
              </div>

              {/* Author Info */}
              <div className="bg-gray-50 p-6 rounded-lg mb-12 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-32 h-32 bg-gray-300 rounded-full shrink-0 flex items-center justify-center">
                    <User className="text-gray-500" size={48} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {post.author}
                    </h3>
                    <p className="text-gray-600">{post.authorBio}</p>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-200">
                <span className="text-gray-800 font-semibold">SHARE:</span>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-400 transition-colors"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-700 transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <FaGoogle size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  <FaPinterest size={20} />
                </a>
              </div>

              {/* Comments Section */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  LEAVE A COMMENT
                </h2>
                <div className="w-12 h-1 bg-cyan-500 rounded mb-6"></div>

                <p className="text-gray-600 mb-6">
                  Your email address will not be published.
                </p>

                {submitted && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    Comment submitted successfully!
                  </div>
                )}

                <form onSubmit={handleSubmitComment} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <UserIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="name"
                        placeholder="Name*"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <textarea
                    name="comment"
                    placeholder="Your Comment"
                    rows={8}
                    value={formData.comment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  ></textarea>

                  <button
                    type="submit"
                    className="bg-cyan-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    SUBMIT COMMENT
                  </button>
                </form>

                {/* Display Comments */}
                {comments.length > 0 && (
                  <div className="mt-12 space-y-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      Comments ({comments.length})
                    </h3>
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-16 bg-gray-300 rounded-full shrink-0 flex items-center justify-center">
                            <User className="text-gray-500" size={24} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800">
                              {comment.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {comment.date}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === cat.name ? null : cat.name,
                          )
                        }
                        className={`flex items-center gap-2 transition-colors ${
                          selectedCategory === cat.name
                            ? "text-cyan-600 font-semibold"
                            : "text-gray-700 hover:text-cyan-600"
                        }`}
                      >
                        <ChevronRight
                          size={16}
                          className={`${
                            selectedCategory === cat.name
                              ? "text-cyan-600"
                              : "text-gray-400"
                          }`}
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

              {/* Related Posts */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((p) => (
                    <Link
                      key={p.id}
                      to={`/blog/${p.id}`}
                      className="block p-3 bg-white rounded hover:bg-cyan-50 transition-colors"
                    >
                      <p className="text-sm font-semibold text-gray-800 hover:text-cyan-600">
                        {p.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{p.date}</p>
                    </Link>
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
