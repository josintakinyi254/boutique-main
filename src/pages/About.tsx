import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              About ÉLÉGANTE
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curating timeless elegance and sophisticated fashion since 2020
            </p>
          </div>

          <div className="space-y-12 animate-slide-up">
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                ÉLÉGANTE was born from a passion for timeless fashion and a
                commitment to quality craftsmanship. We believe that true style
                transcends trends, and our carefully curated collections reflect
                this philosophy. Each piece is selected with meticulous attention
                to detail, ensuring that every woman who wears ÉLÉGANTE feels
                confident and beautiful.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We are dedicated to providing exceptional fashion that empowers
                women to express their unique style. Our mission is to offer
                luxury pieces that combine elegance, comfort, and sustainability,
                creating a wardrobe that stands the test of time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">
                Sustainability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to ethical and sustainable practices throughout
                our supply chain. From sourcing eco-friendly materials to
                partnering with fair-trade manufacturers, we strive to minimize
                our environmental impact while delivering exceptional quality.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
