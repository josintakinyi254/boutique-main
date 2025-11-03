import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-fashion.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: "scale(1.1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-tight mb-6">
            Timeless
            <br />
            <span className="text-secondary">Elegance</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light animate-fade-in-delay">
            Discover our curated collection of luxury fashion pieces that define
            sophistication and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-slide-up-delay">
            <Link to="/shop">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base font-medium group"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/shop?filter=new">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-foreground px-8 h-12 text-base font-medium"
              >
                New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
