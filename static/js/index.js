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
       		"id": 1,
            "name": "",
            "price": null,
            "quantity": 1,
            "ready": 1,
            "total_amount": null
        },
        urlRoot: "/sell"
});

var ItemCollection = Backbone.Collection.extend({ // колекция элементов
	model: ItemModel
});
var testmodel = [{
		"id":100,
		"name":"foo",
		"price":25,
		"quantity":5,
		"total_amount": 5
	}
	];
var itemcCllection = new ItemCollection( //екземпляр класса колекций
//[
//	{
//		"id":1,
//		"name":"test",
//		"price":100,
//		"quantity":1,
//		"total_amount": 6
//	},
//	{
//		"id":2,
//		"name":"test2",
//		"price":142,
//		"quantity":1,
//		"total_amount": 6
//	},
//	{
//		"id":3,
//		"name":"test3",
//		"price":4,
//		"quantity":1,
//		"total_amount": 5
//	}
//]
);

var ItemView = Backbone.View.extend({ //вид елемента
    //el: $("#valera"),
    tagName: 'tr',
    events:{
       'click .delete': 'destroy',
       'change .huyvrot': 'test91'

    },
    template: _.template($('#item-template').html()),
	initialize: function() {
	    //this._ensureElement();
	      this.model.set({total_amount:this.model.get("price")})
	      this.model.on('destroy', this.remove, this);
	      this.model.on('change', this.render, this);
//		this.render();
//        return this;
	},

	render: function() {
	    var sumPrice = 100500;
		//замечательный шаблон
		this.$el.html(this.template(this.model.toJSON() ));
		//console.log(itemcCllection);
		return this;
	},

	remove: function  () {
    this.$el.remove();
},

    test91: function () {
    alert("onchamge ran");
    // console.log(this.$("input:text").val());
    this.model.set({quantity: this.$("input:text").val()})
    this.model.set({total_amount: (this.model.get("quantity")*this.model.get("price"))})
    this.$("input").val(this.model.get("quantity"))
    },
    destroy: function  (event) {
            event.preventDefault();
            this.model.destroy();
            //alert("model whos destroy");
            //console.log(itemcCllection);
        },
});

var ItemColectionPayView = Backbone.View.extend({
el: $("#marya"),
template: _.template($('#total-coast').html()),

initialize: function() {
    this.render();
    this.collection.on('remove', this.render, this);
    this.collection.on('change', this.render, this);
    return this;
	},
//	test12: function() {
//	    alert(123);
//	},
    events:{
       'click .totalsum': 'pay',
    },

    pay: function(){
    alert("pay");
    var dataCollection = itemcCllection.toJSON()
    console.log("thuy!!!!",dataCollection);
    console.log(JSON.stringify(dataCollection));
        $.ajax({
            type: "POST",
            crossDomain:true,
            url: '/getbarcode/',             // указываем URL и
            dataType : "json",                     // тип загружаемых данных
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(dataCollection),
            error: function(){
            alert('Load was performed.');
            },
             success: function (data, textStatus) { // вешаем свой обработчик на функцию success
             itemcCllection.add(data);
             console.log("Last coll", itemcCllection.last());
             console.log("colection tut",itemcCllection);
            }
        });

    },
	render: function() {
	    var totalCoast = 0
		//console.log(this.collection);

		this.collection.each(function(item) {
                totalCoast += item.get('total_amount');
         }, this);
		var markup = this.template({totalCoast: totalCoast});
		this.$el.html(markup);
		//console.log(markup);
		return this;
		console.log(template());
		console.log(this.template());
		this.$el.html(this.template(this.totalCoast));
		//this.$el.html(this.template(directory.model.toJSON()));
		//console.log(itemcCllection);
		return this;
	},
});

var ItemColectionView = Backbone.View.extend({ //вид колекции
el: $("#valera"),
//tagName: 'div',

initialize: function() {
this.collection.on('add', this.rerender, this);
this.render();
	},
	render: function() {
		this.collection.each(function(item) {
			var itemView = new ItemView({model: item});
			this.$el.append(itemView.render().el);
		}, this);
		console.log(this.collection);
		return this;
	},
	rerender: function(){
	    var itemView = new ItemView({model:itemcCllection.last() });
	    this.$el.append(itemView.render().el);
	    return this;
	},
});
var jsonMass = 2;

var itemPayView = new ItemColectionPayView({collection: itemcCllection});
var itemsView = new ItemColectionView({collection: itemcCllection}); //экземпляр класса вид колекции

function getBarcode() {
            var barcode = $('#barcode').val()
            $.ajax({
            type: "GET",
            crossDomain:true,
            url: '/getbarcode/',             // указываем URL и
            data: {"barcode": barcode},
            dataType : "json",                     // тип загружаемых данных
            error: function(){
            alert('Load was performed.');
            },
             success: function (data, textStatus) { // вешаем свой обработчик на функцию success
             itemcCllection.add(data);
             console.log("Last coll", itemcCllection.last());
             console.log("colection tut",itemcCllection.toJSON());
            }
        });
};
