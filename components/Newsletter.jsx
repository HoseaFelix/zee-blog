'use client'

// ============================================
// src/components/Newsletter.jsx
// ============================================
import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus(''), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Subscribe to our newsletter
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Get the latest posts delivered right to your inbox. No spam, unsubscribe anytime.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-4 text-green-600 dark:text-green-400">
          Thanks for subscribing!
        </p>
      )}
    </div>
  );
}