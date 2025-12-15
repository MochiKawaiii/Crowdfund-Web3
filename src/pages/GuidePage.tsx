import { BookOpen, Wallet, FolderPlus, Rocket, Gift, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function GuidePage() {
  const forSupporters = [
    {
      step: 1,
      title: "Kết nối ví",
      description: "Nhấn nút 'Connect' ở góc trên bên phải và chọn ví Sui của bạn (Sui Wallet, Suiet, etc.)",
      icon: Wallet,
    },
    {
      step: 2,
      title: "Khám phá dự án",
      description: "Duyệt qua các chiến dịch theo danh mục hoặc tìm kiếm dự án bạn quan tâm",
      icon: BookOpen,
    },
    {
      step: 3,
      title: "Ủng hộ dự án",
      description: "Chọn số tiền muốn donate và để lại lời nhắn động viên cho nhà sáng tạo",
      icon: Gift,
    },
    {
      step: 4,
      title: "Nhận NFT",
      description: "Sau khi ủng hộ thành công, bạn sẽ nhận được NFT làm bằng chứng đóng góp",
      icon: CheckCircle,
    },
  ];

  const forCreators = [
    {
      step: 1,
      title: "Kết nối ví",
      description: "Đảm bảo ví của bạn có đủ SUI để thanh toán gas fee cho các giao dịch",
      icon: Wallet,
    },
    {
      step: 2,
      title: "Tạo Project",
      description: "Vào 'My Projects' và tạo project mới với tên, mô tả và hình ảnh đại diện",
      icon: FolderPlus,
    },
    {
      step: 3,
      title: "Tạo Campaign",
      description: "Trong project, tạo chiến dịch gọi vốn với mục tiêu, thời hạn và danh mục phù hợp",
      icon: Rocket,
    },
    {
      step: 4,
      title: "Rút tiền",
      description: "Sau khi chiến dịch kết thúc, rút tiền về ví của bạn (phí 0.75%)",
      icon: Gift,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">Hướng dẫn sử dụng CrowdFund</h1>
          <p className="text-xl text-emerald-100">
            Tìm hiểu cách sử dụng nền tảng gọi vốn phi tập trung trên Sui Blockchain
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* For Supporters */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Dành cho người ủng hộ
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Cách ủng hộ dự án</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {forSupporters.map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-sm text-blue-600 font-medium mb-2">Bước {item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* For Creators */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Dành cho nhà sáng tạo
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Cách tạo chiến dịch gọi vốn</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {forCreators.map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-sm text-emerald-600 font-medium mb-2">Bước {item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fee Info */}
        <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Phí nền tảng</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-amber-600 mb-2">0.75%</div>
              <div className="text-gray-600">Phí khi donate</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-amber-600 mb-2">0.75%</div>
              <div className="text-gray-600">Phí khi rút tiền</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-emerald-600 mb-2">1.5%</div>
              <div className="text-gray-600">Tổng phí</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sẵn sàng bắt đầu?</h2>
          <p className="text-gray-600 mb-8">Khám phá các dự án hoặc tạo chiến dịch gọi vốn của riêng bạn</p>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Khám phá dự án
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/my-projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Tạo chiến dịch
              <Rocket className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
