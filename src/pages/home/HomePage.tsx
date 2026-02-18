import PageWrapper from "../../shared/layouts/PageWrapper";
import HomeHero from "./HomeHero";
import HomeJobs from "./HomeJobs";
import HomeCompanies from "./HomeCompanies";
import HomeResumes from "./HomeResumes";
import Loader from "../../shared/components/ui/Loader";
import usePageLoader from "../../shared/components/hooks/usePageLoader";
export default function HomePage() {
  const isLoading = usePageLoader(1000);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageWrapper disableTopPadding={true}>
      <HomeHero />
      <HomeJobs />
      <HomeCompanies />
      <HomeResumes />
    </PageWrapper>
  );
}
