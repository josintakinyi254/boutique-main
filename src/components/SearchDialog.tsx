import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/lib/mockData";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredProducts = query.trim()
    ? mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
    onOpenChange(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            autoFocus
          />
        </div>

        <div className="overflow-y-auto flex-1 -mx-6 px-6">
          {query.trim() && filteredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products found for "{query}"
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="space-y-2">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-3 rounded-lg transition-colors",
                    "hover:bg-muted"
                  )}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <p className="font-semibold text-primary">${product.price.toFixed(2)}</p>
                </button>
              ))}
            </div>
          )}

          {!query.trim() && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Start typing to search for products</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
