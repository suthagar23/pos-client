
export const formatDateTime = (dateObj) => {
  let [date, time] = new Date(dateObj).toLocaleString('en-US').split(', ');
  return date.concat(' ').concat(time);
};

export function findDifferFromToday(dateObj) {
  if (typeof dateObj !== undefined  && dateObj) {
    var dateStart = new Date(dateObj);
    var dateToday = new Date(); 
    let diffSecs = Math.round((dateToday-dateStart)/1000);
    if (diffSecs > 60) {
      let diffMins = Math.round(diffSecs/60);
      if (diffMins > 60) {
        let diffHrs = Math.round(diffMins/60);
        if (diffHrs > 24) {
          return [Math.round(diffHrs/24), ' days', diffSecs];
        }
        else {
          return [diffHrs, ' hrs', diffSecs];
        }
      }
      else {
        return [diffMins, ' mins', diffSecs];
      }
    }
    else {
      return [diffSecs,' secs',diffSecs];
    }
  }
  return new Error('Could not find duration');
};