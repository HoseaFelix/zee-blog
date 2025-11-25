// app/about/page.jsx
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { siteMetadata } from '@/lib/seo';

export default function AboutPage() {
  return (
    <MainLayout
      seo={{
        title: `About - ${siteMetadata.title}`,
        description: 'Learn more about our mission and team',
        canonical: `${siteMetadata.siteUrl}/about`,
      }}
    >
      <section className="py-16 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Empowering readers with expert insights and practical knowledge
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-dark max-w-none">
            <h2>Our Mission</h2>
            <p>
              Modern Blog is dedicated to providing high-quality, actionable content on personal
              finance, insurance, investing, technology, and business. Our mission is to help
              readers make informed decisions and achieve their financial and professional goals.
            </p>

            <h2>What We Cover</h2>
            <ul>
              <li>
                <strong>Personal Finance:</strong> Budgeting, saving, and building wealth
              </li>
              <li>
                <strong>Insurance:</strong> Health, auto, life, and property insurance guides
              </li>
              <li>
                <strong>Investing:</strong> Stocks, bonds, mutual funds, and retirement planning
              </li>
              <li>
                <strong>Technology:</strong> SaaS tools, cybersecurity, and digital trends
              </li>
              <li>
                <strong>Business:</strong> Legal advice, growth strategies, and entrepreneurship
              </li>
            </ul>

            <h2>Our Team</h2>
            <p>
              Our content is created by experienced writers and industry experts who are passionate
              about sharing knowledge and helping others succeed. Each article is thoroughly
              researched and fact-checked to ensure accuracy and reliability.
            </p>

            <h2>Contact Us</h2>
            <p>
              Have questions or suggestions? We'd love to hear from you. Visit our{' '}
              <a href="/contact">contact page</a> to get in touch.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
