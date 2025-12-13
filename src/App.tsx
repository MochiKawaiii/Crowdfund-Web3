import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { ExplorePage, CampaignDetailPage, MyProjectsPage, MyNFTsPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/campaign/:id" element={<CampaignDetailPage />} />
        <Route path="/my-projects" element={<MyProjectsPage />} />
        <Route path="/my-nfts" element={<MyNFTsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
