/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"Ejercicio2/Ejercicio2/controller/Person.controller",
	"sap/ui/test/actions/Press",
	"./pages/Person"
], function (opaTest, PersonController, Press) {
	"use strict";

	QUnit.module("Person");

	opaTest("Should see the initial page of the Person", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		When.waitFor({
			id: "__button0",
			actions: new Press()
		});

		When.waitFor({
			id: "popoverNavCon--goToPersonPage",
			actions: new Press()
		});

		// Assertions
		Then.onTheAppPage.iShouldSeeTheApp();

		//Cleanup
		Then.iTeardownMyApp();
	});

	QUnit.test("Testing module", function (assert) {
		var oControllerHome = new PersonController();
		
		assert.equal(oControllerHome.test(),true,"Return OK");
		assert.equal(oControllerHome.test(),false,"Return NOOK");

	});

});