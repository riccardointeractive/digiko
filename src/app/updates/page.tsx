'use client';

import { updates, typeStyles } from './config/updates.config';
import { UpdatesHeader } from './components/UpdatesHeader';
import { UpdateEntry } from './components/UpdateEntry';

/**
 * Updates Page - Modular Architecture
 * 
 * Displays platform updates and changelog with timeline styling.
 * All update entries are configured in config/updates.config.ts.
 */
export default function UpdatesPage() {
  return (
    <div className="min-h-screen py-16 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Page Header */}
        <UpdatesHeader />

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-digiko-primary/50 via-white/10 to-transparent" />

          {/* Update Entries */}
          <div className="space-y-12">
            {updates.map((update) => (
              <UpdateEntry 
                key={update.version} 
                update={update} 
                typeStyles={typeStyles} 
              />
            ))}
          </div>

          {/* End of timeline */}
          <div className="relative pl-8 pt-8">
            <div className="absolute left-0 top-8 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-600" />
            <p className="text-sm text-gray-600">
              More updates coming soon...
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
