window.FriendModel = Backbone.Model.extend({
    /**
     * This is the backbone model to get a friend
     */
    urlRoot:"../api/message/",

    initialize:function () {
        this.list = new MessageCollection();
    }

});


window.FriendCollection = Backbone.Collection.extend({
    /**
     * This is the collection for getting user inbox
     */
    model: FriendModel,

    urlRoot:"../users/<string:user_id>/friends/",

    parse: function( dataResponse ) {
        return dataResponse.messages;
    }

});


