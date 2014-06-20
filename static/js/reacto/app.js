var app = null;
window.Router = Backbone.Router.extend({

    routes: {
        "inbox?userId=:userId": "inbox",
        "friends/": "friends",
        "messages/:id": "showMessage"
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
                $("#content").append(new InboxView({model: data.toJSON()}).render().el);
                //$('#pleaseWaitDialog').modal('hide');

            }
        });


    },

    showMessage: function(id)  {
        // first clear the content area
        $('#pleaseWaitDialog').modal({show:true});
        var message = new Message({id: id});
        // get message details from the server
        artist.fetch({
            success: function (data) {
                $('#pleaseWaitDialog').modal('hide');
                $('#content').html(new MessageView({model: data}).render().el);
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