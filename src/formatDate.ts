// Simplified date and time formatting for HQ Recovery
// Expects DD/MM/YYYY date strings and HH:mm time strings from Google Sheets

export function formatDateWithOrdinalAndTime(dateStr: string, timeStr: string): string {
  // Expect dateStr = "DD/MM/YYYY", timeStr = "HH:mm" (or "HH:mm:ss")
  if (!dateStr) return 'Invalid Date';
  const dateParts = dateStr.split('/').map(Number);
  if (dateParts.length !== 3) return 'Invalid Date';
  let [day, month, year] = dateParts;
  // month in JS Date is 0-based
  const [h = 0, m = 0] = timeStr
    .split(':')
    .map(s => parseInt(s, 10))
    .filter(n => !isNaN(n));
  const dt = new Date(year, month - 1, day, h, m);
  if (isNaN(dt.getTime())) return 'Invalid Date';

  // build "25th July, 2025"
  const suffix = getOrdinalSuffix(day);
  const monthName = dt.toLocaleString('default', { month: 'long' });
  const datePart  = `${day}${suffix} ${monthName}, ${year}`;

  // build "10:00 AM"
  const timePart  = dt.toLocaleTimeString('en-US', {
    hour:   'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${timePart} on ${datePart}`;
}

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:  return 'st';
    case 2:  return 'nd';
    case 3:  return 'rd';
    default: return 'th';
  }
}

// Helper function for parsing DD/MM/YYYY strings into Date objects
export function parseDDMMYYYY(dateString: string): Date {
  if (!dateString || typeof dateString !== 'string') {
    return new Date('Invalid Date');
  }
  
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  return new Date('Invalid Date');
}