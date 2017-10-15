export default function updateSettings(state = [], action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      console.log('update settings', action.settings);
      return action.settings;
    default:
      return state;
  }
}
