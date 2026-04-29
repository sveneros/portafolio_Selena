
import HeroSection from "../components/home/HeroSection";
import QuickAccess from "../components/home/QuickAccess";
import FeaturesSection from "../components/home/FeaturesSection";
import StatsSection from "../components/home/StatsSection";

export default function HomePage() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <QuickAccess />
            <FeaturesSection />
            <StatsSection />
        </main>
    );
}