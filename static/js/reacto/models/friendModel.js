window.UserModel = Backbone.Model.extend({
    /**
     * This is the backbone model to get a friend
     */
    urlRoot:"/users/",

    initialize:function () {
        this.list = new FriendCollection();
    }

});


window.FriendCollection = Backbone.Collection.extend({
    /**
     * This is the collection for getting user inbox
     */
    model: UserModel,

    url: function() {
        return "../users/" + this.at(0).get('userId') + "/friends/";
    },

    parse: function( dataResponse ) {
        return dataResponse.friends;
    }
});

window.SearchCollection = Backbone.Collection.extend({
    model: UserModel,

    url:"/users/search/",

    parse: function( dataReponse ) {
        return dataReponse.results;
    }

});


