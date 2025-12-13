import { useState } from "react";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { Plus, FolderKanban, Loader2, Wallet } from "lucide-react";
import { CreateProjectModal } from "../components/project/CreateProjectModal";
import { CreateCampaignModal } from "../components/campaign/CreateCampaignModal";
import { CampaignCard } from "../components/campaign/CampaignCard";
import { PACKAGE_ID, MODULES } from "../constants";
import { parseProjectData, parseCampaignData } from "../hooks";
import type { Project, Campaign } from "../types";

export function MyProjectsPage() {
  const account = useCurrentAccount();
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  // Fetch user's projects
  const { data: projectsData, isLoading: loadingProjects, refetch: refetchProjects } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address!,
      filter: {
        StructType: `${PACKAGE_ID}::${MODULES.PROJECT}::Project`,
      },
      options: { showContent: true },
    },
    { enabled: !!account?.address }
  );

  // Parse projects
  const projects: Project[] = projectsData?.data
    ?.map((obj: any) => parseProjectData(obj.data))
    .filter((p): p is Project => p !== null) || [];

  // Fetch campaigns created by this user
  const { data: eventsData, isLoading: loadingEvents } = useSuiClientQuery(
    "queryEvents",
    {
      query: {
        MoveEventType: `${PACKAGE_ID}::${MODULES.CAMPAIGN}::CampaignCreated`,
      },
      limit: 50,
    },
    { enabled: !!account?.address }
  );

  // Filter events by this user and get campaign IDs
  const userCampaignIds = eventsData?.data
    ?.filter((event: any) => event.parsedJson?.creator === account?.address)
    .map((event: any) => event.parsedJson?.campaign_id)
    .filter(Boolean) || [];

  // Fetch campaign objects
  const { data: campaignsData, isLoading: loadingCampaigns, refetch: refetchCampaigns } = useSuiClientQuery(
    "multiGetObjects",
    {
      ids: userCampaignIds,
      options: { showContent: true },
    },
    { enabled: userCampaignIds.length > 0 }
  );

  const campaigns: Campaign[] = campaignsData
    ?.map((obj: any) => parseCampaignData(obj.data))
    .filter((c): c is Campaign => c !== null) || [];

  const isLoading = loadingProjects || loadingEvents || loadingCampaigns;

  if (!account) {
    return (
      <div className="text-center py-20">
        <Wallet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
        <p className="text-gray-500">
          Please connect your wallet to view and manage your projects.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCreateProject(true)}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </button>
          <button
            onClick={() => setShowCreateCampaign(true)}
            disabled={projects.length === 0}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          {/* Projects Section */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Projects ({projects.length})
            </h2>
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.name}
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <FolderKanban className="w-6 h-6 text-blue-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {project.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {project.campaign_ids?.length || 0} campaigns
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                <FolderKanban className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">
                  You haven't created any projects yet.
                </p>
                <button
                  onClick={() => setShowCreateProject(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Project
                </button>
              </div>
            )}
          </section>

          {/* Campaigns Section */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              My Campaigns ({campaigns.length})
            </h2>
            {campaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                <p className="text-gray-600">
                  {projects.length === 0
                    ? "Create a project first to launch campaigns."
                    : "You haven't launched any campaigns yet."}
                </p>
              </div>
            )}
          </section>
        </>
      )}

      {/* Modals */}
      <CreateProjectModal
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
        onSuccess={() => refetchProjects()}
      />
      <CreateCampaignModal
        isOpen={showCreateCampaign}
        onClose={() => setShowCreateCampaign(false)}
        onSuccess={() => refetchCampaigns()}
        projects={projects}
      />
    </div>
  );
}
