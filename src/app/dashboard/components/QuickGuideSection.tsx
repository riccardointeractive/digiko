import { IconBox } from '@/components/IconBox';
import { GUIDE_ITEMS } from '../config/dashboard.config';

/**
 * QuickGuideSection Component
 * Displays guide items with icons, titles, and descriptions
 */
export function QuickGuideSection() {
  return (
    <div className="mt-8 md:mt-10 lg:mt-12 glass rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8">
      <h2 className="text-responsive-h3 text-white mb-6 md:mb-7 lg:mb-8">Quick Guide</h2>
      <div className="grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
        {GUIDE_ITEMS.map((item, i) => (
          <div key={i} className="group flex gap-3 md:gap-4">
            <IconBox icon={item.icon} size="sm" variant={item.variant} />
            <div>
              <h3 className="text-responsive-base text-white font-medium mb-1">{item.title}</h3>
              <p className="text-responsive-sm text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
