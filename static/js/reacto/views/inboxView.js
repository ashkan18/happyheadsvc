window.InboxView = Backbone.View.extend({
    //el: '#content',
    tagName: 'ul',
    className: 'table-view',
    /**
     * This class handles showing the content of the main page
     */
    initialize:function () {
    },

    render:function () {
        $(this.el).empty();
        messages = this.model.inbox;
        _.each(messages, function (message) {
            $(this.el).append(new MessageView({model: message}).render().el);
        }, this);
        return this;
    }

});