var dob = '20070417';
var yoyear = Number(dob.substr(0, 4));
var yomonth = Number(dob.substr(4, 2)) - 1;
var yoday = Number(dob.substr(6, 2));
var today = new Date();
var age = today.getFullYear() - yoyear;
if (today.getMonth() < yomonth || (today.getMonth() == yomonth && today.getDate() < yoday))
age--;