// Behavior
// --------

// A Behavior is an isolated set of DOM /
// user interactions that can be mixed into any View.
// Behaviors allow you to blackbox View specific interactions
// into portable logical chunks, keeping your views simple and your code DRY.

Marionette.Behavior = Marionette.Object.extend({
  constructor: function(options, view) {
    // Setup reference to the view.
    // this comes in handle when a behavior
    // wants to directly talk up the chain
    // to the view.
    this.view = view;
    this.defaults = _.result(this, 'defaults') || {};
    this.options  = _.extend({}, this.defaults, options);
    // Construct an internal UI hash using
    // the views UI hash and then the behaviors UI hash.
    // This allows the user to use UI hash elements
    // defined in the parent view as well as those
    // defined in the given behavior.
    this.ui = _.extend({}, _.result(view, 'ui'), _.result(this, 'ui'));

    Marionette.Object.apply(this, arguments);
  },

  // proxy behavior $ method to the view
  // this is useful for doing jquery DOM lookups
  // scoped to behaviors view.
  $: function() {
    return this.view.$.apply(this.view, arguments);
  },

  // Stops the behavior from listening to events.
  // Overrides Object#destroy to prevent additional events from being triggered.
  destroy: function() {
    this.stopListening();

    return this;
  },

  proxyViewProperties: function(view) {
    // Support using Marionette 2 behaviors in Marionette 3 views
    if (!view) {
      view = this.view;
    }

    this.$el = view.$el;
    this.el = view.el;
  }
});
