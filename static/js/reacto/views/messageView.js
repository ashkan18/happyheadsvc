window.MessageView = Backbone.View.extend({
    tagName: 'li',
    className: 'table-view-cell',

    initialize:function () {
    },

    render: function () {
        // response coming back from the server has a path which shows the path from
        // requested artist to Kevin Bacon

        $(this.el).append(this.template({message: this.model}));
        return this;
    }
});




