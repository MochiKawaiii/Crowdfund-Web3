import { Trophy, ExternalLink, Users, Target, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for successful campaigns - In real app, fetch from blockchain
const successStories = [
  {
    id: "1",
    name: "SuiPlay - Game Web3 đầu tiên trên Sui",
    description: "Game nhập vai phi tập trung với NFT và tokenomics độc đáo. Đã ra mắt thành công và có hơn 10,000 người chơi.",
    image_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    category: "games",
    goal_amount: "50000",
    raised_amount: "72500",
    backers: 1250,
    creator: "SuiPlay Studio",
    end_date: "2024-11-15",
    achievement: "145% mục tiêu",
  },
  {
    id: "2", 
    name: "EcoTrack - Ứng dụng theo dõi carbon footprint",
    description: "Ứng dụng giúp người dùng theo dõi và giảm lượng khí thải carbon trong cuộc sống hàng ngày.",
    image_url: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=800",
    category: "technology",
    goal_amount: "25000",
    raised_amount: "31200",
    backers: 890,
    creator: "GreenTech VN",
    end_date: "2024-10-20",
    achievement: "125% mục tiêu",
  },
  {
    id: "3",
    name: "Artisan NFT Collection",
    description: "Bộ sưu tập 1000 NFT nghệ thuật truyền thống Việt Nam được số hóa bởi các nghệ nhân.",
    image_url: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800",
    category: "art",
    goal_amount: "15000",
    raised_amount: "28750",
    backers: 456,
    creator: "VN Digital Art",
    end_date: "2024-09-30",
    achievement: "192% mục tiêu",
  },
  {
    id: "4",
    name: "DeFi Education Platform",
    description: "Nền tảng giáo dục về DeFi và blockchain cho người Việt Nam, hoàn toàn miễn phí.",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    category: "education",
    goal_amount: "10000",
    raised_amount: "15600",
    backers: 320,
    creator: "Blockchain Academy VN",
    end_date: "2024-12-01",
    achievement: "156% mục tiêu",
  },
  {
    id: "5",
    name: "Indie Film: Bóng Đêm",
    description: "Phim ngắn độc lập về câu chuyện của những người trẻ Việt Nam trong thời đại số.",
    image_url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
    category: "film",
    goal_amount: "30000",
    raised_amount: "35400",
    backers: 678,
    creator: "Indie Film Collective",
    end_date: "2024-11-25",
    achievement: "118% mục tiêu",
  },
  {
    id: "6",
    name: "Music Album: Tiếng Vọng",
    description: "Album nhạc acoustic kết hợp âm nhạc truyền thống và hiện đại, phát hành dạng NFT.",
    image_url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
    category: "music",
    goal_amount: "8000",
    raised_amount: "12800",
    backers: 245,
    creator: "Acoustic Collective",
    end_date: "2024-10-10",
    achievement: "160% mục tiêu",
  },
];

const formatSUI = (amount: string) => {
  return Number(amount).toLocaleString();
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    games: "bg-purple-100 text-purple-700",
    technology: "bg-blue-100 text-blue-700",
    art: "bg-pink-100 text-pink-700",
    education: "bg-amber-100 text-amber-700",
    film: "bg-red-100 text-red-700",
    music: "bg-indigo-100 text-indigo-700",
  };
  return colors[category] || "bg-gray-100 text-gray-700";
};

export function SuccessStoriesPage() {
  const totalRaised = successStories.reduce((sum, s) => sum + Number(s.raised_amount), 0);
  const totalBackers = successStories.reduce((sum, s) => sum + s.backers, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">Dự án gọi vốn thành công</h1>
          <p className="text-xl text-amber-100 mb-8">
            Những câu chuyện truyền cảm hứng từ cộng đồng CrowdFund
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="text-3xl font-bold">{successStories.length}</div>
              <div className="text-sm text-amber-100">Dự án thành công</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="text-3xl font-bold">{formatSUI(totalRaised.toString())} SUI</div>
              <div className="text-sm text-amber-100">Tổng số tiền huy động</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="text-3xl font-bold">{totalBackers.toLocaleString()}</div>
              <div className="text-sm text-amber-100">Người ủng hộ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={story.image_url}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(story.category)}`}>
                    {story.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    {story.achievement}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{story.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{story.description}</p>

                {/* Stats */}
                <div className="space-y-3 mb-4">
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="font-bold text-emerald-600">{formatSUI(story.raised_amount)} SUI</span>
                      <span className="text-gray-400 ml-1">/ {formatSUI(story.goal_amount)} SUI</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {story.backers} người ủng hộ
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {story.end_date}
                    </div>
                  </div>
                </div>

                {/* Creator */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm">
                    <span className="text-gray-400">bởi </span>
                    <span className="font-medium text-gray-700">{story.creator}</span>
                  </div>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1">
                    Chi tiết
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Bạn cũng có thể tạo nên câu chuyện thành công!
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Hàng ngàn người ủng hộ đang chờ đợi những ý tưởng sáng tạo. 
            Bắt đầu chiến dịch gọi vốn của bạn ngay hôm nay.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/my-projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Bắt đầu gọi vốn
              <Target className="w-4 h-4" />
            </Link>
            <Link
              to="/guide"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Xem hướng dẫn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
