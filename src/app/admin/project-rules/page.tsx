'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Project Rules Page
 * Displays the PROJECT_RULES.md content with formatting
 * Protected admin route
 */
export default function ProjectRulesPage() {
  const [rulesContent, setRulesContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the PROJECT_RULES.md file
    fetch('/docs/PROJECT_RULES.md')
      .then(res => res.text())
      .then(content => {
        setRulesContent(content);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load project rules:', err);
        setLoading(false);
      });
  }, []);

  // Convert markdown to formatted HTML-like structure
  const formatContent = (markdown: string) => {
    const lines = markdown.split('\n');
    const formatted: JSX.Element[] = [];
    let currentList: string[] = [];
    let currentCodeBlock: string[] = [];
    let inCodeBlock = false;

    const flushList = () => {
      if (currentList.length > 0) {
        formatted.push(
          <ul key={`list-${formatted.length}`} className="ml-6 mb-4 space-y-2">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-300 leading-relaxed">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const flushCodeBlock = () => {
      if (currentCodeBlock.length > 0) {
        formatted.push(
          <pre key={`code-${formatted.length}`} className="bg-black/40 border border-blue-500/20 rounded-lg p-4 mb-4 overflow-x-auto">
            <code className="text-sm text-cyan-400 font-mono">
              {currentCodeBlock.join('\n')}
            </code>
          </pre>
        );
        currentCodeBlock = [];
      }
    };

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          flushList();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeBlock.push(line);
        return;
      }

      // Headers
      if (line.startsWith('# ')) {
        flushList();
        formatted.push(
          <h1 key={index} className="text-3xl font-bold text-white mb-6 mt-8">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        flushList();
        formatted.push(
          <h2 key={index} className="text-2xl font-bold text-blue-400 mb-4 mt-8">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        formatted.push(
          <h3 key={index} className="text-xl font-bold text-cyan-400 mb-3 mt-6">
            {line.replace('### ', '')}
          </h3>
        );
      }
      // Bold text (simplified)
      else if (line.startsWith('**') && line.endsWith('**')) {
        flushList();
        formatted.push(
          <p key={index} className="font-bold text-blue-300 mb-2">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      }
      // Lists
      else if (line.startsWith('- ')) {
        currentList.push(line.replace('- ', ''));
      }
      // Empty lines
      else if (line.trim() === '') {
        flushList();
      }
      // Regular text
      else if (line.trim() !== '') {
        flushList();
        // Handle inline code
        const formattedLine = line.replace(/`([^`]+)`/g, '<code class="bg-black/40 text-cyan-400 px-2 py-1 rounded text-sm font-mono">$1</code>');
        formatted.push(
          <p 
            key={index} 
            className="text-gray-300 mb-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      }
    });

    flushList();
    flushCodeBlock();

    return formatted;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900">
      {/* Header */}
      <header className="glass-card border-b border-white/10 sticky top-0 z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Project Rules</h1>
              <p className="text-sm text-gray-400 mt-1">Development workflow and guidelines</p>
            </div>
            <Link 
              href="/admin"
              className="glass-card px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-gray-300 hover:text-white"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card rounded-2xl p-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="text-gray-400 mt-4">Loading project rules...</p>
            </div>
          ) : rulesContent ? (
            <div className="prose prose-invert max-w-none">
              {formatContent(rulesContent)}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-red-400">Failed to load project rules</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
