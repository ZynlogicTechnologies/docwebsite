import React, { useEffect, Component, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { mockMedicines } from "@/data/mockData";
import { useCart } from "@/components/CartContext";

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
  image: string;
}

interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  preparationTime: string;
  reportTime: string;
  inStock: boolean;
  image: string;
}

const labTests: LabTest[] = [
  {
    id: "1",
    name: "Complete Blood Count (CBC)",
    description: "Comprehensive blood analysis including RBC, WBC, platelets",
    price: 299,
    originalPrice: 399,
    preparationTime: "No fasting required",
    reportTime: "Same day",
    inStock: true,
    image: "/lab-test-placeholder.jpg"
  },
  {
    id: "2",
    name: "Lipid Profile",
    description: "Cholesterol and triglyceride levels assessment",
    price: 449,
    originalPrice: 599,
    preparationTime: "12 hours fasting",
    reportTime: "Same day",
    inStock: true,
    image: "/lab-test-placeholder.jpg"
  },
  {
    id: "3",
    name: "Thyroid Function Test",
    description: "TSH, T3, T4 levels to assess thyroid health",
    price: 599,
    originalPrice: 799,
    preparationTime: "No fasting required",
    reportTime: "Next day",
    inStock: true,
    image: "/lab-test-placeholder.jpg"
  },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  inStock: boolean;
  type: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold text-red-600">Something went wrong.</h2>
          <p className="text-[#007E85] mt-2">Please try refreshing the page or contact support.</p>
          <Button 
            className="mt-4 bg-[#007E85] hover:bg-[#006670]" 
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Cart = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, removeItemCompletely } = useCart();

  const cartItems: CartItem[] = Object.entries(cart).map(([id, quantity]) => {
    const medicine = mockMedicines.find((m) => m.id === id);
    const labTest = labTests.find((lt) => lt.id === id);
    const item = medicine || labTest;
    
    return {
      id,
      name: item?.name || "Unknown Item",
      price: item?.price || 0,
      image: item?.image || "/placeholder.jpg",
      quantity,
      inStock: item?.inStock ?? true,
      type: medicine ? "Medicine" : labTest ? "LabTest" : "Unknown",
    };
  });

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    Object.keys(cart).forEach((key) => {
      if (cart[key] === 0) {
        removeItemCompletely(key);
      }
    });
  }, [cart, removeItemCompletely]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/medicine");
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

            {cartItemsCount === 0 ? (
              <Card className="border-gray-200">
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900">Your cart is empty</h2>
                  <p className="text-[#007E85] mt-2">
                    Add medicines or lab tests to your cart to proceed with checkout.
                  </p>
                  <Button 
                    className="mt-4 bg-[#007E85] hover:bg-[#006670]" 
                    onClick={handleContinueShopping}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card className="border-gray-200">
                    <CardHeader>
                      <CardTitle>Cart Items ({cartItemsCount})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 py-4 border-b last:border-b-0 border-gray-200"
                        >
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.jpg";
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-[#007E85]">
                              {item.type} • ₹{item.price} per unit
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                disabled={!item.inStock}
                                className="border-[#007E85] text-[#007E85] hover:bg-[#007E85]/10"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addToCart(item.id)}
                                disabled={!item.inStock}
                                className="border-[#007E85] text-[#007E85] hover:bg-[#007E85]/10"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#007E85]">
                              ₹{item.price * item.quantity}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItemCompletely(item.id)}
                              className="text-red-600 hover:text-red-800 mt-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="sticky top-4 border-gray-200">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal ({cartItemsCount} items)</span>
                        <span className="font-semibold">₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span className={cartTotal >= 500 ? "text-[#007E85]" : ""}>
                          {cartTotal >= 500 ? "Free" : "₹50"}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-[#007E85]">₹{cartTotal >= 500 ? cartTotal : cartTotal + 50}</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-[#007E85] hover:bg-[#006670]"
                        onClick={handleCheckout}
                      >
                        Proceed to Checkout
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-[#007E85] text-[#007E85] hover:bg-[#007E85]/10"
                        onClick={handleContinueShopping}
                      >
                        Continue Shopping
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Cart;