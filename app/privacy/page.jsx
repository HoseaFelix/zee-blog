// ============================================
// src/pages/privacy.jsx
// ============================================
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { siteMetadata } from '@/lib/seo';

export default function Privacy() {
  return (
    <MainLayout
      seo={{
        title: `Privacy Policy - ${siteMetadata.title}`,
        description: 'Our privacy policy and how we handle your data',
        canonical: `${siteMetadata.siteUrl}/privacy`,
      }}
    >
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-dark max-w-none">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              Last updated: January 2025
            </p>

            <h2>Introduction</h2>
            <p>
              This Privacy Policy describes how Modern Blog collects, uses, and shares your
              personal information when you visit our website.
            </p>

            <h2>Information We Collect</h2>
            <h3>Information You Provide</h3>
            <ul>
              <li>Name and email address (when subscribing to our newsletter)</li>
              <li>Contact information (when submitting contact forms)</li>
              <li>Comments and feedback</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Send newsletters and updates (with your consent)</li>
              <li>Respond to your inquiries</li>
              <li>Analyze website usage and trends</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience. You can
              control cookie settings through your browser.
            </p>

            <h2>Third-Party Services</h2>
            <p>We may use third-party services such as:</p>
            <ul>
              <li>Google Analytics for website analytics</li>
              <li>Email service providers for newsletters</li>
              <li>Advertising networks (Google AdSense, etc.)</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information.
              However, no method of transmission over the internet is 100% secure.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>Children's Privacy</h2>
            <p>
              Our website is not intended for children under 13. We do not knowingly collect
              personal information from children.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated revision date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please <a href="/contact">contact us</a>.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

