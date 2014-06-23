window.FriendModel = Backbone.Model.extend({
    /**
     * This is the backbone model to get a friend
     */
    urlRoot:"../api/message/",

    initialize:function () {
        this.list = new FriendCollection();
    }

});


window.FriendCollection = Backbone.Collection.extend({
    /**
     * This is the collection for getting user inbox
     */
    model: FriendModel,

    url: function() {
        return "../users/" + this.at(0).get('userId') + "/friends/";
    },

    parse: function( dataResponse ) {
        return dataResponse.friends;
    }
});


