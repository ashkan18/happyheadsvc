var app = null;
window.Router = Backbone.Router.extend({

    routes: {
        "inbox?userId=:userId": "inbox",
        "friends/": "showFriends",
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

    showFriends: function() {
        // this should call the server to show list of friends
        $("#content").html("List of friends");


    },

    authenticate: function(userId, name, access_token) {
        $.ajax({
            url:"/users/authenticate/",
            type: 'POST',
            dataType:"json",
            contentType: "application/json",
            data: {'user_id': userId,
                   'name': name,
                   'access_token': access_token},
            success:function(result){
                newObject.twittername = result.name; ;
                that.$el.html(that.template(newObject));
            }
        });
    }
});


// this is defined in templateLoader.js
templateLoader.load(["InboxView", "HeaderView", "FooterView", 'MessageView'],
    function () {
        // after loading templates now start the app
        app = new Router();
        Backbone.history.start();
        app.navigate('inbox?userId='+ 2);

    });