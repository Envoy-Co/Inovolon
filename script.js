document.addEventListener('DOMContentLoaded', function() {
// ---------------------------------------------------------------------------------------------------------- */
// Customized javascript BEGINS ----------------------------------------------------------------------------- */
// ---------------------------------------------------------------------------------------------------------- */

// Community Feeds ----------------------------------------------------------------------------- */

  $( "#community-feeds-tabs" ).tabs();
  
// Community tabs ----------------------------------------------------------------------------- */
  
  var topicCatArray = ["INDICES","QSI-XL","ePASS","CHG","iPORT-HD","Virtual Health Visits","Advisory Councils","Misc"];
  
  // Create tab switcher for community faux topic categories
  $(topicCatArray).each(function(i){
    var catName = this;
    
    // Create the tabs
    $('<a href="#" class="cat-tab-trigger" data-cat-trigger="' + catName +'">' + catName + '</a>').appendTo('.products-topics-tabs .tab-selector, #choose-your-category nav');
    
    // Create the interactivity
    $('.cat-tab-trigger').bind('click',function(e){
      e.preventDefault();
      
      // Set active tab
      $('.cat-tab-trigger').removeClass('active');
      $(this).addClass('active');
      
      // Find appropriate tabs
    	var target = $(this).attr('data-cat-trigger');
      target = target.replace(new RegExp(" ", "g"), '-').toLowerCase();
      console.log(target);
      
      // Hide all others
			$('.products-topics-tabs .topics-list .topics-item').hide();
      
      // Show correct ones
      $('[topic-group="' + target + '"]').css('display','block');
    });
  })

  $('.products-topics-tabs .topics-list .topics-item').each(function(){
    $(topicCatArray).each(function(){
      var topicCat = this;
      var topicCatClass = this.replace(new RegExp(" ", "g"), '-').toLowerCase();
      $('.topics-item .blocks-item-title:contains(' + topicCat + ')').parent().parent().attr('topic-group', topicCatClass);
    })
     
    // topicName = topicName.split(' ');
    // $(this).attr('data-topic-cat','cat-' + topicName[0]);
  });
  
  // Show the first category of topics by default
  //$('.cat-tab-trigger').first().trigger('click');
  
 // If more than five products
 if ($('.tab-selector .cat-tab-trigger').length > 5){
   $('#choose-your-category').show();
   $('.tab-selector').hide();
   //$('.community-intro-topics').insertAfter('.products-topics-tabs');
   $('.menu-trigger').bind('click',function(e){
     e.preventDefault();
     $('#choose-your-category').toggleClass('active');
   });
   $('#choose-your-category nav a').bind('click',function(e){
     e.preventDefault();
      var linkTitle = $(this).text();
     	$('.menu-trigger span').text(linkTitle);
       $('#choose-your-category').toggleClass('active');
   });
 }
  
  
 //send user role to Google Analytics 

 var userRole = HelpCenter.user.role;
 ga('set', 'dimension1', userRole);
 ga('send', 'pageview');
 
// Capture ticket deflection event in Google Analytics 
$("#new_request").on('click', '.searchbox-suggestions a', function(e) {
  var $this = $(this),
  link = $this.text();
  ga('send', 'event', 'Ticket Deflection', 'Deflect', link);
});

   // Capture request support link click event
   $('a.submit-a-request, div.article-stats p a').on('click', function(e) {
    var path = window.location.pathname;
    ga('send', 'event', 'Request Support', 'Contact Us', path);
  });
   
  // Track Request Form Submit button clicks in Google Analytics 

  $('#new_request footer input').on('click',function(e) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Submit Request Form',
      eventAction: 'Submit Request',
      eventLabel: 'New Request'
    });
  });
  
 //track article upvote in Google Analytics 
 $('button.button.article-vote.article-vote-up').on('click',function(e) {
   
   var path = window.location.pathname;
   ga('send', 'event', 'Vote Button', 'Upvote', path);
 });


  //track article downvote in Google Analytics
  $('button.button.article-vote.article-vote-down').on('click',function(e) {

   var path = window.location.pathname;
   ga('send', 'event', 'Vote Button', 'Downvote', path);
 });
  
  
// Show home page div html and hide web widget based on anonymous user role 
if (HelpCenter.user.role=="anonymous"){
 $("div.anonymous-container").show();
 $(".header").addClass('anonymous-header');
 $('body').addClass('interior-body');
  // $('.interior-body .header').css('height', '26px')
  //   window.zESettings = {
  //   webWidget: {
  //     position: { horizontal: 'left', vertical: 'top' }
  //   }
  // };
}

  // Change layout of section page based on number of sections
  var subSectCount = $('.sub-sections-list .section-list-item').length;
  $('.sub-sections-list').addClass('sub-sections-count-' + subSectCount);
  
  if ($('.section-page-layout .page-header-description').length < 1){
    $('.section-list.sub-sections-list').addClass('no-description-box');
    $('.section-articles-container').addClass('no-description-box');
  }  
  if ($('.section-page-layout .sub-sections-list ').length < 1){
    $('.section-page-header, .section-articles-container').addClass('no-sub-sections');
  }
  
  // Change hero class based on interior page and community, to allow for different backgrounds
  if ($('.section-page-layout').length > 0){
    $('body').addClass('interior-bg');
  }
  if ($('.interior-page').length > 0){
    $('body').addClass('interior-body');
  }
  
  if ($('.community-page').length > 0){
    $('body').addClass('community-body');
  }
  
  // Brian adding a class warning to any alerts in the form 11.03.2020 */
  
    if ($('.notification-error').length > 0){
    	$('.required .notification-error').addClass('warning');
  	}

  // Alerts Banner ---------------------------------------------------------- */
  if( $('#alerts-banner').length > 0){
    $('#alerts-banner').insertBefore('.header').slideDown().css('display','flex'); ;
    $('#alerts-banner .btn-close').click(function(e){
      e.preventDefault();
      $(this).parent().slideUp();
    });
  }
  
  // Calculate Post up and down counts--------------------------------------- */ 
  $('.up-count').each(function() {
    var num = $(this).text().match(/\d+/g).map(Number);
    $(this).text(num[0]);
  });  
  $('.down-count').each(function() {
    var num = $(this).text().match(/\d+/g).map(Number);
    var totalVotes = num[1];
    var upVotes = num[0];
    var downVotes = totalVotes - upVotes;
    $(this).text(downVotes);
  });


  // Browse Common Questions --------------------------------------------------------------------------- */
  
    // Select the fourth tab by default
    //$( ".browse-common-questions" ).tabs({ active: 3 });
    

  // Header Search ------------------------------------------------------------------------------------- */

  $('#trigger-header-search').click(function(){
    $('.header-search').toggleClass('active');
    $('#trigger-header-search').toggleClass('open');
  });
  
  // Section page without description

  // --------------------------------------------------------------------------------------------------- */
  // Show certain forms for users that belong to an organization --------------------------------------- */
  // --------------------------------------------------------------------------------------------------- */

      // Get orgs from user
      var orgs = HelpCenter.user.organizations;
      var forms = document.getElementById('forms-data');;
      var formIDs = forms.getAttribute('data-form-ids');
      var formIDArray = formIDs.split(',');
      var ticketFormIds = "";
      for(var i=0; i<formIDArray.length; i++){
        ticketFormIds += "{ id: " + formIDArray[i].trim() + "} ,";
      }
  		ticketFormIds = ticketFormIds.slice(0, -1)
  		console.log(ticketFormIds);
    
      // If user has no orgs skip the entire script below
      if( orgs.length > 0 || orgs != null || orgs != undefined){

        /* ------------------------------------------------------------------------------------- */
        /* HIDE form 360000781352 internal from everyone except the below orgs ----------------- */
        /* ------------------------------------------------------------------------------------- */
        
        /* --STEP ONE -------------------------------------------------------------------------- */
        /* To create for other forms, just copy and paste this entire block, rename function  -- */
        /* and add new function to load and form selector click (steps two and three) ---------- */
        /* ------------------------------------------------------------------------------------- */
        
        // Unique function for this form, duplciate this entire function for additional forms
        function checkInternalForm() {
          // Setup matched org count
         // var matchedOrgs = 0;

          // Search the orgs for any of the following matches ------------ */
          
          // Create function to search for starting name to start with "INOV"
          function startsWith(str, word) {
            str = str.toLowerCase();
            return str.lastIndexOf(word, 0) === 0;
          }

          // Search each org to see if it starts with "INOV"
          $.grep(orgs, function (element, index) {
            
            var test = startsWith( element.name,"inov");
            console.log(test);
            if ( startsWith( element.name,"inov")){
              console.log('User belongs to at least one approved org');

              // If a match is found, give positive score and show all forms
             // matchedOrgs++;
            }
          });
         // If user has none of the organizations above found, hide form #360000781352
          if(orgs.length < 1){
            console.log('User has no matching org');
            $("#360000834051").remove();
            $('#request_issue_type_select option[value="360000834051"]').remove();
            // hide the request form selector field if user does not have INOV org
            $('div.request_ticket_form_id').hide();
            window.zESettings = {
              webWidget: {
                contactForm: {
                  ticketForms: [{ id: ticketFormIds }]
                }
              }
            };
          }
        }
			} // End check internal form
      
      
 //for using existing function to control forms in Web Widget. 
 
// checkInternalForm();
 
 /* ------------------------------------------------------------------------------------- */
 /* END HIDE form 360000781352 internal from everyone except the below orgs ------------- */
 /* ------------------------------------------------------------------------------------- */
 
 if (window.location.href.indexOf("requests/new") > -1) {
    checkInternalForm();
    $('.request_ticket_form_id .nesty-input').bind( "click", function() {
      checkInternalForm();
    });
 }
 
	  // Only run this script on form page  ------------------------------------------------------ */
//    if ($(".request_ticket_form_id .nesty-input").length){
    
//     alert($(".request_ticket_form_id"));
//     /* ------------------------------------------------------------------------------------------- */
//     /* --STEP TWO ----- ADD TO LOAD -------------------------------------------------------------- */
//     /* ------------------------------------------------------------------------------------------- */
    
//   		// Run all internal form checks on load ------------------------------------------------------ */
//       checkInternalForm();
//       // exampleNewCheckform(); 

//       $('.request_ticket_form_id .nesty-input').bind( "click", function() {
        
//         /* --------------------------------------------------------------------------------------- */
//         /* --STEP THREE ---ADD TO FORM SELECTOR CLICK -------------------------------------------- */
//         /* --------------------------------------------------------------------------------------- */
        
//           // Repeat all form checks on click -- since the checks cannot be performed on load
//           checkInternalForm();
//           // exampleNewCheckform();

//         }); // End click
//     }

  // --------------------------------------------------------------------------------------------------- */
  // END Show certain forms for users that belong to an organization ----------------------------------- */
  // --------------------------------------------------------------------------------------------------- */

  
// --------------------------------------------------------------------------------------------------- */
// If only one form available, redirect to that form  ------------------------------------------------ */
// --------------------------------------------------------------------------------------------------- */

  // If form page
  if( $('#request_issue_type_select option').length > 0){
    if ($('#request_issue_type_select option').length < 3){
      
      
        // Make sure it's not the actual form page
       if ( $('#new_request .button-large, input[type="submit"]').length < 1){
         
				// Hide dropdown selector
        $('.request_ticket_form_id').hide();

        // Get form id from URL
        function getParameterByName(name, url) {
          if (!url) url = window.location.href;
          name = name.replace(/[\[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        // Store form ID in variable
        var ticketForm = getParameterByName('ticket_form_id');
        console.log(ticketForm);

        // Get the only form available
        var onlyFormID = $('#request_issue_type_select option:last-of-type').attr('value');
        console.log(onlyFormID);

        // If URL is already on a form page, skip the redirect
        if (ticketForm == null){ 

          // add a relocating message
          $('<p>Loading...</p>').prependTo('.form');

          // Redirect to the only form 
          window.location.href = window.location.href + "?ticket_form_id=" + onlyFormID;
      	} 
      }
    }
  }
});// END If form page
// END If only one form available, redirect to that form  --------------------------------------------- */
// ---------------------------------------------------------------------------------------------------- */

// END Customized javascript - native copenhagen theme script below  --------------------------------- */

document.addEventListener('DOMContentLoaded', function() {

  
//do not show the form selector field if on the Inovalon Clients form.   
//  var selected = $('#request_issue_type_select option:selected').text();
// if (selected == "Inovalon Clients") { 
// $('div.request_ticket_form_id').hide();
//  } 
  
  
  
  var burgerMenu = document.querySelector('.header .menu-button');
  var userMenu = document.querySelector('#user-nav');

  burgerMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleNavigation(this, userMenu);
  });


  userMenu.addEventListener('keyup', function(e) {
    if (e.keyCode === ESCAPE) {
      e.stopPropagation();
      closeNavigation(burgerMenu, this);
    }
  });

  if (userMenu.children.length === 0) {
    burgerMenu.style.display = 'none';
  }

  function closest (element, selector) {
   if (Element.prototype.closest) {
    return element.closest(selector);
  }
  do {
    if (Element.prototype.matches && element.matches(selector)
     || Element.prototype.msMatchesSelector && element.msMatchesSelector(selector)
     || Element.prototype.webkitMatchesSelector && element.webkitMatchesSelector(selector)) {
     return element;
 }
 element = element.parentElement || element.parentNode;
} while (element !== null && element.nodeType === 1);
return null;
}

// social share popups
Array.prototype.forEach.call(document.querySelectorAll('.share a'), function(anchor) {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();
		window.open(this.href, '', 'height = 500, width = 500');
	});
});

// In some cases we should preserve focus after page reload
function saveFocus() {
	var activeElementId = document.activeElement.getAttribute("id");
	sessionStorage.setItem('returnFocusTo', '#' + activeElementId);
}
var returnFocusTo = sessionStorage.getItem('returnFocusTo');
if (returnFocusTo) {
	sessionStorage.removeItem('returnFocusTo');
	var returnFocusToEl = document.querySelector(returnFocusTo);
	returnFocusToEl && returnFocusToEl.focus && returnFocusToEl.focus();
}

// show form controls when the textarea receives focus or backbutton is used and value exists
var commentContainerTextarea = document.querySelector('.comment-container textarea'),
commentContainerFormControls = document.querySelector('.comment-form-controls, .comment-ccs');

if (commentContainerTextarea) {
	commentContainerTextarea.addEventListener('focus', function focusCommentContainerTextarea() {
		commentContainerFormControls.style.display = 'block';
		commentContainerTextarea.removeEventListener('focus', focusCommentContainerTextarea);
	});

	if (commentContainerTextarea.value !== '') {
		commentContainerFormControls.style.display = 'block';
	}
}

// Expand Request comment form when Add to conversation is clicked
var showRequestCommentContainerTrigger = document.querySelector('.request-container .comment-container .comment-show-container'),
requestCommentFields = document.querySelectorAll('.request-container .comment-container .comment-fields'),
requestCommentSubmit = document.querySelector('.request-container .comment-container .request-submit-comment');

if (showRequestCommentContainerTrigger) {
	showRequestCommentContainerTrigger.addEventListener('click', function() {
		showRequestCommentContainerTrigger.style.display = 'none';
		Array.prototype.forEach.call(requestCommentFields, function(e) { e.style.display = 'block'; });
		requestCommentSubmit.style.display = 'inline-block';

		if (commentContainerTextarea) {
			commentContainerTextarea.focus();
		}
	});
}

// Mark as solved button
var requestMarkAsSolvedButton = document.querySelector('.request-container .mark-as-solved:not([data-disabled])'),
requestMarkAsSolvedCheckbox = document.querySelector('.request-container .comment-container input[type=checkbox]'),
requestCommentSubmitButton = document.querySelector('.request-container .comment-container input[type=submit]');

if (requestMarkAsSolvedButton) {
	requestMarkAsSolvedButton.addEventListener('click', function () {
		requestMarkAsSolvedCheckbox.setAttribute('checked', true);
		requestCommentSubmitButton.disabled = true;
		this.setAttribute('data-disabled', true);
// Element.closest is not supported in IE11
closest(this, 'form').submit();
});
}

// Change Mark as solved text according to whether comment is filled
var requestCommentTextarea = document.querySelector('.request-container .comment-container textarea');

if (requestCommentTextarea) {
	requestCommentTextarea.addEventListener('input', function() {
		if (requestCommentTextarea.value === '') {
			if (requestMarkAsSolvedButton) {
				requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-translation');
			}
			requestCommentSubmitButton.disabled = true;
		} else {
			if (requestMarkAsSolvedButton) {
				requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-and-submit-translation');
			}
			requestCommentSubmitButton.disabled = false;
		}
	});
}

// Disable submit button if textarea is empty
if (requestCommentTextarea && requestCommentTextarea.value === '') {
	requestCommentSubmitButton.disabled = true;
}

// Submit requests filter form on status or organization change in the request list page
Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function(el) {
	el.addEventListener('change', function(e) {
		e.stopPropagation();
		saveFocus();
		closest(this, 'form').submit();
	});
});

// Submit requests filter form on search in the request list page
var quickSearch = document.querySelector('#quick-search');
quickSearch && quickSearch.addEventListener('keyup', function(e) {
if (e.keyCode === 13) { // Enter key
	e.stopPropagation();
	saveFocus();
	closest(this, 'form').submit();
}
});

function toggleNavigation(toggle, menu) {
	var isExpanded = menu.getAttribute('aria-expanded') === 'true';
	menu.setAttribute('aria-expanded', !isExpanded);
	toggle.setAttribute('aria-expanded', !isExpanded);
}

function closeNavigation(toggle, menu) {
	menu.setAttribute('aria-expanded', false);
	toggle.setAttribute('aria-expanded', false);
	toggle.focus();
}

//var burgerMenu = document.querySelector('.header .menu-button');
//var userMenu = document.querySelector('#user-nav');

// burgerMenu.addEventListener('click', function(e) {
//   e.stopPropagation();
//   toggleNavigation(this, userMenu);
// });


// userMenu.addEventListener('keyup', function(e) {
// if (e.keyCode === 27) { // Escape key
//   e.stopPropagation();
//   closeNavigation(burgerMenu, this);
// }
// });

// if (userMenu.children.length === 0) {
//   burgerMenu.style.display = 'none';
// }

// Toggles expanded aria to collapsible elements
var collapsible = document.querySelectorAll('.collapsible-nav, .collapsible-sidebar');

Array.prototype.forEach.call(collapsible, function(el) {
	var toggle = el.querySelector('.collapsible-nav-toggle, .collapsible-sidebar-toggle');

	el.addEventListener('click', function(e) {
		toggleNavigation(toggle, this);
	});

	el.addEventListener('keyup', function(e) {
if (e.keyCode === 27) { // Escape key
	closeNavigation(toggle, this);
}
});
});

// Submit organization form in the request page
var requestOrganisationSelect = document.querySelector('#request-organization select');

if (requestOrganisationSelect) {
	requestOrganisationSelect.addEventListener('change', function() {
		closest(this, 'form').submit();
	});
}

// If a section has more than 6 subsections, we collapse the list, and show a trigger to display them all
const seeAllTrigger = document.querySelector("#see-all-sections-trigger");
const subsectionsList = document.querySelector(".section-list");

if (subsectionsList && subsectionsList.children.length > 6) {
	seeAllTrigger.setAttribute("aria-hidden", false);

	seeAllTrigger.addEventListener("click", function(e) {
		subsectionsList.classList.remove("section-list--collapsed");
		seeAllTrigger.parentNode.removeChild(seeAllTrigger);
	});
}

// If multibrand search has more than 5 help centers or categories collapse the list
const multibrandFilterLists = document.querySelectorAll(".multibrand-filter-list");
Array.prototype.forEach.call(multibrandFilterLists, function(filter) {
	if (filter.children.length > 6) {
// Display the show more button
var trigger = filter.querySelector(".see-all-filters");
trigger.setAttribute("aria-hidden", false);

// Add event handler for click
trigger.addEventListener("click", function(e) {
	e.stopPropagation();
	trigger.parentNode.removeChild(trigger);
	filter.classList.remove("multibrand-filter-list--collapsed")
})
}
});

// If there are any error notifications below an input field, focus that field
const notificationElm = document.querySelector(".notification-error");
if (
	notificationElm &&
	notificationElm.previousElementSibling &&
	typeof notificationElm.previousElementSibling.focus === "function"
	) {
	notificationElm.previousElementSibling.focus();
}
});


document.addEventListener('DOMContentLoaded', function() {
 
  //  window.zESettings = {
  //   webWidget: {
  //     contactForm: {
  //       ticketForms: [{ id: 360001114531 }]
  //     }
  //   }
  // };
  
// Copenhange API 2 scripts  --------------------------------- */

  // Dropdowns
  
  function Dropdown(toggle, menu) {
    this.toggle = toggle;
    this.menu = menu;

    this.menuPlacement = {
      top: menu.classList.contains("dropdown-menu-top"),
      end: menu.classList.contains("dropdown-menu-end")
    };

    this.toggle.addEventListener("click", this.clickHandler.bind(this));
    this.toggle.addEventListener("keydown", this.toggleKeyHandler.bind(this));
    this.menu.addEventListener("keydown", this.menuKeyHandler.bind(this));
  };

  Dropdown.prototype = {

    get isExpanded() {
      return this.menu.getAttribute("aria-expanded") === "true";
    },

    get menuItems() {
      return Array.prototype.slice.call(this.menu.querySelectorAll("[role='menuitem']"));
    },

    dismiss: function() {
      if (!this.isExpanded) return;

      this.menu.setAttribute("aria-expanded", false);
      this.menu.classList.remove("dropdown-menu-end", "dropdown-menu-top");
    },

    open: function() {
      if (this.isExpanded) return;

      this.menu.setAttribute("aria-expanded", true);
      this.handleOverflow();
    },

    handleOverflow: function() {
      var rect = this.menu.getBoundingClientRect();

      var overflow = {
        right: rect.left < 0 || rect.left + rect.width > window.innerWidth,
        bottom: rect.top < 0 || rect.top + rect.height > window.innerHeight
      };

      if (overflow.right || this.menuPlacement.end) {
        this.menu.classList.add("dropdown-menu-end");
      }

      if (overflow.bottom || this.menuPlacement.top) {
        this.menu.classList.add("dropdown-menu-top");
      }

      if (this.menu.getBoundingClientRect().top < 0) {
        this.menu.classList.remove("dropdown-menu-top")
      }
    },

    focusNextMenuItem: function(currentItem) {
      if (!this.menuItems.length) return;

      var currentIndex = this.menuItems.indexOf(currentItem);
      var nextIndex = currentIndex === this.menuItems.length - 1 || currentIndex < 0 ? 0 : currentIndex + 1;

      this.menuItems[nextIndex].focus();
    },

    focusPreviousMenuItem: function(currentItem) {
      if (!this.menuItems.length) return;

      var currentIndex = this.menuItems.indexOf(currentItem);
      var previousIndex = currentIndex <= 0 ? this.menuItems.length - 1 : currentIndex - 1;

      this.menuItems[previousIndex].focus();
    },

    clickHandler: function() {
      if (this.isExpanded) {
        this.dismiss();
      } else {
        this.open();
      }
    },

    toggleKeyHandler: function(e) {
      switch (e.keyCode) {
        case ENTER:
        case SPACE:
        case DOWN:
        e.preventDefault();
        this.open();
        this.focusNextMenuItem();
        break;
        case UP:
        e.preventDefault();
        this.open();
        this.focusPreviousMenuItem();
        break;
        case ESCAPE:
        this.dismiss();
        this.toggle.focus();
        break;
      }
    },

    menuKeyHandler: function(e) {
      var firstItem = this.menuItems[0];
      var lastItem = this.menuItems[this.menuItems.length - 1];
      var currentElement = e.target;

      switch (e.keyCode) {
        case ESCAPE:
        this.dismiss();
        this.toggle.focus();
        break;
        case DOWN:
        e.preventDefault();
        this.focusNextMenuItem(currentElement);
        break;
        case UP:
        e.preventDefault();
        this.focusPreviousMenuItem(currentElement);
        break;
        case TAB:
        if (e.shiftKey) {
          if (currentElement === firstItem) {
            this.dismiss();
          } else {
            e.preventDefault();
            this.focusPreviousMenuItem(currentElement);
          }
        } else if (currentElement === lastItem) {
          this.dismiss();
        } else {
          e.preventDefault();
          this.focusNextMenuItem(currentElement);
        }
        break;
        case ENTER:
        case SPACE:
        e.preventDefault();
        currentElement.click();
        break;
      }
    }
  }

  var dropdowns = [];
  var dropdownToggles = Array.prototype.slice.call(document.querySelectorAll(".dropdown-toggle"));

  dropdownToggles.forEach(function(toggle) {
    var menu = toggle.nextElementSibling;
    if (menu && menu.classList.contains("dropdown-menu")) {
      dropdowns.push(new Dropdown(toggle, menu));
    }
  });

  document.addEventListener("click", function(evt) {
    dropdowns.forEach(function(dropdown) {
      if (!dropdown.toggle.contains(evt.target)) {
        dropdown.dismiss();
      }
    });
  });
// END Copenhange API 2 scripts  --------------------------------- */
});