
// ============================================
// src/pages/advertise.jsx
// ============================================
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { siteMetadata } from '@/lib/seo';

export default function Advertise() {
  return (
    <MainLayout
      seo={{
        title: `Advertise With Us - ${siteMetadata.title}`,
        description: 'Reach our engaged audience of finance and tech enthusiasts',
        canonical: `${siteMetadata.siteUrl}/advertise`,
      }}
    >
      <section className="py-16 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Advertise With Us
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Reach thousands of engaged readers
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-dark max-w-none">
            <h2>Why Advertise With Modern Blog?</h2>
            
            <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  50K+
                </div>
                <p className="text-gray-600 dark:text-gray-400">Monthly Readers</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  70%
                </div>
                <p className="text-gray-600 dark:text-gray-400">Return Visitors</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  4min
                </div>
                <p className="text-gray-600 dark:text-gray-400">Avg. Time on Site</p>
              </div>
            </div>

            <h2>Our Audience</h2>
            <p>
              Our readers are professionals, entrepreneurs, and individuals seeking expert advice on:
            </p>
            <ul>
              <li>Personal finance and investing</li>
              <li>Insurance and risk management</li>
              <li>SaaS and technology solutions</li>
              <li>Business growth and legal matters</li>
            </ul>

            <h2>Advertising Options</h2>
            <ul>
              <li>
                <strong>Display Ads:</strong> Banner ads in various sizes (leaderboard, sidebar, in-content)
              </li>
              <li>
                <strong>Sponsored Content:</strong> Native articles written by our team
              </li>
              <li>
                <strong>Newsletter Sponsorship:</strong> Reach subscribers directly
              </li>
              <li>
                <strong>Custom Campaigns:</strong> Tailored solutions for your brand
              </li>
            </ul>

            <h2>Get Started</h2>
            <p>
              Interested in advertising with us? <a href="/contact">Contact us</a> for our media
              kit and pricing information.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}