import { format as formatter } from 'date-fns';

export function formatDate(
    date: Date = new Date(),
    format = 'yyyy-MM-dd HH:mm:ss'
): string {
    return formatter(date, format);
}
