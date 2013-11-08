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
        var _this = this;
        this.destroy({
            error: function(){_this.trigger('failedtodestroy');},
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
        this.listenTo(this.model, "failedtodestroy", this.failedToDestroy);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.effect( "highlight", 1000);
        return this;
    },
    
    removeItem: function() {
        this.model.remove();
    },
    
    removeSelf: function() {
        var _this = this;
        this.$el.fadeOut({
            complete:function(){
                _this.trigger('fadedout');
                _this.remove();
            }
        });
    },
    
    failedToDestroy: function() {
        this.$el.effect( "highlight", {color:'#FF0000'}, 1000);
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
        _.bindAll(this, 'fetchNewItem');
        this.collection = new List();
        this.initialSubviews();
        this.listenTo(this.collection, "add", this.addItem);
        this.render();
    },
    
    fetchNewItem: function() {
        this.collection.create([],{
            wait: true
        });
    },
    
    addItem: function(item) {
        this.render();
        this.subViews['data-table'].appendItemView(item);
    },
    
    initialSubviews: function() {
        this.subViews = [];
        this.subViews['no-data'] = new ListNoDataView({
            el: this.$('#list-data-empty'),
            parentView: this
        });
        this.subViews['data-table'] = new ListDataTableView({
            el: this.$('#list-data-table'),
            parentView: this,
            collection: this.collection
        });
    },
    
    render: function() {
        if (this.collection.length == 0) {
            this.subViews['no-data'].$el.show();
            this.subViews['data-table'].$el.hide();
        } else {
            this.subViews['no-data'].$el.hide();
            this.subViews['data-table'].$el.show();
        }
    }
});

var ListNoDataView = Backbone.View.extend({
    
});

var ListDataTableView = Backbone.View.extend({
    initialize: function(options) {
        this.parentView = options.parentView;
    },
    appendItemView: function(item) {
        var itemView = new ItemView({
            model: item
        });
        
        this.listenTo(itemView,'fadedout',this.itemViewFadedout);
        
        $('table', this.el).append(itemView.render().el);
    },
    
    itemViewFadedout: function(){
        this.parentView.render();
    }
});