import PageWrapper from "../layouts/PageWrapper";

export default function HomePage() {
  return (
    <PageWrapper>
      <section className="relative bg-[#0b2c3d] text-white pt-20">
        <div className="max-w-7xl mx-auto py-20 px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            3,000+ Browse Jobs
          </h2>
          <p className="mb-8">Find Jobs, Employment & Career Opportunities</p>

          <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row gap-3 text-black shadow-lg">
            <input
              className="flex-1 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Keywords"
            />
            <select className="p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Regions</option>
            </select>
            <select className="p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Choose Category</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>

          <p className="mt-4 text-sm">
            Trending Keywords: developer, design, media, marketing
          </p>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-6 text-center px-4">
          <div>Developer</div>
          <div>Technology</div>
          <div>Accounting</div>
          <div>Medical</div>
          <div>Government</div>
          <div>Restaurant</div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold mb-6">Top Hiring Companies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              Envato
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              PayPal
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              Amazon
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              Google
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold mb-6">Recent Jobs</h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow gap-3">
              <div>
                <h4 className="font-semibold text-lg">Senior UI Designer</h4>
                <p className="text-gray-600">Google · Full Time · $3k–$5k</p>
              </div>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors w-fit">
                Apply
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow gap-3">
              <div>
                <h4 className="font-semibold text-lg">Backend Developer</h4>
                <p className="text-gray-600">Amazon · Part Time · $2k–$4k</p>
              </div>
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors w-fit">
                Apply
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <div className="bg-blue-600 text-white p-8 rounded">
            <h3 className="text-xl font-bold">I'm an Employer</h3>
            <p className="my-3">Post jobs and find talents</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded">
              Register As Company
            </button>
          </div>
          <div className="bg-red-500 text-white p-8 rounded">
            <h3 className="text-xl font-bold">I'm a Candidate</h3>
            <p className="my-3">Find your dream job</p>
            <button className="bg-white text-red-500 px-4 py-2 rounded">
              Register As Candidate
            </button>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6 px-4">
          <div>
            <h4 className="text-xl md:text-2xl font-bold">5890+</h4>
            <p>Jobs</p>
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-bold">255472+</h4>
            <p>Members</p>
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-bold">51428+</h4>
            <p>Resumes</p>
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-bold">14200+</h4>
            <p>Companies</p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
