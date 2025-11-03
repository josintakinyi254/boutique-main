import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
  delay?: number;
}

const CategoryCard = ({ title, image, link, delay = 0 }: CategoryCardProps) => {
  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-lg aspect-square block"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-80" />
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 z-20 flex items-end p-6">
        <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-white mb-2">
            {title}
          </h3>
          <span className="text-white/90 text-sm font-medium inline-flex items-center gap-2">
            Shop Now
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
