
import React, { useState, useEffect } from 'react';
import { Language, Store, Product } from '../types';
import { MOCK_STORES, MOCK_PRODUCTS, TRANSLATIONS } from '../constants';
import { Search, Star, MapPin, ShoppingCart, Clock, ChevronRight, X, Minus, Plus, Navigation, PackageCheck, Truck, Home } from 'lucide-react';

interface Props {
  lang: Language;
}

const CustomerView: React.FC<Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'EXPLORE' | 'HISTORY' | 'TRACKING'>('EXPLORE');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [showCart, setShowCart] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any | null>(null);

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  // Real-time status update simulation
  useEffect(() => {
    if (activeOrder && activeOrder.status !== 'DELIVERED') {
      const timer = setTimeout(() => {
        const statuses = ['PLACED', 'ACCEPTED', 'PICKED_UP', 'DELIVERED'];
        const currentIndex = statuses.indexOf(activeOrder.status);
        if (currentIndex < statuses.length - 1) {
          setActiveOrder({ ...activeOrder, status: statuses[currentIndex + 1] });
        }
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [activeOrder]);

  const approvedStores = MOCK_STORES.filter(s => s.isApproved);
  const filteredStores = approvedStores.filter(s => {
    const categoryMatch = selectedCategory === 'ALL' || s.category === selectedCategory;
    const searchMatch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      s.tamilName.includes(searchQuery);
    return categoryMatch && searchMatch;
  });

  const updateCart = (productId: string, delta: number) => {
    setCart(prev => {
      const newQty = (prev[productId] || 0) + delta;
      if (newQty <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const cartTotalItems = (Object.values(cart) as number[]).reduce((a, b) => a + b, 0);
  const cartTotalPrice = (Object.entries(cart) as [string, number][]).reduce((acc, [id, qty]) => {
    const p = MOCK_PRODUCTS.find(p => p.id === id);
    return acc + (p?.price || 0) * qty;
  }, 0);

  const handlePlaceOrder = () => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      items: Object.keys(cart).length,
      total: cartTotalPrice,
      status: 'PLACED',
      timestamp: new Date().toLocaleTimeString(),
    };
    setActiveOrder(newOrder);
    setCart({});
    setShowCart(false);
    setActiveTab('TRACKING');
  };

  return (
    <div className="space-y-6 pb-24 max-w-2xl mx-auto">
      {/* Dynamic Nav Pills */}
      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100 sticky top-20 z-40">
        <button 
          onClick={() => setActiveTab('EXPLORE')}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'EXPLORE' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400'}`}
        >
          <Search className="w-4 h-4" /> {lang === 'en' ? 'EXPLORE' : 'தேடுக'}
        </button>
        {activeOrder && (
          <button 
            onClick={() => setActiveTab('TRACKING')}
            className={`flex-1 py-3 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'TRACKING' ? 'bg-orange-500 text-white shadow-lg animate-pulse' : 'text-orange-400'}`}
          >
            <Navigation className="w-4 h-4" /> {lang === 'en' ? 'TRACK' : 'ட்ராக்'}
          </button>
        )}
        <button 
          onClick={() => setActiveTab('HISTORY')}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'HISTORY' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400'}`}
        >
          <Clock className="w-4 h-4" /> {lang === 'en' ? 'HISTORY' : 'வரலாறு'}
        </button>
      </div>

      {activeTab === 'EXPLORE' && (
        <div className="animate-in fade-in duration-500 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1 text-gray-500">
              <MapPin className="w-4 h-4 text-orange-600" />
              <p className="text-xs font-black uppercase tracking-tight">Gandhipuram, Coimbatore <span className="text-orange-500 ml-1">▼</span></p>
            </div>
            
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-500 transition-colors" />
              <input 
                type="text" 
                placeholder={t('searchProducts')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-5 bg-white border-2 border-transparent focus:border-green-500 rounded-3xl shadow-sm outline-none font-bold text-sm transition-all" 
              />
            </div>

            <div className="flex overflow-x-auto gap-2 py-2 no-scrollbar">
              {['ALL', 'GROCERY', 'MEDICAL', 'HOTEL'].map(id => (
                <button
                  key={id}
                  onClick={() => setSelectedCategory(id)}
                  className={`px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${selectedCategory === id ? 'bg-green-600 border-green-600 text-white shadow-md' : 'bg-white border-gray-50 text-gray-400 hover:border-green-100'}`}
                >
                  {t(id.toLowerCase())}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredStores.map(store => (
              <div key={store.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 group">
                <div className="relative h-48">
                  <img src={store.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={store.name} />
                  <div className="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-xl flex items-center gap-1 font-black text-xs shadow-lg">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {store.rating || 'NEW'}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-1">{lang === 'en' ? store.name : store.tamilName}</h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-6">{store.category} • 25 MINS DELIVERY</p>
                  
                  <div className="space-y-3">
                    {MOCK_PRODUCTS.filter(p => p.storeId === store.id).map(product => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-green-100 transition-all">
                        <div className="flex items-center gap-4">
                          <img src={product.image} className="w-14 h-14 rounded-xl object-cover shadow-sm" alt={product.name} />
                          <div>
                            <p className="text-sm font-black text-gray-800">{lang === 'en' ? product.name : product.tamilName}</p>
                            <p className="text-xs font-bold text-green-600">₹{product.price}</p>
                          </div>
                        </div>
                        {cart[product.id] ? (
                          <div className="flex items-center gap-3 bg-white border-2 border-green-600 p-1.5 rounded-xl">
                            <button onClick={() => updateCart(product.id, -1)} className="p-1 hover:bg-green-50 rounded-lg text-green-600 transition-colors"><Minus className="w-4 h-4"/></button>
                            <span className="font-black text-sm w-4 text-center">{cart[product.id]}</span>
                            <button onClick={() => updateCart(product.id, 1)} className="p-1 hover:bg-green-50 rounded-lg text-green-600 transition-colors"><Plus className="w-4 h-4"/></button>
                          </div>
                        ) : (
                          <button onClick={() => updateCart(product.id, 1)} className="bg-green-600 text-white font-black text-[10px] px-6 py-3 rounded-xl uppercase tracking-widest shadow-lg active:scale-95 transition-all">Add</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'TRACKING' && activeOrder && (
        <div className="animate-in slide-in-from-bottom-5 duration-500 space-y-6">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 text-center space-y-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
                <div 
                  className="h-full bg-green-500 transition-all duration-1000" 
                  style={{ width: activeOrder.status === 'PLACED' ? '25%' : activeOrder.status === 'ACCEPTED' ? '50%' : activeOrder.status === 'PICKED_UP' ? '75%' : '100%' }}
                />
            </div>

            <div className="relative w-28 h-28 mx-auto">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25"></div>
              <div className="relative bg-white w-full h-full rounded-full flex items-center justify-center border-4 border-green-500 shadow-xl">
                 {activeOrder.status === 'DELIVERED' ? <Home className="w-12 h-12 text-green-600" /> : <Truck className="w-12 h-12 text-green-600 animate-bounce" />}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2">{activeOrder.id}</h2>
              <p className="text-green-600 font-black uppercase text-[10px] tracking-widest">
                {activeOrder.status === 'PLACED' ? t('searchingPartner') : 
                 activeOrder.status === 'ACCEPTED' ? 'Store is preparing your order' : 
                 activeOrder.status === 'PICKED_UP' ? 'Partner is on the way' : 'Delivered Successfully!'}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 px-6 pt-4">
               {['Placed', 'Ready', 'Road', 'Home'].map((step, i) => {
                 const currentIdx = ['PLACED', 'ACCEPTED', 'PICKED_UP', 'DELIVERED'].indexOf(activeOrder.status);
                 return (
                    <div key={step} className="flex flex-col items-center gap-2">
                       <div className={`w-3 h-3 rounded-full ${currentIdx >= i ? 'bg-green-500 scale-125' : 'bg-gray-200'}`} />
                       <span className={`text-[8px] font-black uppercase tracking-widest ${currentIdx >= i ? 'text-green-600' : 'text-gray-300'}`}>{step}</span>
                    </div>
                 )
               })}
            </div>

            <div className="bg-gray-50 p-6 rounded-[2rem] text-left border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                   <Truck className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                   <p className="text-xs font-black text-gray-800">Senthil (Partner)</p>
                   <p className="text-[10px] text-gray-400 font-bold">Arriving in 8 mins</p>
                </div>
              </div>
              <button className="bg-white p-3 rounded-xl shadow-sm border border-gray-100"><Truck className="w-5 h-5 text-green-600"/></button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'HISTORY' && (
        <div className="space-y-4 animate-in fade-in">
          <h2 className="text-xl font-black text-gray-900 px-2 uppercase tracking-tighter">{t('orderHistory')}</h2>
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between hover:border-green-100 transition-all cursor-pointer shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                  <PackageCheck className="text-green-600 w-6 h-6"/>
                </div>
                <div>
                  <p className="font-black text-gray-800 text-sm uppercase tracking-tight">ORD-449{i}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Success • May 1{i}, 2024</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-gray-900">₹{150 * i}</p>
                <ChevronRight className="w-4 h-4 text-gray-300 ml-auto mt-1" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Persistent View */}
      {cartTotalItems > 0 && !showCart && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50">
          <button 
            onClick={() => setShowCart(true)} 
            className="w-full bg-gray-900 text-white py-5 rounded-3xl shadow-2xl flex justify-between px-8 items-center font-black animate-in slide-in-from-bottom-10"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-1.5 rounded-lg">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span className="text-xs uppercase tracking-widest">{cartTotalItems} ITEMS • ₹{cartTotalPrice}</span>
            </div>
            <span className="uppercase text-[10px] tracking-widest flex items-center gap-2">{t('myCart')} <ChevronRight className="w-4 h-4"/></span>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-sm flex items-end">
          <div className="bg-white w-full max-w-md rounded-t-[3rem] p-10 animate-in slide-in-from-bottom-20 mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-green-600" />
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black uppercase tracking-tighter">{t('myCart')}</h3>
              <button onClick={() => setShowCart(false)} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-all"><X/></button>
            </div>
            
            <div className="space-y-6 mb-10 max-h-[40vh] overflow-y-auto no-scrollbar">
              {(Object.entries(cart) as [string, number][]).map(([id, qty]) => {
                const p = MOCK_PRODUCTS.find(p => p.id === id);
                return (
                  <div key={id} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-black text-gray-800">{lang === 'en' ? p?.name : p?.tamilName}</p>
                      <p className="text-[10px] font-bold text-gray-400">₹{p?.price} x {qty}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                        <button onClick={() => updateCart(id, -1)} className="p-1 hover:bg-white rounded-lg transition-colors"><Minus className="w-3 h-3"/></button>
                        <span className="text-xs font-black w-4 text-center">{qty}</span>
                        <button onClick={() => updateCart(id, 1)} className="p-1 hover:bg-white rounded-lg transition-colors"><Plus className="w-3 h-3"/></button>
                      </div>
                      <span className="font-black text-sm text-gray-900 w-12 text-right">₹{(p?.price || 0) * qty}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100 mb-8">
              <div className="flex justify-between items-center text-gray-900 font-black">
                <span className="text-xs uppercase tracking-widest">Total Pay</span>
                <span className="text-3xl italic tracking-tighter">₹{cartTotalPrice + 25}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder} 
              className="w-full bg-green-600 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-green-700 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3"
            >
              {t('placeOrder')} <Navigation className="w-5 h-5 fill-white"/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerView;
