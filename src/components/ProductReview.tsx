import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface ProductReviewProps {
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  avatar?: string;
}

const ProductReview = ({ customerName, rating, comment, date, images, avatar }: ProductReviewProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>
              {customerName.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{customerName}</h4>
              <span className="text-sm text-muted-foreground">{date}</span>
            </div>
            
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating}.0
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">{comment}</p>
            
            {images && images.length > 0 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Review ${idx + 1}`}
                    className="h-20 w-20 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductReview;
