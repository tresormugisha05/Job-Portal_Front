import PageWrapper from "../layouts/PageWrapper";
import HomeHero from "./home/HomeHero";
import HomeCategories from "./home/HomeCategories";
import HomeJobs from "./home/HomeJobs";
import HomeCompanies from "./home/HomeCompanies";

export default function HomePage() {
  return (
    <PageWrapper>
      <HomeHero />
      <HomeCategories />
      <HomeJobs />
      <HomeCompanies />
    </PageWrapper>
  );
}
