import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007E85]">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#007E85]">MediCare</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Your trusted healthcare companion. Book appointments, consult doctors online, 
              and manage your health records all in one place.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-[#007E85] cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-[#007E85] cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-[#007E85] cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-[#007E85] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Services</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/find-doctors" className="hover:text-[#007E85] transition-colors">Find Doctors</Link></li>
              <li><Link to="/book-appointment" className="hover:text-[#007E85] transition-colors">Book Appointment</Link></li>
              <li><Link to="/health-records" className="hover:text-[#007E85] transition-colors">Health Records</Link></li>
              <li><Link to="/medicine" className="hover:text-[#007E85] transition-colors">Order Medicine</Link></li>
              <li><Link to="/lab-tests" className="hover:text-[#007E85] transition-colors">Lab Tests</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-[#007E85] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#007E85] transition-colors">Contact</Link></li>
              <li><Link to="#" className="hover:text-[#007E85] transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-[#007E85] transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-[#007E85] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#007E85]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#007E85]" />
                <span>support@medicare.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-[#007E85]" />
                <span>123 Health St, Medical City, MC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} MediCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;