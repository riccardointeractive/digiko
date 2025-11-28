import { DocSection } from '../types/documentation.types';

/**
 * DocumentationSection Component
 * Renders a single documentation section with title and content
 */

interface DocumentationSectionProps {
  section: DocSection;
}

export function DocumentationSection({ section }: DocumentationSectionProps) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <h2 className="text-2xl font-medium text-white mb-6 pb-3 border-b border-white/10">
        {section.title}
      </h2>
      {section.content}
    </section>
  );
}
