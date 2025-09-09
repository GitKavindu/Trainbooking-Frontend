export class TimeService{
    formatTime(timeString: string): string {
        const [hourStr, minuteStr] = timeString.split(':');
        let hours = parseInt(hourStr, 10);
        const minutes = minuteStr;
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
    
        const formattedHours = String(hours).padStart(2, '0');
        return `${formattedHours}:${minutes} ${ampm}`;
      }
    
    formatTimeReverse(timeString: string): string{
        const [time,suffix]=timeString.split(' ');
        let [hh,mm]=time.split(':');

        if(suffix=='PM' && hh!='12'){
        hh=(Number(hh)+12).toString()
        }

        return `${hh}:${mm}`
    }
}