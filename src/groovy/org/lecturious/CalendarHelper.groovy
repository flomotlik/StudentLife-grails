package org.lecturious;

class CalendarHelper {
  def rowsForMonth(daysInMonth, weekdayOf1stDay) {
    assert daysInMonth in 28..31
    assert weekdayOf1stDay in 0..6
    switch ((daysInMonth - 21) - (7 - weekdayOf1stDay)) {
      case 0: return 4;
      case 1..7: return 5;
      case 8..9: return 6;
      default: assert false;  
    }
  }
  
  
  def calendar(year,month) {
    Calendar calendar = getGregorianCalendar(year, month);
    def weekdayOf1stDay = getWeekDayOf1stDay(calendar);
    //println "weekdayOf1stDay=" + weekdayOf1stDay ;
    def daysInMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
    def rows = rowsForMonth(daysInMonth, weekdayOf1stDay);
    def result = [];
    result.add(firstRow(year, month));
    //println result
    def firstDayofWeekCounter = 8 - weekdayOf1stDay;
    //println firstDayofWeekCounter;
    /*
     (0..2).each {
     result =+ row(firstDayofWeekCounter);
     }; 
     */
    (0..2).each {
      result.add(row(firstDayofWeekCounter)); 
      firstDayofWeekCounter += 7;
      //println firstDayofWeekCounter;
      //println result
    }
    if (rows == 4) {
      return result;
    }
    if (rows == 6 ) {
      result.add(row(firstDayofWeekCounter));
      firstDayofWeekCounter += 7;
    } 
    //println firstDayofWeekCounter;    
    def lastItems = [] + (firstDayofWeekCounter..daysInMonth);
    int countNextMonthItems = (7-lastItems.size());
    //println countNextMonthItems;
    if (countNextMonthItems > 0) {
      def range = new IntRange(1, countNextMonthItems);
      lastItems += range;
    };
    result.add(lastItems);
    //println result
    return result;
  }
  
  
  def row(startDay) {
    return [] + (startDay..(startDay+6));
  }
  
  def getGregorianCalendar(int year, int month) {
    Calendar calendar = new GregorianCalendar();
    calendar.set(Calendar.YEAR, year);
    calendar.set(Calendar.MONTH, month-1);
    calendar.set(Calendar.DATE, 1);
    calendar.set(Calendar.HOUR, 0);
    calendar.set(Calendar.MINUTE, 0);
    calendar.set(Calendar.SECOND, 0);
    calendar.set(Calendar.SECOND, 0);
    return calendar;
  }
  
  def getWeekDayOf1stDay(Calendar calendar) {
    def weekdayOf1stDay = calendar.get(Calendar.DAY_OF_WEEK); //starts with sun=1 => -2 for mon=0
    if (weekdayOf1stDay == 1) {
      weekdayOf1stDay = 6;
    }
    else {
      weekdayOf1stDay -= 2;
    }
    return weekdayOf1stDay;
  }
  
  def List<Integer> firstRow(int year, int month){
    Calendar calendar = getGregorianCalendar(year, month);
    //println calendar.getTime()
    //DAY_OF_WEEK_IN_MONTH does not work!
    def weekdayOf1stDay = getWeekDayOf1stDay(calendar);
    //println weekdayOf1stDay
    def days = [];
    (weekdayOf1stDay..6).eachWithIndex {it, i ->
      days[it] = i+1;
    }
    calendar.add(Calendar.DATE, -1);
    int dayOfLastMonth = calendar.get(Calendar.DATE);
    ((weekdayOf1stDay-1)..-1).findAll{it>=0}.each {
      days[it] = dayOfLastMonth;
      dayOfLastMonth--;
    }
    return days;
  }
}