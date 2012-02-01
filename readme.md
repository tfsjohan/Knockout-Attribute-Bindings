# Knockout Attribute Bindings

## href binding
Sugar for the attr binding to make it easier to create href attributes. Instead of

	<a data-bind="attr: { href: url }">Click me</a>

you can write

	<a href="data-bind="href: url">Click me</a>

to create the href attribute. Internally it uses the original attr binding.

## src bidning
Sugar for the attr binding to make it easier to create src attributes. Instead of

	<img data-bind="attr: { src: url }" />

you can write

	<img href="data-bind="src: url" />

to create the src attribute. 

This also works really well for dynamically changing the src of and iframe.

Internally it uses the original attr binding.

## css binding
The css binding enhances the builtin css binding by allowing you to set the value of an obserable as the css class name. 
This is really useful when you have a list of different types and want to style them differently.

Instead of having to create a css binding for each type and check for a true/false value, you can simple output the value of 
the observable as the css class name.

Before:

	<div data-bind="css: { easy: difficulty() == 'easy', medium: difficulty() == 'medium', hard: difficulty() == 'hard' }"></div>

After:

	<div data-bind="css: difficulty"></div>

You can mix and match these as you like:

	<div data-bind="css: [ difficulty, { completed: isCompleted }"></div>



