import { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileTab from './tabs/ProfileTab';
import OrdersTab from '../../pages/Profile/tabs/Order/OrdersTab';
import WishlistTab from './tabs/WishlistTab';
import { HistoryTab, PaymentTab } from './tabs/EmtyStateTabs';
import SettingsTab from './tabs/SettingsTab';
import { userData } from '../../service/profileData';

export default function FashionUserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(userData);

  // Render tab content theo activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab user={user} />;
      case 'orders':
        return <OrdersTab />;
      case 'wishlist':
        return <WishlistTab />;
      case 'history':
        return <HistoryTab />;
      case 'payment':
        return <PaymentTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <ProfileTab user={user} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 mt-20">
      {/* Sidebar */}
      <ProfileSidebar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main content */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
}