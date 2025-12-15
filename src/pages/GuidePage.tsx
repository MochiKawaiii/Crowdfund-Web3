import { BookOpen, Wallet, FolderPlus, Rocket, Gift, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts";

export function GuidePage() {
  const { t } = useLanguage();

  const forSupporters = [
    {
      step: 1,
      title: t("guide.supporter.step1.title"),
      description: t("guide.supporter.step1.desc"),
      icon: Wallet,
    },
    {
      step: 2,
      title: t("guide.supporter.step2.title"),
      description: t("guide.supporter.step2.desc"),
      icon: BookOpen,
    },
    {
      step: 3,
      title: t("guide.supporter.step3.title"),
      description: t("guide.supporter.step3.desc"),
      icon: Gift,
    },
    {
      step: 4,
      title: t("guide.supporter.step4.title"),
      description: t("guide.supporter.step4.desc"),
      icon: CheckCircle,
    },
  ];

  const forCreators = [
    {
      step: 1,
      title: t("guide.creator.step1.title"),
      description: t("guide.creator.step1.desc"),
      icon: Wallet,
    },
    {
      step: 2,
      title: t("guide.creator.step2.title"),
      description: t("guide.creator.step2.desc"),
      icon: FolderPlus,
    },
    {
      step: 3,
      title: t("guide.creator.step3.title"),
      description: t("guide.creator.step3.desc"),
      icon: Rocket,
    },
    {
      step: 4,
      title: t("guide.creator.step4.title"),
      description: t("guide.creator.step4.desc"),
      icon: Gift,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">{t("guide.title")}</h1>
          <p className="text-xl text-emerald-100">
            {t("guide.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* For Supporters */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              {t("guide.forSupporters")}
            </span>
            <h2 className="text-3xl font-bold text-gray-900">{t("guide.howToSupport")}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {forSupporters.map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-sm text-blue-600 font-medium mb-2">{t("guide.step")} {item.step}</div>
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
              {t("guide.forCreators")}
            </span>
            <h2 className="text-3xl font-bold text-gray-900">{t("guide.howToCreate")}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {forCreators.map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-sm text-emerald-600 font-medium mb-2">{t("guide.step")} {item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fee Info */}
        <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t("guide.fees")}</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-amber-600 mb-2">0.75%</div>
              <div className="text-gray-600">{t("guide.depositFee")}</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-amber-600 mb-2">0.75%</div>
              <div className="text-gray-600">{t("guide.withdrawFee")}</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-emerald-600 mb-2">1.5%</div>
              <div className="text-gray-600">{t("guide.totalFee")}</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("guide.ready")}</h2>
          <p className="text-gray-600 mb-8">{t("guide.readyDesc")}</p>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
            >
              {t("guide.exploreProjects")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/my-projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              {t("guide.createCampaign")}
              <Rocket className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
