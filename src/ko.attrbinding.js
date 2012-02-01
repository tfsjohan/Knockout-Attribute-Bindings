/// <reference path="../../Scripts/knockout-latest.debug.js" />

(function () {
	// Sugar for attr: { href: observable }
	ko.bindingHandlers.href = {
		update: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
			if (typeof ko.bindingHandlers.attr.update === "function") {
				ko.bindingHandlers.attr.update(
					element,
					function () { return { href: ko.utils.unwrapObservable(valueAccessor()) }; },
					allBindingsAccessor,
					viewModel,
					context);
			}
		}
	};

	// Sugar for attr: { src: observable }
	ko.bindingHandlers.src = {
		update: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
			if (typeof ko.bindingHandlers.attr.update === "function") {
				ko.bindingHandlers.attr.update(
					element,
					function () { return { src: ko.utils.unwrapObservable(valueAccessor()) }; },
					allBindingsAccessor,
					viewModel,
					context);
			}
		}
	};

	// Enhanced css binding that allows you to set the value of an observable as css classes.
	var originalBinding = ko.bindingHandlers.css;
	ko.bindingHandlers.css = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
			if (typeof jQuery === 'undefined') {
				throw 'ko.bindingHandlers.css: This binding requires jQuery'
			}

			// Save the hardcoded class names
			jQuery(element).data("originalClasses", element.className);
		},

		update: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
			if (typeof jQuery === 'undefined') {
				throw 'ko.bindingHandlers.css: This binding requires jQuery'
			}

			var css = ko.utils.unwrapObservable(valueAccessor());
			var el = jQuery(element);

			// Reset the classes
			el.attr("class", jQuery(element).data("originalClasses"));

			if (typeof css === 'undefined') {
				return;
			}
			// Single string - just set the class
			// css: myObservable
			else if (typeof css === "string") {
				el.addClass(css);
			}
			// Array of values - loop thru the array and check if it's a object like the original KO css binding, or a single observable
			// to set as a class
			// css: [ myObservable, { selected: isSelected } ]
			else if (Object.prototype.toString.call(css) === '[object Array]') {
				for (var i = 0; i < css.length; i++) {
					var cssItem = ko.utils.unwrapObservable(css[i]);
					if (typeof cssItem === 'object') {
						for (var x in cssItem) {
							var v = ko.utils.unwrapObservable(cssItem[x]);
							if (v) {
								el.addClass(x);
							}
						}
					}
					else {
						el.addClass(cssItem);
					}
				}
			}
			// Original KO css binding object
			else if (typeof css === 'object') {
				originalBinding.update(element, valueAccessor, allBindingsAccessor, viewModel, context);
			}
		}
	};
})();