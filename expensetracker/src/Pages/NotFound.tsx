import { Link } from "react-router-dom";
import logo from "/assets/images/logo.png"; 

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-[700px] text-center">
        <div className="flex justify-center mb-10">
          <img
            src={logo}
            alt="FinPulse Logo"
            className="h-16 md:h-20 object-contain"
          />
        </div>
        <h1 className="text-[120px] md:text-[160px] font-bold leading-none text-[#6366f1] tracking-tighter">
          404
        </h1>
        <h2 className="section-title text-[#393939] mt-2 mb-3">
          Page Not Found
        </h2>
        <p className="text-sm font-medium text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
          Sorry, the page you are looking for doesn’t exist or has been moved.
          Let’s get you back on track with FinPulse.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#6366f1] hover:bg-[#5558e6] text-white text-sm font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            Go to Home
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white text-sm font-medium rounded-xl transition-all duration-200"
          >
            Back to Login
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-12">
          FinPulse · Personal Finance Management
        </p>
      </div>
    </section>
  );
};

export default NotFound;