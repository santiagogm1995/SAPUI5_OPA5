/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"Ejercicio2/Ejercicio2/controller/Home.controller",
	"./pages/Home"
], function (opaTest, HomeController) {
	"use strict";

	QUnit.module("Home");

	opaTest("Should see the initial page of the Home", function (Given, When, Then) {
		var ele = new HomeController();
		
		// Arrangements
		Given.iStartMyApp();

		// Assertions
		Then.onTheAppPage.iShouldSeeTheApp();

		//Cleanup
		Then.iTeardownMyApp();
	});

	QUnit.test("verify value and type", function (assert) {
		var oControllerHome = new HomeController();
		assert.strictEqual("TEST", oControllerHome.test(), "Test correcto");
	});

});