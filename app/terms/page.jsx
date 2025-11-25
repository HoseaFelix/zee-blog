// ============================================
// src/pages/terms.jsx
// ============================================
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { siteMetadata } from '@/lib/seo';

export default function Terms() {
  return (
    <MainLayout
      seo={{
        title: `Terms of Service - ${siteMetadata.title}`,
        description: 'Terms and conditions for using our website',
        canonical: `${siteMetadata.siteUrl}/terms`,
      }}
    >
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg dark:prose-dark max-w-none">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              Last updated: January 2025
            </p>

            <h2>Agreement to Terms</h2>
            <p>
              By accessing and using ZEE BlOG, you agree to be bound by these Terms of Service
              and all applicable laws and regulations.
            </p>

            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on ZEE
              BlOG for personal, non-commercial transitory viewing only.
            </p>

            <h3>This license shall not allow you to:</h3>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes</li>
              <li>Remove copyright or proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>

            <h2>Disclaimer</h2>
            <p>
              The materials on ZEE BlOG are provided on an 'as is' basis. We make no warranties,
              expressed or implied, and hereby disclaim all other warranties.
            </p>

            <h2>Content Accuracy</h2>
            <p>
              While we strive for accuracy, the information on this website is for general
              informational purposes only. We do not provide financial, legal, or professional
              advice. Always consult with qualified professionals.
            </p>

            <h2>External Links</h2>
            <p>
              ZEE BlOG may contain links to third-party websites. We have no control over and
              assume no responsibility for the content, privacy policies, or practices of any
              third-party sites.
            </p>

            <h2>User-Generated Content</h2>
            <p>
              If you submit comments or content to our website, you grant us a non-exclusive,
              royalty-free license to use, reproduce, and display such content.
            </p>

            <h2>Prohibited Uses</h2>
            <p>You may not use our website to:</p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malware or harmful code</li>
              <li>Engage in unauthorized data collection</li>
              <li>Impersonate others or provide false information</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>
              ZEE BlOG shall not be liable for any damages arising out of the use or inability
              to use the materials on our website.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of your
              jurisdiction, without regard to conflict of law provisions.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be
              effective immediately upon posting.
            </p>

            <h2>Contact Information</h2>
            <p>
              Questions about these Terms should be sent to us via our <a href="/contact">contact page</a>.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

