var Item = Backbone.Model.extend({
    defaults: {
        name: '',
        gender: '',
        dob: ''
    },
    url: 'server.php'
});

var List = Backbone.Collection.extend({
    model: Item
});

var ListView = Backbone.View.extend({
    el: 'body',
    
    events: {
        'click #fetchNewItem': 'fetchNewItem'
    },
    
    initialize: function() {
        _.bindAll(this, 'fetchNewItem', 'render', 'appendNewItem');
        this.collection = new List();
        this.listenTo(this.collection, "add", this.appendNewItem);
        this.render();
    },
    
    render: function() {
        $(this.el).append("<button id='fetchNewItem'>Fetch New Item</button>");
        $(this.el).append('<table border="1"><tr><td>Name</td><td>Gender</td><td>DOB</td></tr></table>');
    },
    
    fetchNewItem: function() {
        this.collection.create([],{
            wait: true
        });
    },
    
    appendNewItem: function(item) {
        $('table', this.el).append(
            '<tr>' + '<td>'+item.get('name') + '</td>' +'<td>'+item.get('gender') + '</td>' +'<td>'+item.get('dob') + '</td>'+ '</tr>'
        );
    }
});