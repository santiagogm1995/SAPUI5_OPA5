sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press"
], function (Opa5, Press) {
	"use strict";
	
	var idHome;
	
	Opa5.createPageObjects({
		onTheAppPage: {
			actions: {
				pressOnSearchButton: function () {
					return this.waitFor({
						id: "btnSearch",
						viewName: "Person",
						actions: new Press(),
						errorMessage: "Can't find the button"
					});
				},

				openNavMenu : function () {
					return this.waitFor({
						id: "__button0",
						actions: new Press(),
						success: function(){
							console.log(idHome);	
						},
						errorMessage: "Can't find the button"
					});
				},
				
				findId: function (){
					return this.waitFor({
						viewName: "Home",
						success: function (){
							idHome = $('[title="Menú"]').get()[0].id;
						},
						errorMessage: "Can't find the button"
					});
					
				}

			},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						id: "app",
						viewName: "App",
						success: function () {
							Opa5.assert.ok(true, "The App view is displayed");
						},
						errorMessage: "Did not find the App view"
					});
				},

				iShouldSeeThePersonApp: function () {
					return this.waitFor({
						viewName: "Person",
						success: function () {
							Opa5.assert.ok(true, "The Person view is displayed");
						},
						errorMessage: "Did not find the Person view"
					});
				},
				iShouldSeeTheMessageBox: function () {
						return this.waitFor({
							pollingInterval: 10,
							searchOpenDialogs: true,
							actions: new Press(),
							success: function (oDialogs) {
								if (oDialogs[oDialogs.length - 1].$().text() === "OK") {
									oDialogs[oDialogs.length - 1].$().trigger("click");
									Opa5.assert.notOk(true, "Found OK button inside open dialog!");
								}
							},
							errorMessage: "Did not find either the open dialog or buttons inside an open dialog"
						});
					}
					// iShouldSeeTheMessageBox: function () {
					// 	return this.waitFor({
					// 		pollingInterval: 10,
					// 		searchOpenDialogs: true,
					// 		actions: new Press(),
					// 		success: function (oDialogs) {
					// 			if (oDialogs[oDialogs.length - 1].$().text() === "OK") {
					// 				oDialogs[oDialogs.length - 1].$().trigger("click");
					// 				Opa5.assert.ok(true, "Found OK button inside open dialog!");
					// 			}
					// 		},
					// 		errorMessage: "Did not find either the open dialog or buttons inside an open dialog"
					// 	});
					// }
			}
		}
	});

});