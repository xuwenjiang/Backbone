var Item = Backbone.Model.extend({
    initialize: function(){
        var name = prompt('input name', 'Wenjiang Xu');
        this.set("name",name);
    } 
});

var List = Backbone.Collection.extend({
    model: Item
});

var ListView = Backbone.View.extend({
    el: 'body',
    
    events: {
        'click #push': 'pushItem',
        'click #pop' : 'popItem'
    },
    
    initialize: function() {
        _.bindAll(this, 'pushItem', 'popItem', 'render','display');
        this.collection = new List();
        this.render();
    },
    
    render: function() {
        $(this.el).append("<button id='push'>Push Item</button>");
        $(this.el).append("<button id='pop'>Pop Item</button>");
        $(this.el).append("<div></div>");
    },
    
    pushItem: function() {
        var item = new Item();
        this.collection.push(item);
        this.display();
    },
    
    popItem: function() {
        this.collection.pop();
        this.display();
    },
    
    display: function() {
        $('div', this.el).html('');
        var _this = this;
        this.collection.each(function(item){
            $('div', _this.el).append(item.get('name')+'<br/>');
        });
    }
});