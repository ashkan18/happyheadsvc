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
        var friends = this.model.friends;
        _.each(friends, function (friend) {
            $(this.el).append(new FriendListItemView({model: friend}).render().el);
        }, this);
        return this;
    }
});

window.FriendListItemView = Backbone.View.extend({
   tagName: 'li',
   className: 'table-view',

    initialize : function() {

    },

    render: function() {
        $(this.el).append(this.template({friend: this.model}));
        return this;
    }
});