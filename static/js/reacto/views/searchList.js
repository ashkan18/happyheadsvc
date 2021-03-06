/**
 * This view handles showing list of artists it's used in showing search results
 *
 */
window.SearchListView = Backbone.View.extend({

    tagName:'ul',

    className: 'dropdown-menu search_dropdown',  // we want to show the results in dropdown menu

    SEARCH_DROPDOWN_SELECTOR: '.dropdown',
    SEARCH_DELAY: 500,
    MINIMUM_SEARCH_LENGTH: 2,


    initialize:function (options) {
        _.extend(this, options);

        var self = this;

        // get the search results using ArtistSearchCollection object
        this.searchResults = new ArtistSearchCollection();

        this.model = this.searchResults;

        // when the model (artist collection) is reset then call render
        this.model.bind("reset", this.render, this);

        // when something is added to the model, add it to the list as search list item view
        this.model.bind("add", function (artist) {
            $(self.el).append(new SearchListItemView({model:artist}).render().el);
        });
        // will be used to manage the auto-search feature
        this.searchTimeout = null;
        // set curernt term to null
        this.currentTerm = null;
    },

    render:function () {
        // get the input text from DOM
        this.input = $(this.input_id);

        // set the width of this drop down to the parent text box
        this.$el.width(this.input.outerWidth());

        // define key functions for this search text box
        this.input
            .keyup(_.bind(this.checkToSearch, this))
            .keydown(_.bind(this.keyDown, this))
            .after(this.$el);

        // clear the list
        $(this.el).empty();

        // if model is not empty, iterate through each item in search result and render ArtistListItemView
        if (this.model.models.length >> 0) {
            _.each(this.model.models, function (artist) {
                $(this.el).append(new SearchListItemView({model:artist}).render().el);
            }, this);
            // open the dropdown
            $(this.SEARCH_DROPDOWN_SELECTOR).addClass('open');
        } else {
            // if search results was empty, show "No Results"
            this.clearResults();
        }

        return this;
    },

    clearResults: function() {
        // this method clears the dropdown box
        $(this.el).empty();
        this.hide();
    },


    checkToSearch: function( e ) {
        var requestedTerm = this.input.val();

        if (this.hasChanged(requestedTerm)){
            // only call search if we have passed the delay, if it's before that clear timeout and ask a new one
            if ( this.searchTimeout ) {
                clearTimeout( this.searchTimeout );
            }
            this.currentTerm = requestedTerm;
            // create a new settimeout which means run the search after SEARCH_DELAY
            this.searchTimeout = setTimeout(function() {
                this.search( requestedTerm );
            }.bind( this ), this.SEARCH_DELAY );
        }
    },

    hasChanged: function( requestedTerm ) {
        // return boolean showing if current artist search term has changed
        return requestedTerm !== this.currentTerm;
    },


    search: function ( searchTerm ) {
        // when user inputs in search text input, we check if search text is > 3 characters
        // we search the server, the reason is we get lot of results for less than 3 characters
        if (searchTerm.length > this.MINIMUM_SEARCH_LENGTH) {
            //this.searchResults.findByName(searchTerm);
            this.searchResults.fetch({
                type: 'GET',
                data: {'query': searchTerm}
            });
        } else {
            this.clearResults();
        }
    },

    keyDown: function(e) {
        if (e.keyCode == 27) return this.hide();
        return true;
    },


    hide: function() {
        $(this.SEARCH_DROPDOWN_SELECTOR).removeClass("open");
    }

});

/**
 * This view handles showing an individual artist item in search artist list
 */
window.SearchListItemView = Backbone.View.extend({
    tagName:"li",

    className: "artist-search-results",

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function () {
        // pass the model to the template
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});