import React from 'react';
import { Note, useNotes } from '../context/NotesContext';
import { Pin, Archive, Trash2, Edit3 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
}

export default function NoteCard({ note, onEdit }: NoteCardProps) {
  const { dispatch } = useNotes();

  const formattedDate = new Date(note.updatedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 transition-all">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 line-clamp-1">
            {note.title || 'Untitled Note'}
          </h3>
          <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_PIN', payload: note.id })}
              className={cn(
                "p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
                note.isPinned ? "text-amber-500" : "text-zinc-400 dark:text-zinc-500"
              )}
              title={note.isPinned ? "Unpin Note" : "Pin Note"}
            >
              <Pin className="h-3.5 w-3.5 fill-current" style={{ fillOpacity: note.isPinned ? 1 : 0 }} />
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_ARCHIVE', payload: note.id })}
              className={cn(
                "p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
                note.isArchived ? "text-indigo-500" : "text-zinc-400 dark:text-zinc-500"
              )}
              title={note.isArchived ? "Unarchive Note" : "Archive Note"}
            >
              <Archive className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap line-clamp-4">
          {note.content}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/50">
        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">{formattedDate}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Edit contents"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => dispatch({ type: 'DELETE', payload: note.id })}
            className="p-1.5 text-zinc-400 hover:text-red-600 dark:text-zinc-500 dark:hover:text-red-400 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Delete permanently"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
