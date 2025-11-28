'use client';

import { sections } from './config/documentation.config';
import { DocumentationHeader } from './components/DocumentationHeader';
import { QuickNavigation } from './components/QuickNavigation';
import { DocumentationSection } from './components/DocumentationSection';
import { HelpFooter } from './components/HelpFooter';

/**
 * Documentation Page - Modular Architecture
 * 
 * Comprehensive guide for using Digiko platform, staking tokens, and understanding features.
 * All documentation content is configured in config/documentation.config.tsx.
 */
export default function DocumentationPage() {
  return (
    <div className="min-h-screen py-16 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Page Header */}
        <DocumentationHeader />

        {/* Quick Navigation */}
        <QuickNavigation sections={sections} />

        {/* Documentation Sections */}
        <div className="space-y-16">
          {sections.map((section) => (
            <DocumentationSection key={section.id} section={section} />
          ))}
        </div>

        {/* Help Footer */}
        <HelpFooter />

      </div>
    </div>
  );
}
