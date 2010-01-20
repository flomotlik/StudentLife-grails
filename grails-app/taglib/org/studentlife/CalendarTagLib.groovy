package org.studentlife

class CalendarTagLib {
  
	static namespace = "sl"
  
	def calendarItem = { attr ->
    	def item = attr.item;
    	def year = item.year;
        def month = item.month;
        log.debug(item);
        log.debug(item.year);
        log.debug(item.month);
        log.debug("Events:" + item?.events)
        log.debug("Todos:" + item?.todos)
        out << g.remoteLink(controller:"calendar", action:"courseElements", params:[year:year, month:month, day:item.day], update:"courseElements") {item.day}
    	
    }
}