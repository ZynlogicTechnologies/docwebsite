import React from "react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ShoppingCart, Star, Percent, Truck, Shield, Clock } from "lucide-react";
import { mockMedicines } from "@/data/mockData";
import { useCart } from "@/components/CartContext";
import { useNavigate } from "react-router-dom";

const Medicine = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (medicineId: string) => {
    addToCart(medicineId);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Medicine</h1><br></br>
            <p className="text-lg text-gray-600">Get your medicines delivered safely to your doorstep</p>
          </div>

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
                <div className="flex items-center space-x-3 p-3 bg-[#007E85]/10 rounded-lg">
                  <Truck className="h-8 w-8 text-[#007E85]" />
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
                    <Badge variant={medicine.inStock ? "default" : "secondary"} className={medicine.inStock ? "text-xs bg-[#007E85] hover:bg-[#006A6F]" : "text-xs"}>
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
                      <span className="text-lg font-bold text-[#007E85]">₹{medicine.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{medicine.originalPrice}</span>
                    </div>
                    <p className="text-xs text-gray-600">{medicine.description}</p>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(medicine.id)}
                    disabled={!medicine.inStock}
                    className="w-full bg-[#007E85] hover:bg-[#006A6F]"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Medicine;