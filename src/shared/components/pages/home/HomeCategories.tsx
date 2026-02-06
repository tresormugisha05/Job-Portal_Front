export default function HomeCategories() {
  const categories = [
    { name: "Developer", jobs: 7 },
    { name: "Technology", jobs: 3 },
    { name: "Accounting", jobs: 1 },
    { name: "Medical", jobs: 2 },
    { name: "Government", jobs: 0 },
    { name: "Restaurants", jobs: 2 },
    { name: "Marketing", jobs: 5 },
    { name: "Design", jobs: 4 },
    { name: "Finance", jobs: 6 },
    { name: "Education", jobs: 3 },
    { name: "Engineering", jobs: 8 },
    { name: "Sales", jobs: 4 },
  ];

  return (
    <div className="mt-16 grid grid-cols-2 md:grid-cols-6 gap-6">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="text-center p-6 rounded-lg cursor-pointer transition bg-white/5 hover:bg-[#00b4d8] hover:text-white"
        >
          <h4 className="font-semibold">{cat.name}</h4>
          <p className="text-sm opacity-80">{cat.jobs} Jobs</p>
        </div>
      ))}
    </div>
  );
}