//$(document).ready(function(){
var Controller = Backbone.Router.extend({
    routes: {
        "": "start", // Пустой hash-тэг
        "!/": "start", // Начальная страница
        "!/success": "success", // Блок удачи
        "!/error": "error" // Блок ошибки
    },

    start: function () {
        $(".block").hide(); // Прячем все блоки
        $("#start").show(); // Показываем нужный
    },

    success: function () {
        $(".block").hide();
        $("#success").show();
    },

    error: function () {
        $(".block").hide();
        $("#error").show();
    }
});

var controller = new Controller(); // Создаём контроллер
var ItemModel = Backbone.Model.extend({ //модель елемента
       default:{
       		"id": null,
            "name": "",
            "price": null,
            "quantity": 1
        },
        urlRoot: "/sell"
});

var ItemCollection = Backbone.Collection.extend({ // колекция элементов
	model: ItemModel
});

var itemcCllection = new ItemCollection( //екземпляр класса колекций
[
	{
		"id":1,
		"name":"test",
		"price":100,
		"quantity":1
	},
	{
		"id":2,
		"name":"test2",
		"price":140,
		"quantity":1
	},
	{
		"id":3,
		"name":"test3",
		"price":4,
		"quantity":1
	}
]
);

var ItemView = Backbone.View.extend({ //вид елемента
    //el: $("#valera"),
    tagName: 'tr',
    events:{
       'click .delete': 'destroy'
    },
    template: _.template($('#item-template').html()),
	initialize: function() {
	    //this._ensureElement();
	      this.model.on('destroy', this.remove, this);
//		this.render();
//        return this;
	},

	render: function() {
		//замечательный шаблон
		this.$el.html(this.template(this.model.toJSON()));
		//console.log(itemcCllection);
		return this;
	},

	remove: function  () {
    this.$el.remove();
},
    destroy: function  () {
//            e.preventDefault();
            this.model.destroy();
            //alert("model whos destroy");
            console.log(itemcCllection);
        },
//    events:{
//       'click .btn btn-primary btn-sm': 'destroy'
//    },
//
//    destroy: function  (e) {
//        this.model.destroy();
//        e.alert("yes in destroy");
//        e.console.log(itemcCllection);
//    }

//    events: {
//        "click input[type=button]": "check"
//    },
//    check: function (){
//        alert("in chek");
//        if (this.$el.find("input:text").val() =="test")
//            controller.navigate("success",true);
//            //alert("hf,jnftn1");
//        else
//            controller.navigate("error",true);
//            alert("3");
//    }
});

var ItemColectionPayView = Backbone.View.extend({
el: $("#marya"),
template: _.template($('#total-coast').html()),
initialize: function() {
    this.render();
	},

	render: function() {
	    var totalCoast = 0
		console.log(this.collection);
		console.log("hello");
		//  console.log(collection);
		//console.log(this.model.toJSON());
//        this.collection.each(function(item) {
//                totalCoast += item.get('price');
//                //var itemView = new ItemView({model: item})
//                this.$el.html(this.template(this.model.toJSON()));;
//                //this.$el.append(itemView.render().el);
//    //			itemView.delegateEvents();
//            }, this);

	////////////////////////////////
		//замечательный шаблон
		//console.log(template);
		console.log(this.template);
		this.$el.html(this.template());
		//this.$el.html(this.template(directory.model.toJSON()));
		//console.log(itemcCllection);
		return this;
	},
})

var ItemColectionView = Backbone.View.extend({ //вид колекции
el: $("#valera"),
//tagName: 'div',
initialize: function() {
this.render();
	},
	render: function() {
	    //var totalCoast = 0
		this.collection.each(function(item) {
		    //totalCoast += item.get('price');
			var itemView = new ItemView({model: item});
			this.$el.append(itemView.render().el);
//			itemView.delegateEvents();
		}, this);
		console.log('rend');
		//var itemPayView = new ItemColectionPayView({model: item});
		//$('#total-coast').text(totalCoast);
		//console.log(itemPayView);
		return this;
	}
})
var itemPayView = new ItemColectionPayView({collection: itemcCllection});
var itemsView = new ItemColectionView({collection: itemcCllection}); //экземпляр класса вид колекции
//var start = new Start();
// var Start = Backbone.View.extend({
//     el: $("#start"), // DOM элемент widget'а
//     events: {
//         "click input:button": "check" // Обработчик клика на кнопке "Проверить"
//     },
//     check: function () {
//         if (this.el.find("input:text").val() == "test") // Проверка текста
//             controller.navigate("success", true); // переход на страницу success
//         else
//             controller.navigate("error", true); // переход на страницу error
//     }
// });
// var start = new Start();
//});