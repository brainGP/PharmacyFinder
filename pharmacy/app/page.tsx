import Header from '../components/header';
import Title from '../components/title';
import ClosestPharmaciesSection from '../components/ClosestPharmaciesSection';
import LatestProductsSection from '../components/LatestProductsSection';
import Advantage from '../components/advantage';
import Footer from '../components/footer';

export default function Home() {
  return (
    <div>
      <Header />
      <Title />
      <ClosestPharmaciesSection />
      <LatestProductsSection />
      <Advantage />
      <Footer />
    </div>
  );
}
