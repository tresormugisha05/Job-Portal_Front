import { MapPin, Briefcase, DollarSign, Calendar, Heart } from "lucide-react";

export default function JobDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold">LOGO</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Senior Health and Food Specialist
                  </h1>
                  <p className="text-blue-600 text-lg mb-3">Pay Walt</p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> New York, USA
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" /> Full Time
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" /> $80k - $120k
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> Posted 2 days ago
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                  Media
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                  Medical
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                  Restaurants
                </span>
              </div>

              <div className="flex gap-3">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Heart className="w-4 h-4" /> Save Job
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  We are seeking an experienced Senior Health and Food
                  Specialist to join our dynamic team. This role requires a
                  passionate individual who can drive innovation in health and
                  food safety standards.
                </p>
                <h3 className="text-lg font-semibold mb-2">
                  Responsibilities:
                </h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Develop and implement health and safety protocols</li>
                  <li>Conduct regular food safety audits</li>
                  <li>Train staff on health and safety procedures</li>
                  <li>Collaborate with regulatory agencies</li>
                  <li>Monitor industry trends and best practices</li>
                </ul>
                <h3 className="text-lg font-semibold mb-2">Requirements:</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Bachelor's degree in Food Science or related field</li>
                  <li>5+ years of experience in health and food safety</li>
                  <li>Certification in food safety (HACCP preferred)</li>
                  <li>Strong analytical and problem-solving skills</li>
                  <li>Excellent communication abilities</li>
                </ul>
                <h3 className="text-lg font-semibold mb-2">What We Offer:</h3>
                <ul className="list-disc pl-6">
                  <li>Competitive salary and benefits package</li>
                  <li>Health, dental, and vision insurance</li>
                  <li>401(k) retirement plan</li>
                  <li>Professional development opportunities</li>
                  <li>Flexible work arrangements</li>
                </ul>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">About Pay Walt</h2>
              <p className="text-gray-700 mb-4">
                Pay Walt is a leading company in the health and food industry,
                dedicated to providing innovative solutions that improve food
                safety and health standards. We pride ourselves on our
                commitment to excellence and our supportive work environment.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Company Size:</span> 100-500
                  employees
                </div>
                <div>
                  <span className="font-semibold">Founded:</span> 2010
                </div>
                <div>
                  <span className="font-semibold">Industry:</span> Health & Food
                  Services
                </div>
                <div>
                  <span className="font-semibold">Location:</span> New York, USA
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Job Summary */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Job Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Type:</span>
                  <span className="font-medium">Full Time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">New York</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary:</span>
                  <span className="font-medium">$80k - $120k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">5+ years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Education:</span>
                  <span className="font-medium">Bachelor's</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span className="font-medium">2 days ago</span>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h4 className="font-medium text-gray-900 mb-1">
                    iOS Developer
                  </h4>
                  <p className="text-blue-600 text-sm mb-1">Apus Inc.</p>
                  <p className="text-gray-600 text-sm">
                    New York • $90k - $130k
                  </p>
                </div>
                <div className="border-b pb-3">
                  <h4 className="font-medium text-gray-900 mb-1">
                    Front-End Web Developer
                  </h4>
                  <p className="text-blue-600 text-sm mb-1">Envato Inc.</p>
                  <p className="text-gray-600 text-sm">India • $70k - $100k</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Medical Logo Designer
                  </h4>
                  <p className="text-blue-600 text-sm mb-1">FShop Inc.</p>
                  <p className="text-gray-600 text-sm">
                    Australia • $60k - $80k
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
