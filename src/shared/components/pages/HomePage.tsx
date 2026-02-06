import PageWrapper from "../layouts/PageWrapper";
import HomeHero from "./home/HomeHero";
import HomeCategories from "./home/HomeCategories";
import HomeJobs from "./home/HomeJobs";
import HomeCompanies from "./home/HomeCompanies";
import HomeResumes from "./home/HomeResumes";
import Loader from "../ui/Loader";
import usePageLoader from "../../hooks/usePageLoader";

export default function HomePage() {
  const isLoading = usePageLoader(1000);
  
  if (isLoading) {
    return <Loader />;
  }
  
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
