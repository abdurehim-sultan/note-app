# Polished Notes SPA

A multi-view, single-page application built with React, TypeScript, and TailwindCSS.

## 🗺️ State Location Architecture Documentation

To keep rendering workflows deterministic, data lives in strict, isolated locations:

### 1. Global Persistence State
* **Notes Collection State (`notes-app-data`)**: Kept inside the browser's `localStorage`. Synced into memory at mount inside `NotesContext.tsx` via `useLocalStorage`.
* **Theme Configuration (`notes-app-theme`)**: Persisted inside `localStorage`. Evaluated directly by an inline script block inside `index.html` to eliminate pre-render application layout flashes.

### 2. Context & Application State
* **Notes Domain Context (`NotesContext`)**: Operates via a robust State Reducer pattern. Manages arrays containing structural objects representing created Notes. Emits side-effects straight back down into local arrays.
* **UI Theme Context (`ThemeContext`)**: Exposes reactive string schemas representing explicit states (`light` | `dark`). Mutates layout tags conditionally on change.

### 3. View & Component State
* **Active Filter Context (`view`)**: Declared and tracked locally at the parent base container component layer (`App.tsx`). Drives computed filter derived-states instantly during render cycles.
* **Modal Overlay State (`isOpen` / `editNote`)**: Bound directly to layout overlay triggers inside modal lifecycle scopes (`NoteModal.tsx`).
