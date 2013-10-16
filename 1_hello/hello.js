var HelloView = Backbone.View.extend({
    el: 'body', //可以使用tagName等声明，效果一样
        
    events: {
        'click #hello': 'sayHello',
        'change #name': 'updateName'
    },
        
    initialize: function()
    {
        _.bindAll(this, 'render', 'sayHello','updateName');
        this.name = '';
        this.render();
    },
        
    render: function()
    {
        $(this.el).append("<label for='name'>Your name:</label><input id='name'/>");
        $(this.el).append("<button id='hello'>Say Hello</button>");
        $(this.el).append("<ul></ul>");
    },
        
    updateName: function()
    {
        this.name = this.$el.find('#name').val()
    },
        
    sayHello: function()
    {
        $('ul', this.el).append("<li>hello " + this.name +"</li>");
    }
});
