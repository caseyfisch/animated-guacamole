/**
 *  
 *  gup(name) :: retrieves URL parameters if provided
 *
 *  Prepares the page for MTurk on load.
 *  1. looks for a form element with id="mturk_form", and sets its METHOD / ACTION
 *    1a. All that the task page needs to do is submit the form element when ready
 *  2. disables form elements if HIT hasn't been accepted
 *
 **/

// selector used by jquery to identify your form
var form_selector = "#mturk_form";

// function for getting URL parameters
function gup(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if(results == null)
    return "";
  else return unescape(results[1]);
}

//  Turkify the captioning page.
$(document).ready(function () {
  // is assigntmentId is a URL parameter
  
  console.log("adding form");
  
  var f = document.createElement("form");
  f.setAttribute("id", "mturk_form");
  var time = document.createElement("input"); //input element, text
  time.setAttribute('type',"hidden");
  time.setAttribute('name',"time_duration");
  time.setAttribute("id", "td");
  
  var check_sum = document.createElement("input");
  check_sum.setAttribute("type", "hidden");
  check_sum.setAttribute("name", "check_sum");
  check_sum.setAttribute("id", "cs");
  
  var earnings = document.createElement("input");
  earnings.setAttribute("type", "hidden");
  earnings.setAttribute("name", "earnings");
  earnings.setAttribute("id", "er");
  
  var wall = document.createElement("input");
  wall.setAttribute("type", "hidden");
  wall.setAttribute("name", "wallclock");
  wall.setAttribute("id", "wc");

  f.appendChild(time);
  f.appendChild(check_sum);
  f.appendChild(earnings);
  f.appendChild(wall);
  
  console.log(f);
  
  document.getElementsByTagName('body')[0].appendChild(f);
  
  var aid = gup("assignmentId");
  if(aid != "" && $(form_selector).length>0) {
    console.log("in here");

    // If the HIT hasn't been accepted yet, disabled the form fields.
    if(aid == "ASSIGNMENT_ID_NOT_AVAILABLE") {
	    $('input,textarea,select').attr("DISABLED", "disabled");
    }

    // Add a new hidden input element with name="assignmentId" that
    // with assignmentId as its value.
    var aid_input = $("<input type='hidden' name='assignmentId' value='" + aid + "'>").appendTo($(form_selector));

    // Make sure the submit form's method is POST
    $(form_selector).attr('method', 'POST');

    // Set the Action of the form to the provided "turkSubmitTo" field
    var submit_url = gup("turkSubmitTo");
    if(submit_url != "") {
      $(form_selector).attr('action', submit_url + '/mturk/externalSubmit');
    }
  }
});