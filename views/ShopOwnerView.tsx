
import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, MOCK_PRODUCTS } from '../constants';
import { Plus, Package, Clock, CheckCircle, DollarSign, X, Save, Edit2, Trash2, ArrowUpRight, TrendingUp } from 'lucide-react';

interface Props {
  lang: Language;
}

const ShopOwnerView: React.FC<Props> = ({ lang }) => {
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;
  const [activeTab, setActiveTab] = useState<'ORDERS' | 'PRODUCTS'>('ORDERS');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState(MOCK_PRODUCTS.filter(p => p.storeId === '1' || p.storeId === '2'));
  const [newProduct, setNewProduct] = useState({ name: '', tamil: '', price: '', stock: '' });

  const [orders, setOrders] = useState([
    { id: '#ORD-2201', customer: 'Arun Kumar', status: 'PENDING', total: 450, items: '2x Fresh Milk', time: 'Just now' },
    { id: '#ORD-2198', customer: 'Ravi Teja', status: 'ACCEPTED', total: 120, items: '1x Laddu Box', time: '1h ago' },
  ]);

  const handleUpdateStatus = (id: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const deleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const prod = {
      id: `p${Date.now()}`,
      storeId: '1',
      name: newProduct.name,
      tamilName: newProduct.tamil,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200'
    };
    setProducts([prod, ...products]);
    setNewProduct({ name: '', tamil: '', price: '', stock: '' });
    setShowAddProduct(false);
  };

  return (
    <div className="space-y-8 pb-10 max-w-2xl mx-auto">
      {/* Merchant Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Today's Sales</p>
              <p className="text-2xl font-black text-gray-900 tracking-tighter">₹12,450</p>
            </div>
            <div className="p-4 bg-green-50 rounded-2xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active</p>
              <p className="text-2xl font-black text-gray-900 tracking-tighter">{orders.filter(o => o.status !== 'CANCELLED').length}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-2xl">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
        </div>
      </div>

      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
        <button 
          onClick={() => setActiveTab('ORDERS')} 
          className={`flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'ORDERS' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400'}`}
        >
          {t('activeOrders')}
        </button>
        <button 
          onClick={() => setActiveTab('PRODUCTS')} 
          className={`flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'PRODUCTS' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400'}`}
        >
          {t('inventory')}
        </button>
      </div>

      {activeTab === 'ORDERS' ? (
        <div className="space-y-5 animate-in fade-in duration-300">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-black text-xl text-gray-900">{order.customer}</h4>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{order.id} • {order.time}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'PENDING' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>{order.status}</span>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-2xl flex items-center justify-between">
                <span className="text-sm font-bold text-gray-600">{order.items}</span>
                <span className="text-xl font-black italic tracking-tighter">₹{order.total}</span>
              </div>
              
              <div className="flex gap-3 pt-2">
                {order.status === 'PENDING' ? (
                   <>
                     <button onClick={() => handleUpdateStatus(order.id, 'CANCELLED')} className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest">Reject</button>
                     <button onClick={() => handleUpdateStatus(order.id, 'ACCEPTED')} className="flex-[2] py-4 bg-orange-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2">
                       Accept Order <ArrowUpRight className="w-4 h-4" />
                     </button>
                   </>
                ) : (
                   <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2">
                     <CheckCircle className="w-4 h-4"/> {t('orderReady')}
                   </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
            <button 
              onClick={() => setShowAddProduct(true)} 
              className="w-full bg-white text-orange-600 border-2 border-dashed border-orange-200 py-6 rounded-[2.5rem] font-black flex items-center justify-center gap-3 hover:bg-orange-50 transition-all"
            >
              <Plus className="w-6 h-6"/>
              <span className="uppercase tracking-widest text-xs">Add New Product</span>
            </button>

            <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Inventory Status</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {products.map(p => (
                    <div key={p.id} className="p-6 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <img src={p.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-gray-100" alt={p.name} />
                            <div>
                                <p className="font-black text-gray-900">{lang === 'en' ? p.name : p.tamilName}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-xs font-bold text-green-600">₹{p.price}</span>
                                  <span className={`text-[10px] font-black uppercase tracking-widest ${p.stock < 15 ? 'text-red-500' : 'text-gray-400'}`}>Stock: {p.stock}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-3 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-500 rounded-xl transition-all"><Edit2 className="w-4 h-4"/></button>
                            <button onClick={() => deleteProduct(p.id)} className="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                        </div>
                    </div>
                ))}
              </div>
            </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProduct && (
          <div className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl space-y-8 animate-in zoom-in duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-500" />
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Add Product</h3>
                    <button onClick={() => setShowAddProduct(false)} className="p-2 hover:bg-gray-50 rounded-full"><X className="text-gray-400"/></button>
                  </div>
                  
                  <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g., Fresh Milk" 
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl font-bold text-sm outline-none transition-all" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Price (₹)</label>
                          <input 
                            type="number" 
                            placeholder="45" 
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl font-bold text-sm outline-none transition-all" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Stock</label>
                          <input 
                            type="number" 
                            placeholder="100" 
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                            className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl font-bold text-sm outline-none transition-all" 
                          />
                        </div>
                      </div>
                  </div>
                  
                  <button 
                    onClick={handleAddProduct} 
                    className="w-full bg-orange-500 text-white py-5 rounded-[2rem] font-black shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all text-sm uppercase tracking-widest"
                  >
                    <Save className="w-5 h-5"/> Save Item
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default ShopOwnerView;
