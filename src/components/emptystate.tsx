import React from 'react';
import { FolderOpen, Pin, Archive } from 'lucide-react';
import { FilterView } from '../App';

interface EmptyStateProps {
  view: FilterView;
}

export default function EmptyState({ view }: EmptyStateProps) {
  const configs = {
    all: {
      icon: FolderOpen,
      title: 'No notes yet',
      description: 'Create your first note to get your workspace started.',
    },
    pinned: {
      icon: Pin,
      title: 'No pinned notes',
      description: 'Pin important notes to keep them accessible at the top of your dashboard.',
    },
    archived: {
      icon: Archive,
      title: 'Archive is empty',
      description: 'Archive notes you want to hide from view without permanently losing them.',
    },
  };

  const current = configs[view];
  const Icon = current.icon;

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 p-8 text-center dark:border-zinc-800">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900">
        <Icon className="h-6 w-6 text-zinc-400 dark:text-zinc-600" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{current.title}</h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">{current.description}</p>
    </div>
  );
}
