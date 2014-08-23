var monthNames = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
var dayNames = [ "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN" ];
var today = new Date();
var aday = 24*60*60*1000;

function getRelativeTime(when) {
  var d = new Date(when.startTime);
  var daysLeft = Math.abs( d.getTime() - today.getTime() )/aday;
  if (daysLeft >= 7) {
    return monthNames[d.getMonth() - 1];
  }
  return dayNames[d.getDay() - 1];
}

function getTimeString(when) {
  if (when.startTime.indexOf(':') == -1) {
    return "All Day";
  }
  var s = new Date(when.startTime);
  var sh = s.getHours();
  var sampm = (sh < 12) ? "AM" : "PM";
  var e = new Date(when.endTime);
  var eh = e.getHours();
  var eampm = (eh < 12) ? "AM" : "PM";
  return sh % 12 + ' ' + sampm + ' - ' + eh % 12 + ' ' + eampm;
}

function getDetails(content) {
  var content = content.$t;
  if (content == "") {
    return "";
  }
  return content + "<br />";
}

function getLoc(where) {
  var loc = where.valueString;
  if (loc == "") {
    return "";
  }
  return "Location: " + loc + "<br />";
}

function adEvent(item) {
  var title = item.title.$t;
  var relTime = getRelativeTime(item.gd$when[0]);
  var timestring = 'When: ' + getTimeString(item.gd$when[0]) + '<br />';
  var date = new Date(item.gd$when[0].startTime).getDate();
  var loc = getLoc(item.gd$where[0]);
  var details = getDetails(item.content);
  var section = '<section class="addthisevent"><div class="date"><span class="mon">' + relTime + '</span><span class="day">' + date + '</span><div class="bdr1"></div><div class="bdr2"></div></div><div class="desc"><p><strong class="hed">' + title + '</strong><span class="des">' + loc + timestring + details + '</span></p></div></section>';
  $('#eventDiv').append(section);
}

function loadEvents() {
  $.getJSON("https://www.google.com/calendar/feeds/texastabletennis%40gmail.com/public/full?orderby=starttime&sortorder=ascending&futureevents=true&alt=json", function(data) {
      var array = data.feed.entry;
      for( i = 0; i < array.length && i < 3; i++ ){
        addEvent(array[i]);
      }
  });
}
