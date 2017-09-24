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
