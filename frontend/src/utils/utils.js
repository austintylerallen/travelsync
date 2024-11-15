/**
 * Formats a duration string from ISO 8601 (e.g., "PT7H30M") to a human-readable format.
 * @param {string} duration - ISO 8601 duration string.
 * @returns {string} Human-readable duration.
 */
export const formatDuration = (duration) => {
  if (!duration) return 'Unknown';
  const match = duration.match(/PT(\d+H)?(\d+M)?/);
  if (!match) return 'Unknown';
  const hours = match[1] ? match[1].replace('H', ' hours') : '';
  const minutes = match[2] ? match[2].replace('M', ' minutes') : '';
  return `${hours} ${minutes}`.trim();
};

/**
 * Converts an ISO date-time string to a human-readable format.
 * @param {string} dateTime - ISO date-time string.
 * @returns {string} Formatted date-time string.
 */
export const formatDateTime = (dateTime) => {
  if (!dateTime) return 'Unknown';
  const date = new Date(dateTime);
  return isNaN(date.getTime()) ? 'Unknown' : date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
};

/**
 * Maps airline codes to airline names.
 * @param {string} code - Airline code.
 * @param {object} dictionaries - Dictionaries object from Amadeus API response.
 * @returns {string} Airline name or code if no match found.
 */
export const getAirlineName = (code, dictionaries) => {
  if (dictionaries?.carriers?.[code]) {
    return dictionaries.carriers[code];
  }

  // Fallback mapping for common airlines
  const airlineMap = {
    F9: 'Frontier Airlines',
    UA: 'United Airlines',
    DL: 'Delta Airlines',
    AA: 'American Airlines',
    SW: 'Southwest Airlines',
    AS: 'Alaska Airlines',
  };

  return airlineMap[code] || code || 'Unknown';
};

/**
 * Extracts and formats the total ticket price.
 * @param {object} price - Price object from Amadeus API response.
 * @returns {string} Total ticket price.
 */
export const getTotalPrice = (price) => {
  return price?.total ? `$${parseFloat(price.total).toFixed(2)}` : 'Unknown';
};
