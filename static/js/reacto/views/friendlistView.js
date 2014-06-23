window.FriendListView = Backbone.View.extend({
    tagName: 'ul',
    className: 'table-view',
    /**
     * This class handles showing the content of the main page
     */
    initialize: function () {
    },

    render:function () {
        $(this.el).empty();
        _.each(this.model, function (friend) {
            $(this.el).append(new FriendListItemView({model: friend.toJSON()}).render().el);
        }, this);
        return this;
    }
});

window.FriendListItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'table-view-cell',

    initialize : function() {

    },

    render: function() {
        $(this.el).append(this.template({friend: this.model}));
        return this;
    }
});