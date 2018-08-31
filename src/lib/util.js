export const isObject = x => (typeof(x) === 'object' && x !== null);

export const isEventWithRecords = event => (event.Records && Array.isArray(event.Records));
