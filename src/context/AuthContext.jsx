import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_CUSTOMER = {
  id: 'usr-customer-101',
  name: 'Shreya Sharma',
  email: 'shreya@flavorcraft.com',
  phone: '+1 (555) 389-2910',
  role: 'customer',
  addresses: [
    {
      id: 'addr-1',
      title: 'Home',
      fullName: 'Shreya Sharma',
      phone: '+1 (555) 389-2910',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'Springfield',
      zip: '97477',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Work Office',
      fullName: 'Shreya Sharma',
      phone: '+1 (555) 389-2910',
      street: '100 Tech Park Way, Suite 300',
      city: 'Springfield',
      zip: '97475',
      isDefault: false
    }
  ]
};

const DEFAULT_ADMIN = {
  id: 'usr-admin-999',
  name: 'Admin Manager',
  email: 'admin@flavorcraft.com',
  phone: '+1 (555) 999-0000',
  role: 'admin',
  addresses: []
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('flavorcraft_user');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOMER;
  });

  const [activeRole, setActiveRole] = useState(() => {
    return user ? user.role : 'customer';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('flavorcraft_user', JSON.stringify(user));
      setActiveRole(user.role);
    } else {
      localStorage.removeItem('flavorcraft_user');
      setActiveRole('customer');
    }
  }, [user]);

  const login = (email, password) => {
    if (email.toLowerCase().includes('admin')) {
      setUser(DEFAULT_ADMIN);
      return { success: true, user: DEFAULT_ADMIN };
    }
    const customerUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      phone: '+1 (555) 123-4567',
      role: 'customer',
      addresses: DEFAULT_CUSTOMER.addresses
    };
    setUser(customerUser);
    return { success: true, user: customerUser };
  };

  const signup = (name, email, phone) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      addresses: []
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const quickLoginCustomer = () => {
    setUser(DEFAULT_CUSTOMER);
    setActiveRole('customer');
  };

  const quickLoginAdmin = () => {
    setUser(DEFAULT_ADMIN);
    setActiveRole('admin');
  };

  const switchRole = (role) => {
    setActiveRole(role);
  };

  const updateProfile = (fields) => {
    setUser((prev) => (prev ? { ...prev, ...fields } : prev));
  };

  const addAddress = (newAddr) => {
    if (!user) return;
    const addrObj = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: user.addresses.length === 0 ? true : newAddr.isDefault || false
    };
    let updatedAddrs = [...user.addresses];
    if (addrObj.isDefault) {
      updatedAddrs = updatedAddrs.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddrs.push(addrObj);
    updateProfile({ addresses: updatedAddrs });
  };

  const deleteAddress = (id) => {
    if (!user) return;
    const updated = user.addresses.filter((a) => a.id !== id);
    updateProfile({ addresses: updated });
  };

  const setDefaultAddress = (id) => {
    if (!user) return;
    const updated = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    updateProfile({ addresses: updated });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activeRole,
        login,
        signup,
        logout,
        quickLoginCustomer,
        quickLoginAdmin,
        switchRole,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
