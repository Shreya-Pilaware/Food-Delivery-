import React, { useState } from 'react';
import { FoodProvider } from './context/FoodContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { DishModal } from './components/DishModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutPage } from './pages/AboutPage';

function AppContent() {
  const { activeRole } = useAuth();

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedDishForModal, setSelectedDishForModal] = useState(null);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveTab('checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-orange-500 selection:text-white">
      {/* Toast Alerts */}
      <Toast />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsCartOpen={setIsCartOpen}
        setIsAuthOpen={setIsAuthOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Render Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            setSelectedCategory={setSelectedCategory}
            onSelectDish={(dish) => setSelectedDishForModal(dish)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {activeTab === 'menu' && (
          <MenuPage
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectDish={(dish) => setSelectedDishForModal(dish)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {activeTab === 'checkout' && (
          <CheckoutPage
            setActiveTab={setActiveTab}
            setIsAuthOpen={setIsAuthOpen}
          />
        )}

        {activeTab === 'tracking' && (
          <OrderTrackingPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'profile' && (
          <ProfilePage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard setActiveTab={setActiveTab} />
        )}

        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Dish Detail & Customization Modal */}
      {selectedDishForModal && (
        <DishModal
          dish={selectedDishForModal}
          onClose={() => setSelectedDishForModal(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <FoodProvider>
      <CartProvider>
        <AuthProvider>
          <OrderProvider>
            <AppContent />
          </OrderProvider>
        </AuthProvider>
      </CartProvider>
    </FoodProvider>
  );
}
