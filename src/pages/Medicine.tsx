
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Filter,
  ShoppingCart,
  Star,
  Percent,
  Package,
  Truck,
  Shield,
  Clock,
  Plus,
  Minus
} from "lucide-react";
import { mockMedicines } from "@/data/mockData";

const Medicine = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const addToCart = (medicineId: string) => {
    setCart(prev => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1
    }));
  };

  const removeFromCart = (medicineId: string) => {
    setCart(prev => ({
      ...prev,
      [medicineId]: Math.max(0, (prev[medicineId] || 0) - 1)
    }));
  };

  const cartTotal = Object.entries(cart).reduce((total, [id, quantity]) => {
    const medicine = mockMedicines.find(m => m.id === id);
    return total + (medicine ? medicine.price * quantity : 0);
  }, 0);

  const cartItemsCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order Medicine
              </h1>
              <p className="text-lg text-gray-600">
                Get your medicines delivered safely to your doorstep
              </p>
            </div>
            {cartItemsCount > 0 && (
              <Button className="relative">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart ({cartItemsCount})
                <Badge className="absolute -top-2 -right-2 bg-red-500">
                  {cartItemsCount}
                </Badge>
              </Button>
            )}
          </div>

          {/* Search and Features */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search medicines, brands, symptoms..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Truck className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-semibold text-sm">Free Delivery</div>
                    <div className="text-xs text-gray-600">On orders above ₹500</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="font-semibold text-sm">100% Genuine</div>
                    <div className="text-xs text-gray-600">Verified medicines</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="font-semibold text-sm">Quick Delivery</div>
                    <div className="text-xs text-gray-600">Within 2-4 hours</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <Percent className="h-8 w-8 text-orange-600" />
                  <div>
                    <div className="font-semibold text-sm">Best Prices</div>
                    <div className="text-xs text-gray-600">Up to 50% off</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medicine Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockMedicines.map((medicine) => (
              <Card key={medicine.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <Badge variant={medicine.inStock ? "default" : "secondary"} className="text-xs">
                      {medicine.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                    <CardTitle className="text-lg">{medicine.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {medicine.type} • {medicine.manufacturer}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{medicine.rating}</span>
                      <span className="text-xs text-gray-600">({medicine.reviews})</span>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      {medicine.discount}% OFF
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">₹{medicine.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{medicine.originalPrice}</span>
                    </div>
                    <p className="text-xs text-gray-600">{medicine.description}</p>
                  </div>

                  {cart[medicine.id] ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(medicine.id)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-medium">{cart[medicine.id]}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToCart(medicine.id)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-sm font-medium text-primary">
                        ₹{medicine.price * cart[medicine.id]}
                      </span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(medicine.id)}
                      disabled={!medicine.inStock}
                      className="w-full"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cart Summary */}
          {cartTotal > 0 && (
            <Card className="mt-8 sticky bottom-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">Cart Total: ₹{cartTotal}</div>
                    <div className="text-sm text-gray-600">
                      {cartItemsCount} item{cartItemsCount > 1 ? 's' : ''} • 
                      {cartTotal >= 500 ? ' Free delivery' : ` ₹${500 - cartTotal} more for free delivery`}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">View Cart</Button>
                    <Button>Proceed to Checkout</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Medicine;
