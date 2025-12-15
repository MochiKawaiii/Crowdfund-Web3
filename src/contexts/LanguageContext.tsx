import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Language = "en" | "vi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.explore": "Explore",
    "nav.categories": "Categories",
    "nav.myProjects": "My Projects",
    "nav.myNFTs": "My NFTs",
    "nav.guide": "Guide",
    "nav.success": "Success Stories",
    "nav.successStories": "Success",
    "nav.start": "Start",
    "nav.startCampaign": "Start a Campaign",
    "nav.connected": "Connected",

    // Categories
    "cat.art": "Art",
    "cat.comics": "Comics",
    "cat.crafts": "Crafts",
    "cat.dance": "Dance",
    "cat.design": "Design",
    "cat.fashion": "Fashion",
    "cat.film": "Film",
    "cat.food": "Food",
    "cat.games": "Games",
    "cat.journalism": "Journalism",
    "cat.music": "Music",
    "cat.photography": "Photography",
    "cat.publishing": "Publishing",
    "cat.technology": "Technology",
    "cat.theater": "Theater",
    "cat.other": "Other",
    "cat.education": "Education",

    // Hero Section
    "hero.title": "Bring a creative project to life.",
    "hero.subtitle": "ON CHAIN. Discover and support innovative campaigns on Sui blockchain. Every donation earns you a unique Supporter NFT.",
    "hero.startCampaign": "Start a Campaign",
    "hero.explore": "Explore Projects",
    "hero.onchain": "On-Chain",
    "hero.fee": "Platform Fee",
    "hero.rewards": "Rewards",
    "hero.blockchain": "Blockchain",
    "hero.feature1": "Transparent Transactions",
    "hero.feature2": "Support Creators",
    "hero.feature3": "Keep-It-All Funding",

    // Category Filter
    "filter.all": "All",
    "filter.trending": "Trending",
    "filter.endingSoon": "Ending Soon",
    "filter.justLaunched": "Just Launched",
    "filter.almostFunded": "Almost Funded",

    // Featured Campaign
    "featured.badge": "Featured",
    "featured.label": "FEATURED PROJECT",
    "featured.raised": "raised",
    "featured.of": "of",
    "featured.backers": "backers",
    "featured.daysLeft": "days left",
    "featured.viewCampaign": "View Campaign",

    // Campaign Card
    "card.ended": "Ended",
    "card.left": "left",
    "card.dayLeft": "day left",
    "card.daysLeft": "days left",
    "card.funded": "Funded",
    "card.almostThere": "Almost there!",
    "card.pledged": "pledged of",
    "card.fundedPercent": "funded",
    "card.backers": "backers",

    // Home/Explore
    "home.hero.title": "Fund the next big idea",
    "home.hero.subtitle": "Support innovative projects on Sui blockchain with complete transparency",
    "home.hero.cta": "Explore Projects",
    "home.featured": "Featured Campaign",
    "home.trending": "Trending Campaigns",
    "home.allCampaigns": "All Campaigns",
    "home.noCampaigns": "No campaigns found",
    "home.filters.all": "All",
    "home.filters.active": "Active",
    "home.filters.funded": "Funded",

    // Explore Page
    "explore.title": "Explore Campaigns",
    "explore.subtitle": "Discover and support innovative projects on the blockchain",
    "explore.searchPlaceholder": "Search campaigns...",
    "explore.loading": "Loading campaigns...",
    "explore.loadMore": "Load More Campaigns",
    "explore.noCampaigns": "No campaigns yet",
    "explore.noCampaignsDesc": "Be the first to create a campaign and start raising funds on the Sui blockchain!",
    "explore.startCampaign": "Start Your Campaign",
    "explore.noResults": "No results found",
    "explore.noResultsDesc": "Try adjusting your search or filter to find what you're looking for.",
    "explore.filteringBy": "Filtering by",
    "explore.clearFilter": "Clear filter",
    "explore.cta.title": "Ready to bring your idea to life?",
    "explore.cta.desc": "Launch your campaign today and reach supporters worldwide. It only takes a few minutes to get started.",
    "explore.cta.button": "Start a Campaign",

    // Campaign Card
    "campaign.backers": "backers",
    "campaign.daysLeft": "days left",
    "campaign.funded": "funded",
    "campaign.by": "by",
    "campaign.ended": "Ended",
    "campaign.withdrawn": "Withdrawn",

    // Campaign Detail
    "detail.back": "Back",
    "detail.share": "Share",
    "detail.donate": "Back this project",
    "detail.donateNow": "Donate Now",
    "detail.withdraw": "Withdraw Funds",
    "detail.withdrawing": "Withdrawing...",
    "detail.extend": "Extend Campaign",
    "detail.endCampaign": "End Campaign",
    "detail.processing": "Processing...",
    "detail.raised": "raised of",
    "detail.goal": "goal",
    "detail.supporters": "Supporters",
    "detail.timeLeft": "remaining",
    "detail.days": "days",
    "detail.hours": "hours",
    "detail.minutes": "minutes",
    "detail.ended": "Ended",
    "detail.description": "About this project",
    "detail.tiers": "Reward Tiers",
    "detail.transactions": "Transaction History",
    "detail.txCount": "transactions",
    "detail.txType": "Type",
    "detail.txAmount": "Amount",
    "detail.txFee": "Fee",
    "detail.txTime": "Time",
    "detail.txFrom": "From",
    "detail.donation": "Donation",
    "detail.withdrawal": "Withdraw",
    "detail.onchain": "All transactions are recorded on-chain for transparency",
    "detail.fundsWithdrawn": "Funds Withdrawn",
    "detail.withdrawSuccess": "Funds Successfully Withdrawn",
    "detail.transferredToCreator": "has been transferred to creator",
    "detail.notFound": "Campaign not found",
    "detail.funded": "Funded",
    "detail.extended": "Extended",
    "detail.closed": "Closed",
    "detail.creator": "Creator",

    // Donate Modal
    "donate.title": "Support this project",
    "donate.amount": "Amount (SUI)",
    "donate.message": "Message (optional)",
    "donate.messagePlaceholder": "Leave a message for the creator...",
    "donate.fee": "Platform fee",
    "donate.total": "Total",
    "donate.cancel": "Cancel",
    "donate.confirm": "Donate",
    "donate.processing": "Processing...",
    "donate.connectWallet": "Please connect your wallet",

    // My Projects
    "myProjects.title": "My Projects",
    "myProjects.createProject": "Create Project",
    "myProjects.createCampaign": "New Campaign",
    "myProjects.noCampaigns": "No campaigns yet",
    "myProjects.connectWallet": "Connect wallet to view your projects",

    // Create Project Modal
    "createProject.title": "Create New Project",
    "createProject.name": "Project Name",
    "createProject.description": "Description",
    "createProject.imageUrl": "Image URL",
    "createProject.website": "Website",
    "createProject.cancel": "Cancel",
    "createProject.create": "Create Project",
    "createProject.creating": "Creating...",

    // Create Campaign Modal
    "createCampaign.title": "Create Campaign",
    "createCampaign.project": "Project",
    "createCampaign.selectProject": "Select a project",
    "createCampaign.category": "Category",
    "createCampaign.selectCategory": "Select a category",
    "createCampaign.name": "Campaign Name",
    "createCampaign.description": "Description",
    "createCampaign.imageUrl": "Image URL",
    "createCampaign.goal": "Goal (SUI)",
    "createCampaign.duration": "Duration (days)",
    "createCampaign.fee": "Platform fee: 1.5% (0.75% on deposit + 0.75% on withdraw)",
    "createCampaign.cancel": "Cancel",
    "createCampaign.create": "Create Campaign",
    "createCampaign.creating": "Creating...",

    // Guide Page
    "guide.title": "How to use CrowdFund",
    "guide.subtitle": "Learn how to use the decentralized crowdfunding platform on Sui Blockchain",
    "guide.forSupporters": "For Supporters",
    "guide.forCreators": "For Creators",
    "guide.howToSupport": "How to support projects",
    "guide.howToCreate": "How to create a campaign",
    "guide.step": "Step",
    "guide.supporter.step1.title": "Connect Wallet",
    "guide.supporter.step1.desc": "Click 'Connect' button and select your Sui wallet (Sui Wallet, Suiet, etc.)",
    "guide.supporter.step2.title": "Explore Projects",
    "guide.supporter.step2.desc": "Browse campaigns by category or search for projects you're interested in",
    "guide.supporter.step3.title": "Support Project",
    "guide.supporter.step3.desc": "Choose amount to donate and leave an encouraging message for the creator",
    "guide.supporter.step4.title": "Receive NFT",
    "guide.supporter.step4.desc": "After successful donation, you'll receive an NFT as proof of contribution",
    "guide.creator.step1.title": "Connect Wallet",
    "guide.creator.step1.desc": "Make sure your wallet has enough SUI to pay gas fees for transactions",
    "guide.creator.step2.title": "Create Project",
    "guide.creator.step2.desc": "Go to 'My Projects' and create a new project with name, description and image",
    "guide.creator.step3.title": "Create Campaign",
    "guide.creator.step3.desc": "In the project, create a fundraising campaign with goal, duration and category",
    "guide.creator.step4.title": "Withdraw Funds",
    "guide.creator.step4.desc": "After campaign ends, withdraw funds to your wallet (0.75% fee)",
    "guide.fees": "Platform Fees",
    "guide.depositFee": "Deposit fee",
    "guide.withdrawFee": "Withdraw fee",
    "guide.totalFee": "Total fee",
    "guide.ready": "Ready to start?",
    "guide.readyDesc": "Explore projects or create your own fundraising campaign",
    "guide.exploreProjects": "Explore Projects",
    "guide.createCampaign": "Create Campaign",

    // Success Stories
    "success.title": "Successful Campaigns",
    "success.subtitle": "Inspiring stories from the CrowdFund community",
    "success.projects": "Successful Projects",
    "success.totalRaised": "Total Raised",
    "success.totalBackers": "Total Backers",
    "success.achievement": "of goal",
    "success.backers": "backers",
    "success.by": "by",
    "success.details": "Details",
    "success.cta.title": "You can create your own success story!",
    "success.cta.desc": "Thousands of supporters are waiting for creative ideas. Start your fundraising campaign today.",
    "success.cta.start": "Start Fundraising",
    "success.cta.guide": "View Guide",
    "success.noProjects": "No successful campaigns yet. Be the first!",
    "success.loading": "Loading successful campaigns...",
  },
  vi: {
    // Navbar
    "nav.explore": "Khám phá",
    "nav.categories": "Danh mục",
    "nav.myProjects": "Dự án của tôi",
    "nav.myNFTs": "NFT của tôi",
    "nav.guide": "Hướng dẫn",
    "nav.success": "Câu chuyện thành công",
    "nav.successStories": "Thành công",
    "nav.start": "Bắt đầu",
    "nav.startCampaign": "Tạo chiến dịch",
    "nav.connected": "Đã kết nối",

    // Categories
    "cat.art": "Nghệ thuật",
    "cat.comics": "Truyện tranh",
    "cat.crafts": "Thủ công",
    "cat.dance": "Khiêu vũ",
    "cat.design": "Thiết kế",
    "cat.fashion": "Thời trang",
    "cat.film": "Phim",
    "cat.food": "Ẩm thực",
    "cat.games": "Trò chơi",
    "cat.journalism": "Báo chí",
    "cat.music": "Âm nhạc",
    "cat.photography": "Nhiếp ảnh",
    "cat.publishing": "Xuất bản",
    "cat.technology": "Công nghệ",
    "cat.theater": "Sân khấu",
    "cat.other": "Khác",
    "cat.education": "Giáo dục",

    // Hero Section
    "hero.title": "Biến ý tưởng sáng tạo thành hiện thực.",
    "hero.subtitle": "ON CHAIN. Khám phá và ủng hộ các chiến dịch sáng tạo trên Sui blockchain. Mỗi lần ủng hộ, bạn nhận được NFT độc quyền.",
    "hero.startCampaign": "Bắt đầu chiến dịch",
    "hero.explore": "Khám phá dự án",
    "hero.onchain": "On-Chain",
    "hero.fee": "Phí nền tảng",
    "hero.rewards": "Phần thưởng",
    "hero.blockchain": "Blockchain",
    "hero.feature1": "Giao dịch minh bạch",
    "hero.feature2": "Hỗ trợ nhà sáng tạo",
    "hero.feature3": "Giữ toàn bộ tiền",

    // Category Filter
    "filter.all": "Tất cả",
    "filter.trending": "Xu hướng",
    "filter.endingSoon": "Sắp kết thúc",
    "filter.justLaunched": "Mới ra mắt",
    "filter.almostFunded": "Gần đạt mục tiêu",

    // Featured Campaign
    "featured.badge": "Nổi bật",
    "featured.label": "DỰ ÁN NỔI BẬT",
    "featured.raised": "đã huy động",
    "featured.of": "của",
    "featured.backers": "người ủng hộ",
    "featured.daysLeft": "ngày còn lại",
    "featured.viewCampaign": "Xem chiến dịch",

    // Campaign Card
    "card.ended": "Đã kết thúc",
    "card.left": "còn lại",
    "card.dayLeft": "ngày còn lại",
    "card.daysLeft": "ngày còn lại",
    "card.funded": "Đạt mục tiêu",
    "card.almostThere": "Sắp đạt mục tiêu!",
    "card.pledged": "đã ủng hộ trên",
    "card.fundedPercent": "đạt được",
    "card.backers": "người ủng hộ",

    // Home/Explore
    "home.hero.title": "Tài trợ cho ý tưởng lớn",
    "home.hero.subtitle": "Hỗ trợ các dự án sáng tạo trên Sui blockchain với sự minh bạch hoàn toàn",
    "home.hero.cta": "Khám phá dự án",
    "home.featured": "Chiến dịch nổi bật",
    "home.trending": "Chiến dịch xu hướng",
    "home.allCampaigns": "Tất cả chiến dịch",
    "home.noCampaigns": "Không tìm thấy chiến dịch",
    "home.filters.all": "Tất cả",
    "home.filters.active": "Đang diễn ra",
    "home.filters.funded": "Đã đạt mục tiêu",

    // Explore Page
    "explore.title": "Khám phá chiến dịch",
    "explore.subtitle": "Tìm kiếm và ủng hộ các dự án sáng tạo trên blockchain",
    "explore.searchPlaceholder": "Tìm kiếm chiến dịch...",
    "explore.loading": "Đang tải chiến dịch...",
    "explore.loadMore": "Tải thêm chiến dịch",
    "explore.noCampaigns": "Chưa có chiến dịch nào",
    "explore.noCampaignsDesc": "Hãy là người đầu tiên tạo chiến dịch và bắt đầu gọi vốn trên Sui blockchain!",
    "explore.startCampaign": "Bắt đầu chiến dịch",
    "explore.noResults": "Không tìm thấy kết quả",
    "explore.noResultsDesc": "Thử điều chỉnh tìm kiếm hoặc bộ lọc để tìm những gì bạn đang tìm kiếm.",
    "explore.filteringBy": "Lọc theo",
    "explore.clearFilter": "Xóa bộ lọc",
    "explore.cta.title": "Sẵn sàng biến ý tưởng thành hiện thực?",
    "explore.cta.desc": "Khởi động chiến dịch ngay hôm nay và tiếp cận người ủng hộ trên toàn thế giới. Chỉ mất vài phút để bắt đầu.",
    "explore.cta.button": "Bắt đầu chiến dịch",

    // Campaign Card
    "campaign.backers": "người ủng hộ",
    "campaign.daysLeft": "ngày còn lại",
    "campaign.funded": "đạt được",
    "campaign.by": "bởi",
    "campaign.ended": "Đã kết thúc",
    "campaign.withdrawn": "Đã rút tiền",

    // Campaign Detail
    "detail.back": "Quay lại",
    "detail.share": "Chia sẻ",
    "detail.donate": "Ủng hộ dự án",
    "detail.donateNow": "Ủng hộ ngay",
    "detail.withdraw": "Rút tiền",
    "detail.withdrawing": "Đang rút...",
    "detail.extend": "Gia hạn chiến dịch",
    "detail.endCampaign": "Kết thúc chiến dịch",
    "detail.processing": "Đang xử lý...",
    "detail.raised": "đã huy động trên",
    "detail.goal": "mục tiêu",
    "detail.supporters": "Người ủng hộ",
    "detail.timeLeft": "còn lại",
    "detail.days": "ngày",
    "detail.hours": "giờ",
    "detail.minutes": "phút",
    "detail.ended": "Đã kết thúc",
    "detail.description": "Về dự án này",
    "detail.tiers": "Các mức ủng hộ",
    "detail.transactions": "Lịch sử giao dịch",
    "detail.txCount": "giao dịch",
    "detail.txType": "Loại",
    "detail.txAmount": "Số tiền",
    "detail.txFee": "Phí",
    "detail.txTime": "Thời gian",
    "detail.txFrom": "Từ",
    "detail.donation": "Ủng hộ",
    "detail.withdrawal": "Rút tiền",
    "detail.onchain": "Tất cả giao dịch được ghi lại trên blockchain",
    "detail.fundsWithdrawn": "Đã rút tiền",
    "detail.withdrawSuccess": "Rút tiền thành công",
    "detail.transferredToCreator": "đã được chuyển cho nhà sáng tạo",
    "detail.notFound": "Không tìm thấy chiến dịch",
    "detail.funded": "Đạt mục tiêu",
    "detail.extended": "Đã gia hạn",
    "detail.closed": "Đã đóng",
    "detail.creator": "Người tạo",

    // Donate Modal
    "donate.title": "Ủng hộ dự án",
    "donate.amount": "Số tiền (SUI)",
    "donate.message": "Lời nhắn (tùy chọn)",
    "donate.messagePlaceholder": "Để lại lời nhắn cho nhà sáng tạo...",
    "donate.fee": "Phí nền tảng",
    "donate.total": "Tổng cộng",
    "donate.cancel": "Hủy",
    "donate.confirm": "Ủng hộ",
    "donate.processing": "Đang xử lý...",
    "donate.connectWallet": "Vui lòng kết nối ví",

    // My Projects
    "myProjects.title": "Dự án của tôi",
    "myProjects.createProject": "Tạo dự án",
    "myProjects.createCampaign": "Chiến dịch mới",
    "myProjects.noCampaigns": "Chưa có chiến dịch",
    "myProjects.connectWallet": "Kết nối ví để xem dự án của bạn",

    // Create Project Modal
    "createProject.title": "Tạo dự án mới",
    "createProject.name": "Tên dự án",
    "createProject.description": "Mô tả",
    "createProject.imageUrl": "URL hình ảnh",
    "createProject.website": "Website",
    "createProject.cancel": "Hủy",
    "createProject.create": "Tạo dự án",
    "createProject.creating": "Đang tạo...",

    // Create Campaign Modal
    "createCampaign.title": "Tạo chiến dịch",
    "createCampaign.project": "Dự án",
    "createCampaign.selectProject": "Chọn dự án",
    "createCampaign.category": "Danh mục",
    "createCampaign.selectCategory": "Chọn danh mục",
    "createCampaign.name": "Tên chiến dịch",
    "createCampaign.description": "Mô tả",
    "createCampaign.imageUrl": "URL hình ảnh",
    "createCampaign.goal": "Mục tiêu (SUI)",
    "createCampaign.duration": "Thời hạn (ngày)",
    "createCampaign.fee": "Phí nền tảng: 1.5% (0.75% khi ủng hộ + 0.75% khi rút)",
    "createCampaign.cancel": "Hủy",
    "createCampaign.create": "Tạo chiến dịch",
    "createCampaign.creating": "Đang tạo...",

    // Guide Page
    "guide.title": "Hướng dẫn sử dụng CrowdFund",
    "guide.subtitle": "Tìm hiểu cách sử dụng nền tảng gọi vốn phi tập trung trên Sui Blockchain",
    "guide.forSupporters": "Dành cho người ủng hộ",
    "guide.forCreators": "Dành cho nhà sáng tạo",
    "guide.howToSupport": "Cách ủng hộ dự án",
    "guide.howToCreate": "Cách tạo chiến dịch gọi vốn",
    "guide.step": "Bước",
    "guide.supporter.step1.title": "Kết nối ví",
    "guide.supporter.step1.desc": "Nhấn nút 'Connect' và chọn ví Sui của bạn (Sui Wallet, Suiet, v.v.)",
    "guide.supporter.step2.title": "Khám phá dự án",
    "guide.supporter.step2.desc": "Duyệt qua các chiến dịch theo danh mục hoặc tìm kiếm dự án bạn quan tâm",
    "guide.supporter.step3.title": "Ủng hộ dự án",
    "guide.supporter.step3.desc": "Chọn số tiền muốn ủng hộ và để lại lời nhắn động viên cho nhà sáng tạo",
    "guide.supporter.step4.title": "Nhận NFT",
    "guide.supporter.step4.desc": "Sau khi ủng hộ thành công, bạn sẽ nhận được NFT làm bằng chứng đóng góp",
    "guide.creator.step1.title": "Kết nối ví",
    "guide.creator.step1.desc": "Đảm bảo ví của bạn có đủ SUI để thanh toán gas fee cho các giao dịch",
    "guide.creator.step2.title": "Tạo dự án",
    "guide.creator.step2.desc": "Vào 'Dự án của tôi' và tạo dự án mới với tên, mô tả và hình ảnh",
    "guide.creator.step3.title": "Tạo chiến dịch",
    "guide.creator.step3.desc": "Trong dự án, tạo chiến dịch gọi vốn với mục tiêu, thời hạn và danh mục",
    "guide.creator.step4.title": "Rút tiền",
    "guide.creator.step4.desc": "Sau khi chiến dịch kết thúc, rút tiền về ví của bạn (phí 0.75%)",
    "guide.fees": "Phí nền tảng",
    "guide.depositFee": "Phí khi ủng hộ",
    "guide.withdrawFee": "Phí khi rút tiền",
    "guide.totalFee": "Tổng phí",
    "guide.ready": "Sẵn sàng bắt đầu?",
    "guide.readyDesc": "Khám phá các dự án hoặc tạo chiến dịch gọi vốn của riêng bạn",
    "guide.exploreProjects": "Khám phá dự án",
    "guide.createCampaign": "Tạo chiến dịch",

    // Success Stories
    "success.title": "Dự án gọi vốn thành công",
    "success.subtitle": "Những câu chuyện truyền cảm hứng từ cộng đồng CrowdFund",
    "success.projects": "Dự án thành công",
    "success.totalRaised": "Tổng số tiền huy động",
    "success.totalBackers": "Người ủng hộ",
    "success.achievement": "mục tiêu",
    "success.backers": "người ủng hộ",
    "success.by": "bởi",
    "success.details": "Chi tiết",
    "success.cta.title": "Bạn cũng có thể tạo nên câu chuyện thành công!",
    "success.cta.desc": "Hàng ngàn người ủng hộ đang chờ đợi những ý tưởng sáng tạo. Bắt đầu chiến dịch gọi vốn ngay hôm nay.",
    "success.cta.start": "Bắt đầu gọi vốn",
    "success.cta.guide": "Xem hướng dẫn",
    "success.noProjects": "Chưa có chiến dịch thành công. Hãy là người đầu tiên!",
    "success.loading": "Đang tải các chiến dịch thành công...",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("crowdfund-language");
    return (saved as Language) || "vi";
  });

  useEffect(() => {
    localStorage.setItem("crowdfund-language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
