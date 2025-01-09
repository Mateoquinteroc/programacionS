import { getEventsByDay } from './queries';

(async () => {
  try {
    const eventsByDay = await getEventsByDay();
    console.log(JSON.stringify(eventsByDay, null, 2));
  } catch (error) {
    console.error('Error testing getEventsByDay:', error);
  }
})();
