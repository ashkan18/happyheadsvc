var app = null;
window.Router = Backbone.Router.extend({

    routes: {
        "inbox?userId=:userId": "inbox",
        "friends/:userId": "showFriends",
        "messages/:messageId": "showMessage"
    },

    initialize: function () {
        // show header section on the initiliaze of the app
        this.headerView = new HeaderView();
        this.footerView = new FooterView();

    },

    // showing the landing page content
    inbox: function (userId) {
        console.log("calling inbox with userId=" + userId);
        // render home page by creating home view
        this.userId = userId;

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

    showFriends: function(userId) {
        this.friendsCollection = new FriendCollection({userId: userId});

        this.friendsCollection.fetch({
           success: function(data) {
               $("content").html(new FriendListView({model: data.toJSON()}).render().el);
           }
        });
    },

    authenticate: function(userId, name, access_token) {
        $.ajax({
            url:"/users/authenticate/",
            type: 'POST',
            data: {'user_id': userId,
                   'name': name,
                   'access_token': access_token},
            success:function(result){
                // after successful login, go to inbox page
                app.navigate('inbox?token='+ response.authResponse.accessToken + "&user=" + response.authResponse.userID);
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
        app.navigate('inbox?userId='+ 2);

    });