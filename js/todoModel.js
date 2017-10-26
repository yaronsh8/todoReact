/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
var app = app || {};

(function () {
	'use strict';

	var Utils = app.Utils;
	// Generic "model" object. You can use whatever
	// framework you want. For this application it
	// may not even be worth separating this logic
	// out, but we do this to demonstrate one way to
	// separate out parts of your application.
	app.TodoModel = function (key) {
		this.key = key;
		this.todos = Utils.store(key);
		this.onChanges = [];
	};

	app.TodoModel.prototype.subscribe = function (onChange) {
		this.onChanges.push(onChange);
	};

	app.TodoModel.prototype.inform = function () {
		Utils.store(this.key, this.todos);
		this.onChanges.forEach(function (cb) { cb(); });
	};

	app.TodoModel.prototype.addTodo = function (title) {
		// console.log((Math.max.apply(Math,this.todos.map((item)=>{return item.sorOrder;}))) )
		// var maxOrder = (Math.max.apply(Math,this.todos.map((item)=> item ? item.sorOrder : 0))) 

		// maxOrder=((isNaN(maxOrder))||!(isFinite(maxOrder))) ? 0 : maxOrder;
		this.todos = this.todos.concat({
			id: Utils.uuid(),
			title: title,
			completed: false,
			// sortOrder: isFinite(Math.max.apply(Math,this.todos.map(function(o){return o.sortOrder;})))?
			// Math.max.apply(Math,this.todos.map(function(o){return o.sortOrder;})) +1 : 
			// 0
		});
		this.inform();
	};

	app.TodoModel.prototype.toggleAll = function (checked) {
		// Note: it's usually better to use immutable data structures since they're
		// easier to reason about and React works very well with them. That's why
		// we use map() and filter() everywhere instead of mutating the array or
		// todo items themselves.
		this.todos = this.todos.map(function (todo) {
			return Utils.extend({}, todo, {completed: checked});
		});

		this.inform();
	};

	app.TodoModel.prototype.toggle = function (todoToToggle) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToToggle ?
				todo :
				Utils.extend({}, todo, {completed: !todo.completed});
		});

		this.inform();
	};

	app.TodoModel.prototype.destroy = function (todo) {
		this.todos = this.todos.filter(function (candidate) {
			return candidate !== todo;
		});

		this.inform();
	};

	app.TodoModel.prototype.save = function (todoToSave, text) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
		});

		this.inform();
	};

	app.TodoModel.prototype.clearCompleted = function () {
		this.todos = this.todos.filter(function (todo) {
			return !todo.completed;
		});

		this.inform();
	};

	app.TodoModel.prototype.up = function (todo) {
		var todoIndex=this.todos.indexOf(todo)
		var otherTodo = this.todos[todoIndex-1]
		console.log('todoIndex: ', todoIndex)
		if (todoIndex!=0){
			this.todos[todoIndex] = otherTodo;
			this.todos[todoIndex-1] = todo
		}	
		this.inform();
	};


	

})();
