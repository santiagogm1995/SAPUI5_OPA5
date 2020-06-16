	sap.ui.define([
		"sap/ui/test/opaQunit",
		"Ejercicio2/Ejercicio2/controller/Home.controller",
		"Ejercicio2/Ejercicio2/controller/Person.controller",
		"sap/ui/test/actions/Press",
		"sap/ui/model/resource/ResourceModel",
		"./pages/App"
	], function (opaTest, HomeController, PersonController, Press, ResourceModel) {
		"use strict";

		QUnit.module("Home");

		opaTest("Should see the initial page of the app", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();

			//var ele = $('[title="Menú"]').get()[0].id;
			var callBack = function () {
				Given.onTheAppPage.openNavMenu();
			};
			
			Given.waitFor({
				viewName: "Home",
				success: function () {
					Given.waitFor({
						id: $('[title="Menú"]').get()[0].id,
						actions: new Press(),
						success: function(){	
						},
						errorMessage: "Can't find the button"
					});
				},
				errorMessage: "Can't find the button"
			});

			When.waitFor({
				id: "popoverNavCon--goToPersonPage",
				actions: new Press()
			});

			Then.onTheAppPage.iShouldSeeTheApp();

		});

		QUnit.module("Person");

		opaTest("Should see the initial page of Person", function (Given, When, Then) {

			Then.onTheAppPage.iShouldSeeThePersonApp();

		});

		opaTest("ERROR: Can't connect to database", function (Given, When, Then) {

			Given.onTheAppPage.pressOnSearchButton();

			Then.onTheAppPage.iShouldSeeTheMessageBox();

			Then.iTeardownMyApp();
		});

	});