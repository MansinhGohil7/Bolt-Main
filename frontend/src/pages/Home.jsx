import Hero from '../components/Hero';
import ToolSuite from '../components/ToolSuite';
import Roadmap from '../components/Roadmap';
import Support from '../components/Support';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <ToolSuite />
        <Roadmap />
        <Support />
      </main>
      <Footer />
    </>
  );
};

export default Home;
