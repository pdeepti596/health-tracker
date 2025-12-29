// Global app state
let state = {
  editingId: null,   // which user is being edited
  users: [] ,      // list of all users
  activities: [],
  medical: []
};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}