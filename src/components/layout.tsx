import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FilterView } from '../App';
import { Sun, Moon, FileText, Pin, Archive } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  currentView: FilterView;
  onViewChange: (view: FilterView) => void;
  counts: { all: number; pinned: number; archived: number };
}

export default function Layout({ children, currentView, onViewChange, counts }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { id: 'all' as FilterView, label: 'All Notes', icon: FileText, count: counts.all },
    { id: 'pinned' as FilterView, label: 'Pinned', icon: Pin, count: counts.pinned },
    { id: 'archived' as FilterView, label: 'Archived', icon: Archive, count: counts.archived },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50">
      {/* Sidebar Navigation Dashboard */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <span className="font-bold text-lg tracking-tight">Notes.SPA</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50" 
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </div>
                <span className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-semibold",
                  isActive ? "bg-white dark:bg-zinc-900" : "bg-zinc-100 dark:bg-zinc-800"
                )}>
                  {item.count}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Core Structural Viewport */}
      <div className="flex-1 md:pl-64 flex flex-col">
        <header className="h-16 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 px-6 flex items-center justify-between sticky top-0 z-10">
          {/* Mobile view selectors instead of full sidebar layout */}
          <div className="flex items-center gap-2 md:hidden">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "px-2.5 py-1.5 text-xs font-semibold rounded-md",
                  currentView === item.id 
                    ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900" 
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                )}
              >
                {item.label} ({item.count})
              </button>
            ))}
          </div>
          <div className="hidden md:block" />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
            aria-label="Toggle Theme Engine"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        <main className="flex-1 p-6 max-w-5xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
