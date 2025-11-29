import { Icons } from '../config/dgko.config';
import { SOCIAL_LINKS } from '@/config/social';

/**
 * CommunitySection Component
 * Social media links display
 */
export function CommunitySection() {
  const socialLinks = [
    { name: 'X (Twitter)', icon: Icons.x, url: SOCIAL_LINKS.DGKO.X, color: 'hover:text-white' },
    { name: 'LinkedIn', icon: Icons.linkedin, url: SOCIAL_LINKS.DGKO.LINKEDIN, color: 'hover:text-blue-400' },
    { name: 'Telegram', icon: Icons.telegram, url: SOCIAL_LINKS.DGKO.TELEGRAM, color: 'hover:text-sky-400' },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-medium text-white mb-6">Community</h2>
      <div className="glass rounded-2xl border border-white/10 p-6">
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-gray-400 ${social.color}`}
            >
              {social.icon}
              <span className="font-medium">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
