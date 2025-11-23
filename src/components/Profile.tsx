import React, { useState } from 'react';
import { User, Mail, Phone, Edit3, Check, X } from 'lucide-react';
import { UserData } from '../types';
import { parseDDMMYYYY } from '../formatDate';

interface ProfileProps {
  userData: UserData | null;
  loading: boolean;
}

export const Profile: React.FC<ProfileProps> = ({ userData, loading }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    phone: userData?.phone || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    alert('Profile update request submitted. Our team will review and apply the changes.');
  };

  const formatJoiningDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    const date = parseDDMMYYYY(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if parsing fails
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCancel = () => {
    setFormData({
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      phone: userData?.phone || ''
    });
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#231f1e] to-[#1a1715]">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] shadow-lg">
            <div className="animate-pulse">
              <div className="h-6 bg-[#2a2520] rounded mb-6 w-32"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-[#2a2520] rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#231f1e] to-[#1a1715]">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="space-y-6">
          <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">Profile</h1>
              <a
                href="https://link.apisystem.tech/widget/form/XNFVgmm2ApHSi8UisLZQ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d8ba5b] text-[#231f1e] px-4 py-2 rounded-lg font-semibold hover:bg-[#c9a852] transition-all duration-200 flex items-center space-x-2 transform hover:scale-105"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </a>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.firstName}
                      disabled={true}
                      className="w-full pl-10 pr-4 py-3 border border-[#3a342f] rounded-lg bg-[#2a2520] text-gray-300 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.lastName}
                      disabled={true}
                      className="w-full pl-10 pr-4 py-3 border border-[#3a342f] rounded-lg bg-[#2a2520] text-gray-300 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      disabled={true}
                      className="w-full pl-10 pr-4 py-3 border border-[#3a342f] rounded-lg bg-[#2a2520] text-gray-300 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      disabled={true}
                      className="w-full pl-10 pr-4 py-3 border border-[#3a342f] rounded-lg bg-[#2a2520] text-gray-300 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4">Account Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#2a2520] rounded-lg p-4 border border-[#3a342f]">
                <h3 className="font-medium text-gray-200 mb-1">Total Sessions Attended</h3>
                <p className="text-2xl font-bold text-white">{userData?.totalSessionsAttended || 0}</p>
              </div>
              <div className="bg-[#2a2520] rounded-lg p-4 border border-[#3a342f]">
                <h3 className="font-medium text-gray-200 mb-1">Last Visit</h3>
                <p className="text-lg font-semibold text-white">{userData?.lastVisit || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-3">Help & Support</h2>
            <p className="text-gray-300 mb-4">
              Please review your details regularly to ensure they are accurate. Occasionally, errors may occur during form submissions — either by you or our team. If you notice any incorrect information, kindly update your details promptly.
            </p>
            <p className="text-gray-300 mb-4">
              Need to update your profile information? Our team can help you make changes to ensure your account is always up to date.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://link.apisystem.tech/widget/survey/eyJsJkseRgLR5Cl5GHqe"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d8ba5b] text-[#231f1e] px-6 py-2 rounded-lg font-semibold hover:bg-[#c9a852] transition-all duration-200 inline-block transform hover:scale-105 text-center sm:text-left"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};