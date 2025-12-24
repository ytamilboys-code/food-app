
import { TranslationStrings, UserRole } from './types';

export const TRANSLATIONS: TranslationStrings = {
  welcome: { en: "Welcome to Local Delivery", ta: "லோக்கல் டெலிவரிக்கு உங்களை வரவேற்கிறோம்" },
  selectRole: { en: "Select Your Role", ta: "உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்" },
  customer: { en: "Customer", ta: "வாடிக்கையாளர்" },
  shopOwner: { en: "Shop Owner", ta: "கடைக்காரர்" },
  deliveryPartner: { en: "Delivery Partner", ta: "டெலிவரி பார்ட்னர்" },
  admin: { en: "Admin", ta: "நிர்வாகி" },
  storesNearby: { en: "Stores Nearby", ta: "அருகிலுள்ள கடைகள்" },
  grocery: { en: "Grocery", ta: "மளிகை" },
  medical: { en: "Medical", ta: "மருந்து" },
  hotel: { en: "Hotel", ta: "ஹோட்டல்" },
  searchProducts: { en: "Search products...", ta: "தயாரிப்புகளைத் தேடுங்கள்..." },
  addToCart: { en: "Add to Cart", ta: "கூடையில் சேர்க்கவும்" },
  placeOrder: { en: "Place Order", ta: "ஆர்டர் செய்யுங்கள்" },
  orderHistory: { en: "Order History", ta: "ஆர்டர் வரலாறு" },
  earnings: { en: "Earnings", ta: "வருமானம்" },
  readyForPickup: { en: "Ready for Pickup", ta: "டெலிவரிக்குத் தயார்" },
  acceptOrder: { en: "Accept Order", ta: "ஆர்டரை ஏற்கவும்" },
  online: { en: "Online", ta: "ஆன்லைன்" },
  offline: { en: "Offline", ta: "ஆஃப்லைன்" },
  backToRoles: { en: "Switch Role", ta: "பங்கை மாற்றவும்" },
  login: { en: "Login", ta: "உள்நுழைக" },
  mobileNumber: { en: "Mobile Number", ta: "மொபைல் எண்" },
  password: { en: "Password", ta: "கடவுச்சொல்" },
  getOTP: { en: "Get OTP", ta: "OTP பெறுங்கள்" },
  enterOTP: { en: "Enter OTP", ta: "OTP-ஐ உள்ளிடவும்" },
  brandTagline: { en: "Your nearby shop – at your doorstep", ta: "உங்கள் அருகிலுள்ள கடை – உங்கள் வீட்டுக்கு" },
  logout: { en: "Logout", ta: "வெளியேறு" },
  myCart: { en: "My Cart", ta: "எனது கூடை" },
  activeOrders: { en: "Active Orders", ta: "செயலில் உள்ள ஆர்டர்கள்" },
  inventory: { en: "Inventory", ta: "சரக்கு" },
  stats: { en: "Stats", ta: "புள்ளிவிவரம்" },
  adminDashboard: { en: "Admin Dashboard", ta: "நிர்வாகப் பலகம்" },
  manageShops: { en: "Manage Shops", ta: "கடைகளை நிர்வகி" },
  approve: { en: "Approve", ta: "அங்கீகரி" },
  pendingApproval: { en: "Pending Approval", ta: "அங்கீகாரத்திற்காக காத்திருக்கிறது" },
  pickup: { en: "Pickup", ta: "பிக்கப்" },
  drop: { en: "Drop", ta: "டிராப்" },
  confirmPickup: { en: "Confirm Pickup", ta: "பிக்கப்பை உறுதிப்படுத்து" },
  verifyDelivery: { en: "Verify Delivery", ta: "டெலிவரியை சரிபார்" },
  orderReady: { en: "Order Ready", ta: "ஆர்டர் தயார்" },
  searchingPartner: { en: "Searching for partner", ta: "பார்ட்னரைத் தேடுகிறது" },
  all: { en: "All", ta: "அனைத்தும்" }
};

export const MOCK_STORES = [
  { id: '1', name: 'Sri Krishna Sweets', tamilName: 'ஸ்ரீ கிருஷ்ணா ஸ்வீட்ஸ்', category: 'HOTEL', rating: 4.5, image: 'https://images.unsplash.com/photo-1596797038530-2c39fa81b487?auto=format&fit=crop&q=80&w=400', isApproved: true, ownerId: 's1' },
  { id: '2', name: 'City Grocery Mart', tamilName: 'சிட்டி மளிகை மார்ட்', category: 'GROCERY', rating: 4.2, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400', isApproved: true, ownerId: 's2' },
  { id: '3', name: 'Apollo Pharmacy', tamilName: 'அப்போலோ பார்மசி', category: 'MEDICAL', rating: 4.8, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=400', isApproved: true, ownerId: 's3' },
  { id: '4', name: 'New Village Shop', tamilName: 'புதிய கிராமத்துக் கடை', category: 'GROCERY', rating: 0.0, image: 'https://images.unsplash.com/photo-1534723452862-4c874e70d6f2?auto=format&fit=crop&q=80&w=400', isApproved: false, ownerId: 's4' },
];

export const MOCK_PRODUCTS = [
  { id: 'p1', storeId: '2', name: 'Fresh Milk', tamilName: 'புதிய பால்', price: 30, image: 'https://images.unsplash.com/photo-1563636619-e9107da5a76a?auto=format&fit=crop&q=80&w=200', stock: 50 },
  { id: 'p2', storeId: '2', name: 'Rice 5kg', tamilName: 'அரிசி 5 கிலோ', price: 250, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200', stock: 20 },
  { id: 'p3', storeId: '1', name: 'Laddu Box', tamilName: 'லட்டு பெட்டி', price: 150, image: 'https://images.unsplash.com/photo-1621447509374-f8f972750849?auto=format&fit=crop&q=80&w=200', stock: 15 },
  { id: 'p4', storeId: '1', name: 'Mysore Pak', tamilName: 'மைசூர் பாக்', price: 200, image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=200', stock: 10 },
];
