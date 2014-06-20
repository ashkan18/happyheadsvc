window.Message = Backbone.Model.extend({
    /**
     * This is the backbone model to get an artist
     */
    urlRoot:"../api/message/",

    initialize:function () {
        this.list = new MessageCollection();
    }

});


window.MessageCollection = Backbone.Collection.extend({
    /**
     * This is the collection for getting user inbox
     */
    model: Message,

    url:"../messages/user/",

    parse: function( dataResponse ) {
        return dataResponse.messages;
    }

});


window.InboxModel = Backbone.Model.extend({
    /**
     * This is the backbone model to get an artist
     */
    urlRoot:"../messages/user/",

    initialize:function () {
        this.list = new MessageCollection();
    }

});


