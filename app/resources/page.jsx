import React from 'react';
// import Link from 'next/link';
import MainLayout from '@/layouts/MainLayout';
import { siteMetadata } from '@/lib/seo';

export default function Resources() {
  const resources = [
    {
      category: 'Financial Planning',
      items: [
        { name: 'Emergency Fund Calculator', url: '#' },
        { name: 'Retirement Planning Guide', url: '#' },
        { name: 'Budget Templates', url: '#' },
      ],
    },
    {
      category: 'Insurance',
      items: [
        { name: 'Insurance Comparison Tools', url: '#' },
        { name: 'Coverage Calculator', url: '#' },
        { name: 'Policy Checklist', url: '#' },
      ],
    },
    {
      category: 'Investing',
      items: [
        { name: 'Investment Portfolio Builder', url: '#' },
        { name: 'Risk Assessment Quiz', url: '#' },
        { name: 'Compound Interest Calculator', url: '#' },
      ],
    },
    {
      category: 'Business & Legal',
      items: [
        { name: 'Business Plan Template', url: '#' },
        { name: 'Contract Templates', url: '#' },
        { name: 'Legal Compliance Checklist', url: '#' },
      ],
    },
  ];

  return (
    <MainLayout
      seo={{
        title: `Resources - ${siteMetadata.title}`,
        description: 'Free tools, templates, and guides',
        canonical: `${siteMetadata.siteUrl}/resources`,
      }}
    >
      <section className="py-16 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Resources
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Free tools, templates, and guides to help you succeed
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((section) => (
              <div
                key={section.category}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {section.category}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.url}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                      >
                        {item.name} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}