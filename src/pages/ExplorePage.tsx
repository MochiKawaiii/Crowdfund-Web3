import { useState, useMemo } from "react";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { Search, Loader2, Rocket, ArrowRight, Sparkles } from "lucide-react";
import { CampaignCard } from "../components/campaign/CampaignCard";
import { HeroSection, CategoryFilter, FeaturedCampaign } from "../components/home";
import { PACKAGE_ID, MODULES } from "../constants";
import { parseCampaignData } from "../hooks";
import type { Campaign } from "../types";

export function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Fetch campaign created events to get campaign IDs
  const { data: eventsData, isLoading: loadingEvents } = useSuiClientQuery("queryEvents", {
    query: {
      MoveEventType: `${PACKAGE_ID}::${MODULES.CAMPAIGN}::CampaignCreated`,
    },
    limit: 50,
  });

  // Extract campaign IDs from events
  const campaignIds = useMemo(() => {
    if (!eventsData?.data) return [];
    return eventsData.data.map((event: any) => event.parsedJson?.campaign_id).filter(Boolean);
  }, [eventsData]);

  // Fetch all campaign objects
  const { data: objectsData, isLoading: loadingObjects } = useSuiClientQuery(
    "multiGetObjects",
    {
      ids: campaignIds,
      options: { showContent: true },
    },
    { enabled: campaignIds.length > 0 }
  );

  // Parse campaigns
  const campaigns: Campaign[] = useMemo(() => {
    if (!objectsData) return [];
    return objectsData
      .map((obj: any) => parseCampaignData(obj.data))
      .filter((c): c is Campaign => c !== null);
  }, [objectsData]);

  // Filter campaigns based on category
  const filteredCampaigns = useMemo(() => {
    let result = campaigns;
    const now = Date.now();

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    switch (category) {
      case "trending":
        result = result.sort((a, b) => Number(b.current_amount) - Number(a.current_amount));
        break;
      case "ending-soon":
        result = result
          .filter((c) => c.is_active && Number(c.end_time) > now)
          .sort((a, b) => Number(a.end_time) - Number(b.end_time));
        break;
      case "just-launched":
        result = result.sort((a, b) => Number(b.start_time) - Number(a.start_time));
        break;
      case "near-goal":
        result = result
          .filter((c) => {
            const progress = (Number(c.current_amount) / Number(c.goal_amount)) * 100;
            return progress >= 50 && progress < 100 && c.is_active;
          })
          .sort((a, b) => {
            const progressA = Number(a.current_amount) / Number(a.goal_amount);
            const progressB = Number(b.current_amount) / Number(b.goal_amount);
            return progressB - progressA;
          });
        break;
      default:
        // all - show active first, then by amount
        result = result.sort((a, b) => {
          if (a.is_active !== b.is_active) return a.is_active ? -1 : 1;
          return Number(b.current_amount) - Number(a.current_amount);
        });
    }

    return result;
  }, [campaigns, search, category]);

  // Get featured campaign (highest funded active campaign)
  const featuredCampaign = useMemo(() => {
    const activeCampaigns = campaigns.filter(c => c.is_active && Number(c.end_time) > Date.now());
    if (activeCampaigns.length === 0) return null;
    return activeCampaigns.sort((a, b) => Number(b.current_amount) - Number(a.current_amount))[0];
  }, [campaigns]);

  const isLoading = loadingEvents || loadingObjects;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="explore">
        
        {/* Featured Campaign */}
        {featuredCampaign && (
          <div className="mb-16">
            <FeaturedCampaign campaign={featuredCampaign} />
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-500" />
              Explore Campaigns
            </h2>
            <p className="text-gray-500 mt-1">
              Discover and support innovative projects on the blockchain
            </p>
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter activeCategory={category} onCategoryChange={setCategory} />

        {/* Campaign Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mb-4" />
            <p className="text-gray-500">Loading campaigns...</p>
          </div>
        ) : filteredCampaigns.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>

            {filteredCampaigns.length >= 6 && (
              <div className="text-center mt-12">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Load More Campaigns
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-12 h-12 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No campaigns yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Be the first to create a campaign and start raising funds on the Sui blockchain!
            </p>
            <a
              href="/my-projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              <Rocket className="w-5 h-5" />
              Start Your Campaign
            </a>
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No results found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to bring your idea to life?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Launch your campaign today and reach supporters worldwide. 
            It only takes a few minutes to get started.
          </p>
          <a
            href="/my-projects"
            className="inline-flex items-center gap-2 px-10 py-5 bg-emerald-500 text-white font-bold text-lg rounded-full hover:bg-emerald-400 transition-colors"
          >
            Start a Campaign
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
