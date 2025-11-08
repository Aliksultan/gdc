import React from "react";
import {
  CompassIcon,
  BrainCircuitIcon,
  BriefcaseIcon,
  FileTextIcon,
  LightbulbIcon,
  MapPinIcon,
  MessageSquareIcon,
  BarChartIcon,
  TargetIcon,
} from "./icons";

// --- Card Component for reusability ---
interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<CardProps> = ({
  icon,
  title,
  description,
  className,
}) => (
  <div
    className={`bg-card p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300 ${className}`}
  >
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-card-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

// --- Sections as separate components for clarity ---

const HeroSection: React.FC = () => (
  <section className="relative text-foreground py-20 sm:py-32 overflow-hidden">
    <div className="absolute inset-0 bg-border/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
    <div className="container mx-auto px-6 text-center relative">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fadeIn">
        Navigate Your Future with{" "}
        <span className="text-primary">Career Compass</span>
      </h1>
      <p
        className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fadeIn"
        style={{ animationDelay: "200ms" }}
      >
        Your intelligent, AI-powered navigator for discovering the perfect
        career path, building essential skills, and landing your dream job.
      </p>
      <div className="animate-fadeIn" style={{ animationDelay: "400ms" }}>
        <a
          href="/dashboard"
          className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-full text-lg hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Craft Your Future
        </a>
      </div>
    </div>
  </section>
);

const ProblemSection: React.FC = () => (
  <section className="py-20 bg-background/80">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          The Student Career Challenge
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Every student faces these barriers. Career Compass removes them
          through intelligent, personalized guidance.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<LightbulbIcon />}
          title="Uncertainty"
          description="Which career path truly matches my interests, skills, and market demand?"
        />
        <FeatureCard
          icon={<BarChartIcon />}
          title="Skill Gaps"
          description="What specific competencies do I need to develop to become a top candidate?"
        />
        <FeatureCard
          icon={<BriefcaseIcon />}
          title="Opportunity Gap"
          description="How can I find relevant internships and entry-level roles to kickstart my career?"
        />
        <FeatureCard
          icon={<FileTextIcon />}
          title="Resume Paralysis"
          description="How do I effectively market myself and build a compelling resume with little experience?"
        />
      </div>
    </div>
  </section>
);

const HowItWorksSection: React.FC = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Your Path to Success in 4 Steps
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Our AI-driven process simplifies your career planning journey from
          start to finish.
        </p>
      </div>
      <div className="relative">
        <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center text-primary text-2xl font-bold mb-4 z-10">
              01
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Understand You
            </h3>
            <p className="text-muted-foreground">
              Answer intuitive questions about your skills, interests, and
              academic background.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center text-primary text-2xl font-bold mb-4 z-10">
              02
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Analyze Your Profile
            </h3>
            <p className="text-muted-foreground">
              Our Gemini-powered AI engine processes your data to identify
              unique patterns and opportunities.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center text-primary text-2xl font-bold mb-4 z-10">
              03
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Generate Recommendations
            </h3>
            <p className="text-muted-foreground">
              Receive personalized career tracks, skill development paths, and
              relevant courses.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center text-primary text-2xl font-bold mb-4 z-10">
              04
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Guide Your Growth
            </h3>
            <p className="text-muted-foreground">
              Access mock interviews, portfolio advice, and nearby internship
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection: React.FC = () => (
  <section id="features" className="py-20 bg-background/80">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Core Features & Capabilities
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          All the tools you need to succeed, powered by cutting-edge AI.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<CompassIcon />}
          title="Career Direction Engine"
          description="Receive AI-powered career path recommendations matched to your unique strengths and market demand."
        />
        <FeatureCard
          icon={<BrainCircuitIcon />}
          title="Learning Pathway Generator"
          description="Discover curated courses, certifications, and learning resources perfectly aligned with your chosen career."
        />
        <FeatureCard
          icon={<FileTextIcon />}
          title="Resume & Portfolio Builder"
          description="Generate a professional resume from scratch with guidance for students lacking experience."
        />
        <FeatureCard
          icon={<MessageSquareIcon />}
          title="AI Mock Interviews"
          description="Practice interviews with an AI, get instant feedback on your answers, and improve your soft skills."
        />
        <FeatureCard
          icon={<TargetIcon />}
          title="Personal Development Plan"
          description="Receive a month-by-month roadmap with milestones, learning goals, and progress tracking."
        />
        <FeatureCard
          icon={<MapPinIcon />}
          title="Nearby Opportunities"
          description="Discover internships and entry-level positions in your area with Google Maps integration."
        />
      </div>
    </div>
  </section>
);

export const MarketingPage: React.FC = () => {
  return (
    <div>
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
      </main>
    </div>
  );
};
