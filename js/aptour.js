/**
 * Define the main constructor function.
 *
 * @constructor
 * @author Edwin Chen
 * @version 1.0
 * @since 1.0
 */
function APTour() {
  // Get the tour items.
  this.tourItems = document.querySelectorAll('[data-aptour]');

  // If there are no tour items, log an error and return.
  if(this.tourItems.length === 0) {
    if(console) {
      console.log('Sorry, we couldn\'t find any valid tour items.');
    }

    return;
  }

  // Initialize the tour.
  this.initialize();
}

/**
 * Initializes the tour by creating the stops and showing the first one.
 *
 * @function
 */
APTour.prototype.initialize = function() {
  var tourWindowContents = "";

  // Define the stops, cursor and offset.
  this.stops = [];
  this.cursor = 4;
  this.offset = 20; // The distance between the windown and the parent element.

  // Populate the stops array with all the tour objects.
  for (let i = 0; i < this.tourItems.length; i++) {
    this.stops[i] = JSON.parse(this.tourItems[i].getAttribute('data-aptour'));
  }

  // Create an overlay on the entire page.
  this.overlay = document.createElement('div');
  this.overlay.className = 'aptour-overlay';
  document.body.insertBefore(this.overlay, document.body.childNodes[0]);

  // Create the main tour window and populate its content.
  this.tourWindow = document.createElement('div');
  this.tourWindow.className = 'aptour-window';
  tourWindowContents += '<header></header>';
  tourWindowContents += '<div class="aptour-window-desc"></div>';
  tourWindowContents += '<footer>';
  tourWindowContents += '<button data-aptour-nav="prev">Prev</button>';
  tourWindowContents += '<button data-aptour-nav="next">Next</button>';
  tourWindowContents += '<button data-aptour-nav="close">Close tour</button>';
  tourWindowContents += '</footer>';
  this.tourWindow.innerHTML = tourWindowContents;
  document.body.insertBefore(this.tourWindow, document.body.childNodes[0]);

  this.moveTo(this.cursor);
};

/**
 * Shows a specific stop.
 *
 * @function
 * @param {Number} index - The position of the stop we need to sho.
 */
APTour.prototype.moveTo = function(index) {
  var parent = this.tourItems[index],
  parentSpecs = parent.getBoundingClientRect(),
  bodySpecs = document.body.getBoundingClientRect(),
  position = this.stops[index].position,
  left, top, scrollPosition;

  // If the CSS position isn't set, set to relative.
  if(parent.style.position === '') {
    parent.style.position = 'relative';
  }

  // Add the active class.
  parent.classList.add('aptour-active');

  // Set the tour window contents.
  this.tourWindow.querySelector('header').innerHTML = this.stops[index].title;
  this.tourWindow.querySelector('.aptour-window-desc').innerHTML = this.stops[index].desc;

  // Set the tour window coordinates.
  switch(position) {
    case 'top':
      // Center horizontally
      left = parentSpecs.left + ((parent.offsetWidth - this.tourWindow.offsetWidth) / 2);
      top = parentSpecs.top - this.tourWindow.offsetHeight - this.offset - bodySpecs.top;
      break;

    case 'right':
      left = parentSpecs.right + this.offset;
      // Center vertically
      top = (parentSpecs.top + parentSpecs.bottom) / 2 - this.tourWindow.offsetHeight / 2 - bodySpecs.top;
      break;

    case 'bottom':
      // Center horizontally
      left = parentSpecs.left + ((parent.offsetWidth - this.tourWindow.offsetWidth) / 2);
      top = parentSpecs.bottom + this.offset - bodySpecs.top;
      break;

    case 'left':
      left = parentSpecs.left - this.offset - this.tourWindow.offsetWidth;
      // Center vertically
      top = (parentSpecs.top + parentSpecs.bottom) / 2 - this.tourWindow.offsetHeight / 2 - bodySpecs.top;
      break;
  }

  this.tourWindow.style.left = left + 'px';
  this.tourWindow.style.top = top + 'px';
};
