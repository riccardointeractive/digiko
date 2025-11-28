import { IconBox } from '@/components/IconBox';
import { GUIDE_ITEMS } from '../config/dashboard.config';

/**
 * QuickGuideSection Component
 * Displays guide items with icons, titles, and descriptions
 */
export function QuickGuideSection() {
  return (
    <div className="mt-12 glass rounded-3xl p-8">
      <h2 className="text-2xl font-medium text-white mb-8">Quick Guide</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {GUIDE_ITEMS.map((item, i) => (
          <div key={i} className="group flex gap-4">
            <IconBox icon={item.icon} size="sm" variant={item.variant} />
            <div>
              <h3 className="text-white font-medium mb-1">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
