import Banner from "@/components/Banner";
import TopRatedDoctor from "@/components/TopRatedDoctor";
import AboutUs from "@/components/AboutUs";
import Reviews from "@/components/Reviews";

export const metadata = {
  title: "Home | DocAppoint",
  description: "Book appointments with the best doctors in your area. Trusted professionals, 24/7 availability, and patient-centric care.",
};

export default function Home() {
  return (
    <main>
      <Banner />
      <TopRatedDoctor />
      <AboutUs />
      <Reviews />
    </main>
  );
}
