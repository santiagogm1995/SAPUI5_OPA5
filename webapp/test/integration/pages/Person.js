sap.ui.define([
	"sap/ui/test/Opa5"
], function (Opa5) {
	"use strict";
	var sViewName = "Person";
	Opa5.createPageObjects({
		onTheAppPage: {

			actions: {},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The Person view is displayed");
						},
						errorMessage: "Did not find the Person view"
					});
				}
			}
		}
	});

});