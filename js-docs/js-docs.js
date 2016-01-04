Docs = new Mongo.Collection("docs");

if (Meteor.isClient) {

  Template.body.helpers({
    docs: function() {
      return Docs.find({});
    }
  });

  Template.body.events({
    "submit .new-doc": function() {
      event.preventDefault();

      var name = event.target.name.value;
      var url = event.target.url.value;
      var src = event.target.src.value;

      Docs.insert({
        name: name,
        url: url,
        src: src,
        createdAt: new Date()
      });

      event.target.name.value = "";
      event.target.url.value = "";
      event.target.src.value = "";
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
