var Item = Backbone.Model.extend({
    idAttribute: 'id',
    
    defaults: {
        id: '',
        name: '',
        gender: '',
        dob: ''
    },
    
    action: 'add',
    
    url: function() {
        if (this.action == 'add') {
            return 'add.php'
        } 
        
        if (this.action == 'delete') {
            return 'delete.php'
        }
        
        return 'add.php';
    },

    remove: function() {
        this.action = 'delete';
        this.destroy({
            error: function(){alert('failed to delete');},
            wait: true
        });
    },

    save: function() {
        this.action = 'add';
        Backbone.Model.prototype.save.apply(this, arguments);
    }
});

/*****************************************************/
//item view cares item destroy, and remove itself if item was destroyed
var ItemView = Backbone.View.extend({
    tagName: 'tr',

    template: _.template(this.$('#item-template').html()),

    events: {
        'click .remove-item': 'removeItem'
    },
    
    initialize: function() {
        this.listenTo(this.model, "destroy", this.removeSelf);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    
    removeItem: function() {
        this.model.remove();
    },
    
    removeSelf: function() {
        this.remove();
    }
});

/*****************************************************/

var List = Backbone.Collection.extend({
    model: Item
});

/*****************************************************/
//list view only cares about adding new item to list because remove button belongs to each item view
var ListView = Backbone.View.extend({
    el: 'body',
    
    events: {
        'click #fetchNewItem': 'fetchNewItem'
    },
    
    initialize: function() {
        _.bindAll(this, 'fetchNewItem', 'appendItemView');
        this.collection = new List();
        this.listenTo(this.collection, "add", this.appendItemView);
    },
    
    fetchNewItem: function() {
        this.collection.create([],{
            wait: true
        });
    },
    
    appendItemView: function(item) {
        var itemView = new ItemView({
            model: item
        });
        
        this.listenTo(itemView, "removethisitem", this.removeItem);
        
        $('table', this.el).append(itemView.render().el);
    }
});