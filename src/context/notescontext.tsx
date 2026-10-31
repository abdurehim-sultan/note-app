import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isArchived: boolean;
  updatedAt: string;
}

type NotesState = Note[];

type NotesAction =
  | { type: 'SET_NOTES'; payload: NotesState }

  | { type: 'CREATE'; payload: Omit<Note, 'id' | 'updatedAt' | 'isPinned' | 'isArchived'> }
  | { type: 'EDIT'; payload: { id: string; title: string; content: string } }
  | { type: 'TOGGLE_PIN'; payload: string }
  | { type: 'TOGGLE_ARCHIVE'; payload: string }
  | { type: 'DELETE'; payload: string };

const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case 'SET_NOTES':
      return action.payload;
    case 'CREATE':
      return [
        {
          ...action.payload,
          id: crypto.randomUUID(),
          isPinned: false,
          isArchived: false,
          updatedAt: new Date().toISOString(),
        },
        ...state,
      ];
    case 'EDIT':
      return state.map((n) =>
        n.id === action.payload.id
          ? { ...n, title: action.payload.title, content: action.payload.content, updatedAt: new Date().toISOString() }
          : n
      );
    case 'TOGGLE_PIN':
      return state.map((n) => (n.id === action.payload ? { ...n, isPinned: !n.isPinned, isArchived: false } : n));
    case 'TOGGLE_ARCHIVE':
      return state.map((n) => (n.id === action.payload ? { ...n, isArchived: !n.isArchived, isPinned: false } : n));
    case 'DELETE':
      return state.filter((n) => n.id !== action.payload);
    default:
      return state;
  }
};

interface NotesContextType {
  notes: NotesState;
  dispatch: React.Dispatch<NotesAction>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [localNotes, setLocalNotes] = useLocalStorage<NotesState>('notes-app-data', []);
  const [notes, dispatch] = useReducer(notesReducer, localNotes);

  useEffect(() => {
    dispatch({ type: 'SET_NOTES', payload: localNotes });
  }, []);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes, setLocalNotes]);

  return <NotesContext.Provider value={{ notes, dispatch }}>{children}</NotesContext.Provider>;
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useNotes must be used within a NotesProvider');
  return context;
};
