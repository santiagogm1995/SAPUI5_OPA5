/*global QUnit*/

sap.ui.define([
	"Ejercicio2/Ejercicio2/controller/App.controller"
], function (Controller) {
	"use strict";

	QUnit.module("App Controller");
	
	QUnit.test("verify value and type", function(assert) {
		// implementation
		var vSomeVar = "42";
		assert.strictEqual(42, vSomeVar, "42 and " + vSomeVar + " have the same value and type");
		// assert will fail
	});

});