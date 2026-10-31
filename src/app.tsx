import { useState } from 'react';
import { useNotes, Note } from './context/NotesContext';
import Layout from './components/Layout';
import NoteCard from './components/NoteCard';
import EmptyState from './components/EmptyState';
import NoteModal from './components/NoteModal';
import { Plus } from 'lucide-react';

export type FilterView = 'all' | 'pinned' | 'archived';

export default function App() {
  const { notes } = useNotes();
  const [currentView, setCurrentView] = useState<FilterView>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);

  // Compute exact counts globally across all view matrices
  const counts = {
    all: notes.filter(n => !n.isArchived).length,
    pinned: notes.filter(n => n.isPinned && !n.isArchived).length,
    archived: notes.filter(n => n.isArchived).length,
  };

  // Filter rendering matrix
  const filteredNotes = notes.filter((note) => {
    if (currentView === 'archived') return note.isArchived;
    if (currentView === 'pinned') return note.isPinned && !note.isArchived;
    return !note.isArchived; // 'all' view shows unarchived notes
  });

  const handleEditIntent = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(undefined);
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView} counts={counts}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight capitalize">{currentView} Notes</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Note
          </button>
        </div>

        {filteredNotes.length === 0 ? (
          <EmptyState view={currentView} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} onEdit={handleEditIntent} />
            ))}
          </div>
        )}
      </div>

      <NoteModal isOpen={isModalOpen} onClose={handleCloseModal} editNote={editingNote} />
    </Layout>
  );
}
