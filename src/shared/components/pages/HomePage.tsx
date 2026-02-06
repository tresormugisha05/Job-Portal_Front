import PageWrapper from "../layouts/PageWrapper";
import HomeHero from "./home/HomeHero";
import HomeCategories from "./home/HomeCategories";
import HomeJobs from "./home/HomeJobs";
import HomeCompanies from "./home/HomeCompanies";
import HomeResumes from "./home/HomeResumes";

export default function HomePage() {
  return (
    <PageWrapper disableTopPadding={true}>
      <HomeHero />
      <HomeCategories />
      <HomeJobs />
      <HomeCompanies />
      <HomeResumes />
    </PageWrapper>
  );
}
