/**
 * Consistent date formatting utility to prevent hydration mismatches
 */
export function formatExhibitionDate(
  startDate?: string, 
  endDate?: string, 
  isOneDayEvent?: boolean
): string {
  if (!startDate) return "";
  
  // Parse dates consistently
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  
  // Always use full year (4 digits) for consistency
  if (isOneDayEvent) {
    return `${start.getDate()}. ${start.getMonth() + 1}. ${start.getFullYear()}`;
  }
  
  if (end) {
    const startDay = start.getDate();
    const startMonth = start.getMonth() + 1;
    const endDay = end.getDate();
    const endMonth = end.getMonth() + 1;
    const endYear = end.getFullYear();

    if (startMonth === endMonth) {
      return `${startDay}. – ${endDay}. ${endMonth}. ${endYear}`;
    } else {
      return `${startDay}. ${startMonth}. – ${endDay}. ${endMonth}. ${endYear}`;
    }
  }
  
  // Single date fallback
  return `${start.getDate()}. ${start.getMonth() + 1}. ${start.getFullYear()}`;
}

/**
 * Format upcoming exhibition date range with 4-digit years
 * Preserves the exact formatting style of the upcoming bar
 */
export function formatUpcomingRange(startDate?: string, endDate?: string): string {
  if (!startDate || !endDate) return "";
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${start.getDate()}. – ${end.getDate()}. ${end.getMonth() + 1}. ${end.getFullYear()}`;
  } else {
    return `${start.getDate()}. ${start.getMonth() + 1}. ${start.getFullYear()} – ${end.getDate()}. ${end.getMonth() + 1}. ${end.getFullYear()}`;
  }
}

/**
 * Format vernissage date with 4-digit year
 * Preserves the exact formatting style of the upcoming bar
 */
export function formatUpcomingVernissage(vernissageDate?: string): string {
  if (!vernissageDate) return "";
  
  const date = new Date(vernissageDate);
  const pad = (n: number) => n < 10 ? "0" + n : n;
  
  return `Vernisáž: ${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
