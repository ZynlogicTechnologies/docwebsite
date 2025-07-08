
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  rating: number;
  reviews: number;
  consultationFee: number;
  avatar: string;
  languages: string[];
  available: boolean;
  nextSlot: string;
  about: string;
  hospital: string;
  location: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'online' | 'offline';
  fee: number;
}

export interface HealthRecord {
  id: string;
  type: 'prescription' | 'report' | 'vaccine' | 'checkup';
  title: string;
  date: string;
  doctor: string;
  description: string;
  attachment?: string;
}

export interface Medicine {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  manufacturer: string;
  inStock: boolean;
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  description: string;
  preparationRequired: boolean;
  reportTime: string;
  includes: string[];
}

export const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    qualification: "MD, DM Cardiology",
    experience: 12,
    rating: 4.8,
    reviews: 324,
    consultationFee: 800,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    languages: ["English", "Spanish"],
    available: true,
    nextSlot: "Today 2:30 PM",
    about: "Dr. Sarah Johnson is a renowned cardiologist with over 12 years of experience in treating heart conditions. She specializes in preventive cardiology and non-invasive cardiac procedures.",
    hospital: "City General Hospital",
    location: "New York, NY"
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    qualification: "MD, DNB Dermatology",
    experience: 8,
    rating: 4.9,
    reviews: 256,
    consultationFee: 600,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    languages: ["English", "Mandarin"],
    available: true,
    nextSlot: "Tomorrow 10:00 AM",
    about: "Dr. Michael Chen is a skilled dermatologist specializing in cosmetic dermatology and skin cancer treatment. He has extensive experience in laser treatments and anti-aging procedures.",
    hospital: "Metro Skin Clinic",
    location: "Los Angeles, CA"
  },
  {
    id: "3",
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    qualification: "MD, DCH",
    experience: 15,
    rating: 4.7,
    reviews: 412,
    consultationFee: 500,
    avatar: "https://images.unsplash.com/photo-1594824153176-4d0e1b65e6cc?w=400&h=400&fit=crop&crop=face",
    languages: ["English", "Hindi"],
    available: false,
    nextSlot: "Dec 28, 9:00 AM",
    about: "Dr. Priya Sharma is a dedicated pediatrician with 15 years of experience in child healthcare. She specializes in preventive care, vaccinations, and developmental pediatrics.",
    hospital: "Children's Medical Center",
    location: "Chicago, IL"
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    qualification: "MS Orthopedics",
    experience: 18,
    rating: 4.6,
    reviews: 298,
    consultationFee: 1200,
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    languages: ["English"],
    available: true,
    nextSlot: "Today 4:00 PM",
    about: "Dr. James Wilson is an experienced orthopedic surgeon specializing in joint replacement and sports medicine. He has performed over 2000 successful surgeries.",
    hospital: "Sports Medicine Institute",
    location: "Miami, FL"
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2024-07-10",
    time: "2:30 PM",
    status: "upcoming",
    type: "online",
    fee: 800
  },
  {
    id: "2",
    doctorId: "2",
    doctorName: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: "2024-07-12",
    time: "10:00 AM",
    status: "upcoming",
    type: "offline",
    fee: 600
  }
];

export const mockHealthRecords: HealthRecord[] = [
  {
    id: "1",
    type: "prescription",
    title: "Blood Pressure Medication",
    date: "2024-07-05",
    doctor: "Dr. Sarah Johnson",
    description: "Prescribed Lisinopril 10mg daily for hypertension management."
  },
  {
    id: "2",
    type: "report",
    title: "Blood Test Results",
    date: "2024-07-03",
    doctor: "Dr. Michael Chen",
    description: "Complete blood count and lipid profile results - all values within normal range."
  }
];

export const mockMedicines: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    type: "Tablet",
    price: 25,
    originalPrice: 30,
    discount: 17,
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    description: "Effective pain relief and fever reducer",
    manufacturer: "PharmaCorp",
    inStock: true
  },
  {
    id: "2",
    name: "Vitamin D3 1000 IU",
    type: "Capsule",
    price: 120,
    originalPrice: 150,
    discount: 20,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    description: "Essential vitamin for bone health",
    manufacturer: "HealthPlus",
    inStock: true
  }
];

export const mockLabTests: LabTest[] = [
  {
    id: "1",
    name: "Complete Blood Count (CBC)",
    category: "Blood Test",
    price: 300,
    originalPrice: 400,
    discount: 25,
    description: "Comprehensive blood analysis including RBC, WBC, and platelet count",
    preparationRequired: false,
    reportTime: "24 hours",
    includes: ["Red Blood Cell Count", "White Blood Cell Count", "Platelet Count", "Hemoglobin", "Hematocrit"]
  },
  {
    id: "2",
    name: "Lipid Profile",
    category: "Blood Test",
    price: 450,
    originalPrice: 500,
    discount: 10,
    description: "Cholesterol and triglyceride levels assessment",
    preparationRequired: true,
    reportTime: "12 hours",
    includes: ["Total Cholesterol", "LDL Cholesterol", "HDL Cholesterol", "Triglycerides"]
  }
];
