
import React, { useState } from 'react';
import { UserRole, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Phone, Lock, ArrowRight, ShieldCheck, ChevronLeft, Fingerprint } from 'lucide-react';
import OtpInput from '../components/OtpInput';
import ResendTimer from '../components/ResendTimer';

interface Props {
  role: UserRole;
  lang: Language;
  onLogin: (userData: any) => void;
  onBack: () => void;
}

const LoginView: React.FC<Props> = ({ role, lang, onLogin, onBack }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Network Delay
    setTimeout(() => {
      setLoading(false);
      if (role === UserRole.SHOP_OWNER) {
        // Shop Owner uses Password Flow
        onLogin({ name: 'Shop Manager', role });
      } else {
        // Customer & Delivery use OTP Flow
        if (!showOTP) {
          setShowOTP(true);
        } else {
          // Check if OTP is complete
          if (otp.join('').length === 6) {
            onLogin({ 
              name: role === UserRole.CUSTOMER ? 'Ravi Kumar' : 'Vijay (Partner)', 
              role 
            });
          } else {
            // Minimal validation feedback could be added here
            alert(lang === 'en' ? 'Please enter a valid 6-digit OTP' : 'தயவுசெய்து சரியான 6-இலக்க OTP-ஐ உள்ளிடவும்');
          }
        }
      }
    }, 1000);
  };

  const handleResendOtp = () => {
    console.log('Resending OTP to:', mobile);
    // Add real resend logic here
  };

  const getRoleTheme = () => {
    switch(role) {
      case UserRole.CUSTOMER: 
        return { color: 'green', icon: Fingerprint, desc: lang === 'en' ? 'Quick OTP Login' : 'விரைவான OTP உள்நுழைவு' };
      case UserRole.SHOP_OWNER: 
        return { color: 'orange', icon: Lock, desc: lang === 'en' ? 'Merchant Dashboard Access' : 'வணிகர் டேஷ்போர்டு அணுகல்' };
      case UserRole.DELIVERY_PARTNER: 
        return { color: 'blue', icon: ShieldCheck, desc: lang === 'en' ? 'Partner Secure Login' : 'பார்ட்னர் பாதுகாப்பான உள்நுழைவு' };
      default: 
        return { color: 'gray', icon: ShieldCheck, desc: '' };
    }
  };

  const theme = getRoleTheme();
  const color = theme.color;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-50/50">
      {/* Role Indicator Header */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between px-2">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-gray-400 hover:text-gray-900 font-bold transition-all group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest">{t('backToRoles')}</span>
        </button>
        <div className={`px-4 py-1.5 rounded-full bg-${color}-50 border border-${color}-100 flex items-center gap-2`}>
          <div className={`w-2 h-2 rounded-full bg-${color}-500 animate-pulse`}></div>
          <span className={`text-[10px] font-black uppercase tracking-widest text-${color}-700`}>{role.replace('_', ' ')}</span>
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 p-10 border border-gray-100 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 bg-${color}-50 rounded-full blur-3xl opacity-50`}></div>

        <div className="text-center mb-10 relative z-10">
          <div className={`w-24 h-24 bg-${color}-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 border-2 border-${color}-100 shadow-inner`}>
            <theme.icon className={`w-12 h-12 text-${color}-600`} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-2 leading-none">
            {t(role.toLowerCase())} <br/> {t('login')}
          </h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">{theme.desc}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {!showOTP ? (
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-gray-200 pr-3">
                  <Phone className={`w-4 h-4 text-${color}-500`} />
                  <span className="text-sm font-black text-gray-400">+91</span>
                </div>
                <input 
                  type="tel" 
                  required
                  pattern="[0-9]{10}"
                  placeholder={t('mobileNumber')}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={`w-full pl-24 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-${color}-500 focus:bg-white rounded-3xl outline-none transition-all font-black text-lg placeholder:text-gray-300`}
                />
              </div>

              {role === UserRole.SHOP_OWNER && (
                <div className="space-y-3">
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-orange-500 transition-colors" />
                    <input 
                      type="password" 
                      required
                      placeholder={t('password')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-3xl outline-none transition-all font-black text-lg placeholder:text-gray-300"
                    />
                  </div>
                  <button type="button" className="text-xs font-black text-orange-500 uppercase tracking-widest hover:text-orange-600 transition-colors pl-2">
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <p className="text-sm text-gray-500 font-medium mb-1">Enter the 6-digit code sent to</p>
                <p className="text-lg font-black text-gray-900 tracking-tight">+91 {mobile}</p>
              </div>
              
              <OtpInput 
                length={6} 
                value={otp} 
                onChange={setOtp} 
                color={color} 
              />

              <ResendTimer 
                initialSeconds={30} 
                onResend={handleResendOtp} 
                color={color} 
              />
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-${color}-600 hover:bg-${color}-700 disabled:opacity-50 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-${color}-200 flex items-center justify-center gap-3 transition-all active:scale-95 group relative overflow-hidden`}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="uppercase tracking-widest text-sm">
                  {showOTP ? t('login') : (role === UserRole.SHOP_OWNER ? t('login') : t('getOTP'))}
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer info */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-gray-300 font-black text-[10px] uppercase tracking-[0.3em]">
          <ShieldCheck className="w-4 h-4" />
          Secure Merchant & Partner Portal
        </div>
        <p className="text-gray-400 text-[10px] font-bold text-center max-w-[250px] leading-relaxed">
          By continuing, you agree to Local Delivery's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginView;
