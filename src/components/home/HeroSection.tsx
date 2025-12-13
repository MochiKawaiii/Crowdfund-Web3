import { Link } from "react-router-dom";
import { Rocket, Heart, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Bring a creative project to life.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            ON CHAIN. Discover and support innovative campaigns on Sui blockchain. 
            Every donation earns you a unique Supporter NFT.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/my-projects"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Start a Campaign
            </Link>
            <a
              href="#explore"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur text-white font-semibold rounded-full hover:bg-white/30 transition-colors border border-white/30"
            >
              Explore Projects
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">100%</div>
            <div className="text-white/80 text-sm mt-1">On-Chain</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">1.5%</div>
            <div className="text-white/80 text-sm mt-1">Platform Fee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">NFT</div>
            <div className="text-white/80 text-sm mt-1">Rewards</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">SUI</div>
            <div className="text-white/80 text-sm mt-1">Blockchain</div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-black/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Transparent Transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>Support Creators</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              <span>Keep-It-All Funding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
