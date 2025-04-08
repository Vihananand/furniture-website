"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

const VALID_CATEGORIES = [
  'Carved-Sofas',
  'Chesterfield-Lounger-Sofa',
  'Dining-Lighting',
  'Ottoman-Bench-Sofa'
];

export default function AdminDashboard() {
  const [categoryName, setCategoryName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
    if (!isAuthenticated) {
      router.push('/admin9876');
    }
  }, [router]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      // Check file type
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setError('File must be JPG, PNG, or GIF');
        return;
      }
      setSelectedFile(file);
      setError('');
    }
  };

  const uploadToSupabase = async (file, category) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${category}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    return filePath;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate category
    if (!VALID_CATEGORIES.includes(categoryName)) {
      setError('Please select a valid category');
      setIsLoading(false);
      return;
    }

    try {
      if (!selectedFile) {
        throw new Error('Please select an image file');
      }

      // Upload file to Supabase storage
      const filePath = await uploadToSupabase(selectedFile, categoryName);

      // Get public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      // Add record to your products table (if you have one)
      const { error: dbError } = await supabase
        .from('products')
        .insert([
          {
            category: categoryName,
            image_path: filePath,
            image_url: publicUrl,
            created_at: new Date()
          }
        ]);

      if (dbError) throw dbError;

      // Reset form
      setCategoryName('');
      setSelectedFile(null);
      setSuccess('Product added successfully!');
    } catch (err) {
      setError(err.message || 'An error occurred while submitting the form');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('password', currentPassword)
        .single();

      if (adminError) throw adminError;

      if (!adminData) {
        setError('Current password is incorrect');
        setIsLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ password: newPassword })
        .eq('id', adminData.id);

      if (updateError) throw updateError;

      setSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } catch (err) {
      setError('An error occurred while changing the password');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin9876');
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-42 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:cursor-pointer"
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {showPasswordForm ? (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#526D5F] focus:ring-[#526D5F] sm:text-sm px-4 py-2"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#526D5F] focus:ring-[#526D5F] sm:text-sm px-4 py-2"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#526D5F] focus:ring-[#526D5F] sm:text-sm px-4 py-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#526D5F] hover:bg-[#3A4F44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#526D5F]"
                >
                  {isLoading ? 'Changing Password...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#526D5F] focus:ring-[#526D5F] sm:text-sm px-4 py-2"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {VALID_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category.replace(/-/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#526D5F] hover:text-[#3A4F44] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-ring-[#526D5F]"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/gif"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected file: {selectedFile.name}
                  </p>
                )}
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              {success && (
                <div className="text-green-500 text-sm text-center">{success}</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#526D5F] hover:bg-[#3A4F44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#526D5F]"
                >
                  {isLoading ? 'Uploading...' : 'Upload Product'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 