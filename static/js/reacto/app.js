var app = null;
window.Router = Backbone.Router.extend({

    routes: {
        "authenticate/:userId/:name/:accessToken": "authenticate", // we should remove this later, here just for testing
        "inbox/": "inbox",
        "friends/": "showFriends",
        "messages/:messageId": "showMessage",
        "search?query=:query": "searchUsers"
    },

    initialize: function () {
        // show header section on the initiliaze of the app
        this.headerView = new HeaderView();
        this.footerView = new FooterView();

    },

    // showing the landing page content
    inbox: function () {
        console.log("calling inbox with userId=" + userId);
        // render home page by creating home view

        this.inboxModel = new InboxModel({id: this.userId});

        this.inboxModel.fetch({
            success: function (data) {
                $("#content").html(new InboxView({model: data.toJSON()}).render().el);
                //$('#pleaseWaitDialog').modal('hide');

            }
        });
    },

    showMessage: function(messageId)  {
        // in this method we will make jsbridge call to open the message and take picture in native app
        Platform.showMessageAndTakePhoto(messageId);
    },

    showFriends: function() {
        this.friendsCollection = new FriendCollection({userId: this.userId});

        this.friendsCollection.fetch({
           success: function(collection, response) {
               $("#content").html(new FriendListView({model: collection.models}).render().el);
           }
        });
    },

    searchUsers: function(query) {
        this.searchCollection = new SearchCollection({searchQuery: query});
        this.searchCollection.fetch({
           data: {query: query},
           success: function(collection, response) {
               $('#content').html(new FriendListView({model: collection.models}).render().el)
           }
        });
    },

    authenticate: function(userId, name, access_token) {
        this.userId = userId;
        this.userName = name;
        $.ajax({
            url:"/users/authenticate/",
            type: 'POST',
            data: {'user_id': userId,
                   'name': name,
                   'access_token': access_token},
            success:function(result){
                // after successful login, go to inbox page
                app.navigate('inbox/');
            }
        });
    }
});


// this is defined in templateLoader.js
templateLoader.load(["InboxView", "HeaderView", "FooterView", 'MessageView', 'FriendListItemView'],
    function () {
        // after loading templates now start the app
        app = new Router();
        Backbone.history.start();
    });