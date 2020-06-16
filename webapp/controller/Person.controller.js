sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/odata/v2/ODataModel',
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV',
	'sap/m/MessageBox',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"Ejercicio2/Ejercicio2/controller/BaseController",
	"Ejercicio2/Ejercicio2/utils/HanaConnections",
	"Ejercicio2/Ejercicio2/utils/utils",
	"Ejercicio2/Ejercicio2/utils/formatter",
	"Ejercicio2/Ejercicio2/model/store"
], function (Controller, JSONModel, ODataModel, Export, ExportTypeCSV, MessageBox, Filter, FilterOperator, BaseController, HanaConnection,
	Utils, formatter, Store) {
	"use strict";

	var oView;
	var that;
	var sParentView = "Person";
	var oId = Store.getOId().find(a => a.Key == sParentView).Value;

	return BaseController.extend("Ejercicio2.Ejercicio2.controller.Person", {
		formatter: formatter,
		onInit: function () {
			var oRouter;
			oView = this.getView();
			that = this;

			oRouter = sap.ui.core.UIComponent.getRouterFor(oView);
			oRouter.getRoute("Person").attachMatched(this.onRouteMatchedDetail, this);
			oRouter.getRoute("PersonId").attachMatched(this.onRouteMatchedDetail, this);

			/*******************************SmartTable**********************************/
			// var oModel = new sap.ui.model.odata.ODataModel("/DEMOAPP/", {json:true});//
			// oModel.setCountSupported(false);										   //
			// oView.setModel(oModel);												   //
			/***************************************************************************/

		},

		test: function (oEvent) {
			//var oMetadata = Utils.getMetadata(); // TODO: Cambiar metodo para recoger un ajax... o investigar como coger status code de peticion http
			var oBoolean = false;
			
			$.ajax({
				type: "GET",
				contentType: "application/xml",
				url: "/DEMOAPP",
				dataType: "xml",
				async: false,
				success: function (data, textStatus, jqXHR) {
					oBoolean = true;
				},
				error: function () {
					oBoolean = false;
				}

			});

			if (oBoolean) {
				oView.setBusy(true);
				var oFilters = Utils.getFilters(oView, sParentView);

				HanaConnection.readHana("/PERSONSet", function (data) {
					oView.setModel(new JSONModel({
						"PersonsCollection": data.results
					}), "Persons");

					oView.byId("idPersonsTable").setVisible(true);
					oView.byId("sIdPage").setHeaderExpanded(false);

					oView.setBusy(false);

				}, function (data) {}, null, "", "");
			} else {
				// bCompact = !this.getView().$().closest(".sapUiSizeCompact").length;
				
				MessageBox.alert(
					"test", {
						styleClass: "sapUiSizeCompact"
					}
				);
			}

			return true;
		},

		Change: function (oEvent) {
			var sInput = oEvent.getSource().getId().substr(oEvent.getSource().getId().lastIndexOf("-") + 1);
			var bFlag = Utils.validateRegex(oView, sParentView, sInput);

			if (!bFlag && Utils.getValue(oView, sInput) !== undefined) {
				this.getView().byId(sInput).setValueState(sap.ui.core.ValueState.Error);
			} else {
				this.getView().byId(sInput).setValueState(sap.ui.core.ValueState.None);
			}
		},

		onRouteMatchedDetail: function (oEvent) {
			var sRouter = oEvent.getSource().getPattern();
			var oArgs = oEvent.getParameter("arguments");
			var oFilters = null;

			//Check if we come from a parent view
			if (sRouter.includes("Id")) {
				oView.byId("idPersonsTable").setText(Utils.geti18n(this, "DomainEntity") + "(" + oArgs.key + ")");
				Utils.setValue(oView, "IdInput", oArgs.key);

				switch (oArgs.source) {
				case "CINE":
					oFilters = [new Filter("Idcine", sap.ui.model.FilterOperator.EQ, oArgs.key)];
					break;
				case "PERSON":
					oFilters = [new Filter("Idpersona", sap.ui.model.FilterOperator.EQ, oArgs.key)];
					break;
				}
			}
		},

		onExport: function () {

			var oExport = new Export({
				exportType: new ExportTypeCSV({
					separatorChar: ";"
				}),
				models: oView.getModel("Persons"),
				rows: {
					path: "/PersonsCollection"
				},
				columns: [{
					name: "Id",
					template: {
						content: "{Id}"
					}
				}, {
					name: "Dni",
					template: {
						content: "{Dni}"
					}
				}, {
					name: "FirstName",
					template: {
						content: "{FirstName}"
					}
				}, {
					name: "LastName",
					template: {
						content: "{LastName}"
					}
				}, {
					name: "Web",
					template: {
						content: "{Web}"
					}
				}, {
					name: "Twitter",
					template: {
						content: "{Twitter}"
					}
				}]
			});

			// download exported file
			oExport.saveFile().catch(function (oError) {}).then(function () {
				oExport.destroy();
			});
		},

		onSearch: function (oEvent) {

		
			//var oMetadata = Utils.getMetadata(); // TODO: Cambiar metodo para recoger un ajax... o investigar como coger status code de peticion http
			var oBoolean;

			$.ajax({
				type: "GET",
				contentType: "application/xml",
				url: "/DEMOAPP",
				dataType: "xml",
				async: false,
				success: function (data, textStatus, jqXHR) {
					oBoolean = true;
				},
				error: function () {
					oBoolean = false;
				}

			});

			if (oBoolean) {
				oView.setBusy(true);
				var oFilters = Utils.getFilters(oView, sParentView);

				HanaConnection.readHana("/PERSONSet", function (data) {
					oView.setModel(new JSONModel({
						"PersonsCollection": data.results
					}), "Persons");

					oView.byId("idPersonsTable").setVisible(true);
					oView.byId("sIdPage").setHeaderExpanded(false);

					oView.setBusy(false);

				}, function (data) {}, null, "", "");
			} else {
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.alert(
					Utils.geti18n(this, "MessageBoxInfo"), {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);
			}

			return "result";
		}
	});
});