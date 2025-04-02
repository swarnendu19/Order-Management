
import React, { useState } from 'react';
import { Save, User, Lock, Bell, Eye, EyeOff } from 'lucide-react';

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-card border border-gray-100 overflow-hidden">
        {/* Settings tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px space-x-8 px-6">
            <a href="#" className="border-b-2 border-primary text-primary py-4 px-1 text-sm font-medium">
              Account
            </a>
            <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
              Notifications
            </a>
            <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
              Security
            </a>
            <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
              Billing
            </a>
          </nav>
        </div>
        
        {/* Settings content */}
        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sidebar */}
              <div className="space-y-6">
                <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                    AD
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Admin User</h3>
                  <p className="text-sm text-gray-500">admin@example.com</p>
                  <button className="mt-4 inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                    Upload Photo
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Account Sections</h4>
                  <nav className="space-y-1">
                    <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-primary bg-white rounded-md shadow-sm">
                      <User className="w-4 h-4 mr-3" />
                      Personal Information
                    </a>
                    <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:text-primary rounded-md">
                      <Lock className="w-4 h-4 mr-3" />
                      Password
                    </a>
                    <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:text-primary rounded-md">
                      <Bell className="w-4 h-4 mr-3" />
                      Notifications
                    </a>
                  </nav>
                </div>
              </div>
              
              {/* Main content */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          defaultValue="Admin"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          defaultValue="User"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          defaultValue="admin@example.com"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                        Phone number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          defaultValue="(555) 987-6543"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Password</h3>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        Current password
                      </label>
                      <div className="mt-1 relative">
                        <input
                          id="current-password"
                          name="current-password"
                          type={showPassword ? 'text' : 'password'}
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md pr-10"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        New password
                      </label>
                      <div className="mt-1">
                        <input
                          id="new-password"
                          name="new-password"
                          type="password"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm password
                      </label>
                      <div className="mt-1">
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type="password"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
