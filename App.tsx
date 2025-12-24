
import React, { useState } from 'react';
import { UserRole, Language } from './types';
import { TRANSLATIONS } from './constants';
import CustomerView from './views/CustomerView';
import ShopOwnerView from './views/ShopOwnerView';
import DeliveryView from './views/DeliveryView';
import AdminView from './views/AdminView';
import LoginView from './views/LoginView';
import { ShoppingBag, Truck, Store, Globe, LogOut, Settings, MapPin, Shield } from 'lucide-react';

const Logo = ({ size = "normal" }: { size?: "small" | "normal" | "large" }) => {
  const isLarge = size === "large";
  const isSmall = size === "small";
  
  return (
    <div className={`flex flex-col items-center justify-center ${isLarge ? 'gap-4' : 'gap-1'}`}>
      <div className="relative group">
        {/* Shield / Badge Shape */}
        <div className={`relative ${isLarge ? 'w-32 h-32' : isSmall ? 'w-10 h-10' : 'w-16 h-16'} flex items-center justify-center`}>
          <Shield className={`absolute inset-0 w-full h-full text-orange-500 fill-orange-500 shadow-xl transform group-hover:scale-105 transition-transform`} />
          
          <div className="relative z-10 flex flex-col items-center justify-center text-white">
            <div className="flex items-center -space-x-1">
              <Store className={`${isLarge ? 'w-10 h-10' : isSmall ? 'w-3 h-3' : 'w-5 h-5'}`} />
              <Truck className={`${isLarge ? 'w-12 h-12' : isSmall ? 'w-4 h-4' : 'w-6 h-6'} animate-bounce shadow-orange-900/50`} />
            </div>
          </div>

          {/* Location Pin overlay */}
          <div className={`absolute ${isLarge ? '-bottom-2 -right-2 p-2' : '-bottom-1 -right-1 p-0.5'} bg-green-600 rounded-full border-2 border-white shadow-lg`}>
            <MapPin className={`${isLarge ? 'w-5 h-5' : 'w-3 h-3'} text-white`} />
          </div>
        </div>
      </div>
      <div className="text-center">
        <h1 className={`${isLarge ? 'text-5xl' : isSmall ? 'text-sm' : 'text-xl'} font-black text-gray-900 leading-tight tracking-tighter`}>
          <span className="text-green-600">LOCAL</span> <span className="text-orange-500">DELIVERY</span>
        </h1>
        <p className={`${isLarge ? 'text-2xl' : isSmall ? 'text-[8px]' : 'text-[12px]'} font-bold text-gray-500 uppercase tracking-[0.2em] -mt-1`}>
          லோக்கல் டெலிவரி
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [lang, setLang] = useState<Language>(Language.ENGLISH);

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
  };

  const RoleCard = ({ icon: Icon, roleType, label, color, description }: { icon: any, roleType: UserRole, label: string, color: string, description: string }) => (
    <button
      onClick={() => setSelectedRole(roleType)}
      className={`flex flex-col items-start p-8 bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border-2 border-transparent hover:border-${color}-500 transition-all transform hover:-translate-y-2 w-full group relative overflow-hidden`}
    >
      <div className={`p-4 bg-${color}-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
        <Icon className={`w-8 h-8 text-${color}-600`} />
      </div>
      <span className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2">{label}</span>
      <p className="text-sm text-gray-400 font-medium text-left leading-tight">{description}</p>
      <div className={`absolute bottom-0 right-0 w-24 h-24 bg-${color}-50/30 rounded-full translate-x-12 translate-y-12 blur-2xl group-hover:blur-xl transition-all`}></div>
    </button>
  );

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          <div className="flex justify-between items-center mb-16">
            <button 
                onClick={() => setSelectedRole(UserRole.ADMIN)}
                className="p-4 bg-gray-50 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-2xl transition-all"
            >
                <Settings className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setLang(lang === Language.ENGLISH ? Language.TAMIL : Language.ENGLISH)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl shadow-xl hover:bg-black transition-all text-sm font-black tracking-widest uppercase"
            >
              <Globe className="w-4 h-4 text-green-500" />
              {lang === Language.ENGLISH ? 'தமிழ்' : 'English'}
            </button>
          </div>
          
          <div className="text-center mb-16 animate-in fade-in zoom-in duration-700">
            <Logo size="large" />
            <div className="mt-12 space-y-4">
              <p className="text-gray-400 text-sm font-black uppercase tracking-[0.4em]">{t('brandTagline')}</p>
              <div className="flex items-center justify-center gap-4 py-4">
                <span className="h-px w-12 bg-gray-100"></span>
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">{t('selectRole')}</p>
                <span className="h-px w-12 bg-gray-100"></span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-10 duration-700">
            <RoleCard 
              icon={ShoppingBag} 
              roleType={UserRole.CUSTOMER} 
              label={t('customer')} 
              color="green" 
              description={lang === 'en' ? "Shop from local favorites & get quick delivery." : "உள்ளூர் கடைகளில் ஷாப்பிங் செய்து விரைவாகப் பெறுங்கள்."}
            />
            <RoleCard 
              icon={Store} 
              roleType={UserRole.SHOP_OWNER} 
              label={t('shopOwner')} 
              color="orange" 
              description={lang === 'en' ? "Grow your local business with our delivery platform." : "எங்கள் மூலம் உங்கள் உள்ளூர் வணிகத்தை வளர்க்கவும்."}
            />
            <RoleCard 
              icon={Truck} 
              roleType={UserRole.DELIVERY_PARTNER} 
              label={t('deliveryPartner')} 
              color="blue" 
              description={lang === 'en' ? "Join as a partner & earn with every delivery." : "பார்ட்னராக இணைந்து ஒவ்வொரு டெலிவரியிலும் சம்பாதிக்கவும்."}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <LoginView 
                role={selectedRole} 
                lang={lang} 
                onLogin={handleLogin} 
                onBack={() => setSelectedRole(null)} 
            />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Logo size="small" />
        
        <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-black text-gray-900 uppercase tracking-tight">{user.name}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${user.role === UserRole.CUSTOMER ? 'bg-green-50 text-green-600' : user.role === UserRole.SHOP_OWNER ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                  {t(user.role.toLowerCase())}
                </span>
            </div>
            <div className="h-8 w-px bg-gray-100 mx-1"></div>
            <button 
                onClick={handleLogout}
                className="p-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-all"
                title={t('logout')}
            >
                <LogOut className="w-5 h-5" />
            </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 animate-in fade-in duration-500">
        {user.role === UserRole.CUSTOMER && <CustomerView lang={lang} />}
        {user.role === UserRole.SHOP_OWNER && <ShopOwnerView lang={lang} />}
        {user.role === UserRole.DELIVERY_PARTNER && <DeliveryView lang={lang} />}
        {user.role === UserRole.ADMIN && <AdminView lang={lang} />}
      </main>
    </div>
  );
};

export default App;
