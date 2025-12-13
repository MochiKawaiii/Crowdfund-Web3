import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSuiClientQuery, useCurrentAccount } from "@mysten/dapp-kit";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Target, 
  Share2, 
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { formatSUI } from "../constants";
import { parseCampaignData, useContractCalls } from "../hooks";
import { DonateModal } from "../components/campaign/DonateModal";

export function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const account = useCurrentAccount();
  const { endCampaign, withdrawFunds, isPending } = useContractCalls();
  
  const [showDonateModal, setShowDonateModal] = useState(false);

  // Fetch campaign data
  const { data: campaignData, isLoading, refetch } = useSuiClientQuery(
    "getObject",
    {
      id: id!,
      options: { showContent: true },
    },
    { enabled: !!id }
  );

  const campaign = campaignData?.data ? parseCampaignData(campaignData.data) : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Campaign not found</h3>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline"
        >
          Go back to explore
        </button>
      </div>
    );
  }

  const progress = Math.min(
    (Number(campaign.current_amount) / Number(campaign.goal_amount)) * 100,
    100
  );
  const endTime = new Date(Number(campaign.end_time));
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((endTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const isEnded = now > endTime || !campaign.is_active;
  const isCreator = account?.address === campaign.creator;

  const handleEndCampaign = async () => {
    try {
      await endCampaign(campaign.id);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawFunds(campaign.id);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
            {campaign.image_url ? (
              <img
                src={campaign.image_url}
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                <Target className="w-20 h-20 text-blue-300" />
              </div>
            )}
          </div>

          {/* Title & Description */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Share2 className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 whitespace-pre-wrap">{campaign.description}</p>
          </div>

          {/* Tiers */}
          {campaign.tiers.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reward Tiers</h2>
              <div className="space-y-4">
                {campaign.tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{tier.name}</h3>
                      <span className="text-blue-600 font-medium">
                        {formatSUI(tier.min_amount)} SUI+
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{tier.description}</p>
                    {tier.benefits.length > 0 && (
                      <ul className="space-y-1">
                        {tier.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        {tier.current_supporters} / {tier.max_supporters === "0" ? "∞" : tier.max_supporters} backers
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transaction History - Public for transparency */}
          {campaign.transaction_history.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Transaction History
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({campaign.transaction_history.length} transactions)
                </span>
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-600">Type</th>
                      <th className="px-4 py-3 text-left text-gray-600">Amount</th>
                      {isCreator && (
                        <th className="px-4 py-3 text-left text-gray-600">Fee</th>
                      )}
                      <th className="px-4 py-3 text-left text-gray-600">Time</th>
                      {isCreator && (
                        <th className="px-4 py-3 text-left text-gray-600">From</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {campaign.transaction_history.slice(-10).reverse().map((tx, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            tx.tx_type === "deposit" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-orange-100 text-orange-700"
                          }`}>
                            {tx.tx_type === "deposit" ? "Donation" : "Withdraw"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-900 font-medium">{formatSUI(tx.amount)} SUI</td>
                        {isCreator && (
                          <td className="px-4 py-3 text-gray-500">{formatSUI(tx.fee)} SUI</td>
                        )}
                        <td className="px-4 py-3 text-gray-500">
                          {new Date(Number(tx.timestamp)).toLocaleDateString()}
                        </td>
                        {isCreator && (
                          <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                            {tx.actor ? `${tx.actor.slice(0, 6)}...${tx.actor.slice(-4)}` : "-"}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!isCreator && (
                <p className="text-xs text-gray-400 mt-2 text-center">
                  🔗 All transactions are recorded on-chain for transparency
                </p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="mb-4">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatSUI(campaign.current_amount)}
                  </p>
                  <p className="text-gray-500">
                    SUI raised of {formatSUI(campaign.goal_amount)} SUI goal
                  </p>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {progress.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    progress >= 100 ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-900">{campaign.total_supporters}</p>
                  <p className="text-xs text-gray-500">Supporters</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {isEnded ? "Ended" : `${daysLeft} days`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isEnded ? endTime.toLocaleDateString() : "remaining"}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 py-4">
              {isCreator && campaign.is_withdrawn && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Funds Withdrawn
                </span>
              )}
              {campaign.is_funded && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Funded
                </span>
              )}
              {campaign.extensions_used > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                  Extended {campaign.extensions_used}x
                </span>
              )}
              {!campaign.is_active && !campaign.is_withdrawn && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                  Closed
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isEnded && campaign.is_active && (
                <button
                  onClick={() => setShowDonateModal(true)}
                  className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                >
                  Donate Now
                </button>
              )}

              {isCreator && campaign.is_active && (
                <button
                  onClick={handleEndCampaign}
                  disabled={isPending}
                  className="w-full py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  {isPending ? "Processing..." : "End Campaign"}
                </button>
              )}

              {isCreator && !campaign.is_active && !campaign.is_withdrawn && Number(campaign.current_amount) > 0 && (
                <button
                  onClick={handleWithdraw}
                  disabled={isPending}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isPending ? "Processing..." : "Withdraw Funds"}
                </button>
              )}

              {isCreator && campaign.is_withdrawn && (
                <div className="w-full py-4 px-4 bg-green-50 border border-green-200 rounded-xl text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-green-700 font-medium">Funds Successfully Withdrawn</p>
                  <p className="text-green-600 text-sm mt-1">
                    {formatSUI(campaign.current_amount)} SUI has been transferred to creator
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Creator Info */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Creator</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 font-mono">
                {campaign.creator.slice(0, 8)}...{campaign.creator.slice(-6)}
              </span>
              <a
                href={`https://suiscan.xyz/testnet/account/${campaign.creator}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Donate Modal */}
      <DonateModal
        isOpen={showDonateModal}
        onClose={() => setShowDonateModal(false)}
        onSuccess={() => refetch()}
        campaignId={campaign.id}
        campaignName={campaign.name}
      />
    </div>
  );
}
