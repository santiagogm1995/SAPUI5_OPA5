sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourney",
	//"./HomeJourney",
	//"./PersonJourney"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "Ejercicio2.Ejercicio2.view.",
		autoWait: true
	});
});