import React, { useState } from 'react';
import { Language, UserRole } from '../types';
import { TRANSLATIONS, MOCK_STORES } from '../constants';
import { Users, Store, Package, TrendingUp, CheckCircle, XCircle, ShieldCheck, Activity, AlertCircle } from 'lucide-react';

interface Props {
  lang: Language;
}

const AdminView: React.FC<Props> = ({ lang }) => {
  const [stores, setStores] = useState(MOCK_STORES);
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const toggleApproval = (id: string) => {
    setStores(prev => prev.map(s => s.id === id ? { ...s, isApproved: !s.isApproved } : s));
  };

  const StatCard = ({ icon: Icon, label, value, color, trend }: any) => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-4 relative overflow-hidden group">
      <div className={`p-4 bg-${color}-50 w-fit rounded-2xl group-hover:scale-110 transition-transform shadow-sm`}>
        <Icon className={`w-8 h-8 text-${color}-600`} />
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
        {trend && (
          <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {trend}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase text-gray-900">{t('adminDashboard')}</h2>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Global System Oversight</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] font-black text-green-500 bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                <Activity className="w-3 h-3 animate-pulse" />
                SYSTEM LIVE
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-purple-600 bg-purple-50 px-4 py-2 rounded-xl border border-purple-100 shadow-sm">
                <ShieldCheck className="w-3 h-3" />
                ROOT AUTHORIZED
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={TrendingUp} label="Platform Revenue" value="₹2,45,000" color="green" trend="+12.5% this week" />
        <StatCard icon={Store} label="Partner Stores" value={stores.length} color="orange" trend="2 new today" />
        <StatCard icon={Users} label="Total Reach" value="1,240" color="blue" trend="+40 new users" />
        <StatCard icon={Package} label="Order Volume" value="8,420" color="purple" trend="High traffic" />
      </div>

      <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">{t('manageShops')}</h3>
              <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Store Verification Queue</p>
            </div>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-gray-200">Export Registry</button>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50/50">
                        <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Shop & Owner</th>
                        <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Vertical</th>
                        <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Compliance Status</th>
                        <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Verification</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {stores.map(store => (
                        <tr key={store.id} className="hover:bg-gray-50/80 transition-all group">
                            <td className="px-10 py-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden shadow-md border-2 border-white group-hover:scale-105 transition-transform">
                                        <img src={store.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                      <p className="font-black text-gray-900 text-lg leading-none mb-1">{lang === 'en' ? store.name : store.tamilName}</p>
                                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Owner ID: {store.ownerId}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-10 py-8">
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${store.category === 'HOTEL' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                                  {store.category}
                                </span>
                            </td>
                            <td className="px-10 py-8">
                                {store.isApproved ? (
                                    <div className="flex items-center gap-2 text-green-600">
                                        <CheckCircle className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Verified Merchant</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-orange-500">
                                        <AlertCircle className="w-4 h-4 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Pending Audit</span>
                                    </div>
                                )}
                            </td>
                            <td className="px-10 py-8 text-right">
                                <button 
                                    onClick={() => toggleApproval(store.id)}
                                    className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${store.isApproved ? 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white' : 'bg-green-600 text-white hover:bg-green-700 shadow-green-100 shadow-lg'}`}
                                >
                                    {store.isApproved ? 'Suspend Access' : t('approve')}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminView;