import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { 
  Power, 
  Navigation, 
  MapPin, 
  Phone, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Wallet, 
  Info, 
  TrendingUp, 
  Package 
} from 'lucide-react';

interface Props {
  lang: Language;
}

const DeliveryView: React.FC<Props> = ({ lang }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [activeJob, setActiveJob] = useState<any | null>(null);
  const [jobStep, setJobStep] = useState<'ACCEPTED' | 'PICKED_UP'>('ACCEPTED');
  const [earnings, setEarnings] = useState(1240);
  
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const handleComplete = () => {
    setEarnings(prev => prev + activeJob.payout);
    setActiveJob(null);
    setJobStep('ACCEPTED');
  };

  if (activeJob) {
      return (
          <div className="space-y-6 animate-in slide-in-from-bottom-10 max-w-2xl mx-auto pb-10">
              <div className="relative h-64 bg-gray-200 rounded-[3rem] overflow-hidden border border-gray-100 shadow-xl">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center grayscale opacity-30"></div>
                  
                  {/* Navigation Radar Animation */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-blue-500 shadow-2xl">
                      <Navigation className="w-8 h-8 text-blue-600 fill-blue-600" />
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur p-4 rounded-[2rem] flex items-center justify-between shadow-2xl border border-white">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{jobStep === 'ACCEPTED' ? 'PICKUP' : 'DROP'}</p>
                        <h2 className="text-lg font-black text-gray-900 tracking-tighter leading-none">{jobStep === 'ACCEPTED' ? activeJob.store : 'Customer Location'}</h2>
                      </div>
                      <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg">
                        <Navigation className="text-white w-5 h-5" />
                      </div>
                    </div>
                  </div>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl space-y-10 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-2 ${jobStep === 'ACCEPTED' ? 'bg-orange-500' : 'bg-blue-600'}`}></div>
                  
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${jobStep === 'ACCEPTED' ? 'bg-orange-50' : 'bg-blue-50'}`}>
                           {jobStep === 'ACCEPTED' ? <Clock className="text-orange-500 w-7 h-7" /> : <CheckCircle2 className="text-blue-500 w-7 h-7" />}
                        </div>
                        <div>
                            <p className="text-xl font-black text-gray-900 tracking-tighter">{activeJob.id}</p>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{activeJob.items}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black italic tracking-tighter text-green-600">₹{activeJob.payout}</p>
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Payout</p>
                      </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                        <div className="w-0.5 h-12 bg-gray-100"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="flex flex-col justify-between py-0.5">
                        <p className="text-xs font-bold text-gray-600 leading-none">{activeJob.storeAddress}</p>
                        <p className="text-xs font-bold text-gray-600 leading-none">{activeJob.dropAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 py-5 bg-gray-50 text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4"/> Call Store
                    </button>
                    <button className="flex-1 py-5 bg-gray-50 text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                      <Info className="w-4 h-4"/> Help
                    </button>
                  </div>

                  {jobStep === 'ACCEPTED' ? (
                      <button onClick={() => setJobStep('PICKED_UP')} className="w-full bg-orange-500 text-white py-6 rounded-[2rem] font-black shadow-xl transition-all active:scale-95 text-sm uppercase tracking-widest">
                        {t('confirmPickup')}
                      </button>
                  ) : (
                      <button onClick={handleComplete} className="w-full bg-green-600 text-white py-6 rounded-[2rem] font-black shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 text-sm uppercase tracking-widest">
                        {t('verifyDelivery')} <CheckCircle2 className="w-6 h-6"/>
                      </button>
                  )}
              </div>
          </div>
      );
  }

  return (
    <div className="space-y-8 pb-20 max-w-2xl mx-auto">
      {/* Earnings Dashboard */}
      <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Today's Earnings</p>
                <p className="text-2xl font-black text-gray-900">₹{earnings}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-2xl">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Weekly Success</p>
                <p className="text-2xl font-black text-gray-900">98%</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
          </div>
      </div>

      <div className={`p-10 rounded-[3rem] transition-all duration-1000 shadow-2xl relative overflow-hidden flex items-center justify-between border-4 ${isOnline ? 'bg-green-600 border-green-500' : 'bg-gray-900 border-gray-800'} text-white`}>
        {isOnline && <div className="absolute inset-0 bg-green-500/20 animate-pulse"></div>}
        <div className="relative z-10">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">{isOnline ? t('online') : t('offline')}</h2>
          <p className="text-white/60 font-black text-[10px] uppercase tracking-widest mt-2">{isOnline ? 'Scanning for orders...' : 'Tap to start work'}</p>
        </div>
        <button 
          onClick={() => setIsOnline(!isOnline)} 
          className={`relative z-10 p-8 rounded-full transition-all shadow-2xl active:scale-90 flex items-center justify-center ${isOnline ? 'bg-white text-green-600 rotate-180' : 'bg-red-500 text-white shadow-red-900/40'}`}
        >
          <Power className="w-10 h-10" />
        </button>
      </div>

      {isOnline && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-black text-gray-900 uppercase tracking-tighter">Nearby Requests</h3>
                <span className="flex items-center gap-1.5 text-[10px] font-black text-blue-500 uppercase tracking-widest animate-pulse">
                  <Navigation className="w-3 h-3 fill-blue-500" /> Live Scanning
                </span>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border-2 border-blue-500/10 shadow-xl space-y-8 group">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center">
                          <Package className="w-7 h-7 text-orange-600" />
                        </div>
                        <div>
                            <h4 className="font-black text-2xl text-gray-900 tracking-tight leading-none mb-1">Sri Krishna Sweets</h4>
                            <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">3.2 km away • 12 mins trip</p>
                        </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black italic text-green-600 tracking-tighter leading-none">₹65</p>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Cash</p>
                    </div>
                  </div>

                  <div className="space-y-4 py-6 border-y border-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span className="text-xs font-black text-gray-600 uppercase tracking-tight">Pickup: Bazaar Street, CBE</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs font-black text-gray-600 uppercase tracking-tight">Drop: Saibaba Colony, CBE</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveJob({
                      id: '#JOB-9921',
                      store: 'Sri Krishna Sweets',
                      storeAddress: 'Bazaar Street, Coimbatore',
                      dropAddress: 'Saibaba Colony, Coimbatore',
                      payout: 65,
                      items: '3 items (Sweets)'
                    })} 
                    className="w-full bg-gray-900 text-white py-6 rounded-[2rem] font-black shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 text-sm uppercase tracking-widest"
                  >
                    {t('acceptOrder')} <ChevronRight className="w-5 h-5"/>
                  </button>
              </div>
          </div>
      )}

      {!isOnline && (
        <div className="text-center py-20 opacity-20">
          <ShieldCheck className="w-20 h-20 mx-auto mb-4 text-gray-400" />
          <p className="text-xs font-black uppercase tracking-widest text-gray-400">Secure Protocol Active</p>
        </div>
      )}
    </div>
  );
};

export default DeliveryView;