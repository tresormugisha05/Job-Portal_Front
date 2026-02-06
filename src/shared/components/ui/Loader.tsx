export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#00b4d8] rounded-full animate-spin mx-auto"></div>
          
          {/* Pulse effect */}
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#00b4d8] rounded-full animate-ping mx-auto"></div>
        </div>
        
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}
