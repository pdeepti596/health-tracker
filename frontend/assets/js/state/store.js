// Global app state
let state = {
  editingId: null, 
  users: [] ,      
  activities: [],
  medical: []
};

export function setState(newState) {
  state = { ...state, ...newState };
}

export function getState() {
  return state;
}