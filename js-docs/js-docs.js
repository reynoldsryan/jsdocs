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
      var src = event.target.src.value;
      var name = event.target.name.value;

      Docs.insert({
        src: src,
        name: name,
        createdAt: new Date()
      });

      event.target.src.value = "";
      event.target.name.value = "";

    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
