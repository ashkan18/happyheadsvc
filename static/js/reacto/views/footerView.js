/**
 * This file defines HeaderView which basically shows the header bar with search input
 * and handles showing the result of the search for artists
 */
window.FooterView = Backbone.View.extend({
    el: '#footer',

    initialize: function () {
        // render the header section in init
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});