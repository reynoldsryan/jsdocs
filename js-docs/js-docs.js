Docs = new Mongo.Collection("docs");

if (Meteor.isClient) {

  Meteor.subscribe('docs');

  Template.body.helpers({
    docs: function() {
      if (Session.get('showFavorited')) {
        return Docs.find({checked: true}, {sort: {name: 1}});
      } else {
        return Docs.find({}, {sort: {name: 1}});
      }
    },
    showFavorited: function() {
      return Session.get('showFavorited');
    }
  });

  Template.body.events({
    "submit .new-doc": function() {
      event.preventDefault();

      var name = event.target.name.value;
      var url = event.target.url.value;
      var src = event.target.src.value;

      Meteor.call('addDoc', name, url, src);

      event.target.name.value = "";
      event.target.url.value = "";
      event.target.src.value = "";
    },
    "change .show-favorited input": function(event) {
      Session.set('showFavorited', event.target.checked);
    }
  });

  Template.doc.events({
    "click .toggle-checked": function() {
      Meteor.call('favorite', this._id, ! this.checked);
    },
    "click .delete": function() {
      Meteor.call('delete', this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}

Meteor.methods({
  addDoc: function(name, url, src) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Docs.insert({
      name: name,
      url: url,
      src: src,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  favorite: function(docId, favorite) {
    Docs.update(docId, { $set: {checked: favorite} });
  },
  delete: function(docId) {
    Docs.remove(docId);
  }
})

if (Meteor.isServer) {
  Meteor.publish('docs', function() {
    return Docs.find({owner: this.userId});
  });
}
