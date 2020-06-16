sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/odata/v2/ODataModel',
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV',
	'sap/m/MessageBox',
	"Ejercicio2/Ejercicio2/controller/BaseController",
	"Ejercicio2/Ejercicio2/utils/HanaConnections",
	"Ejercicio2/Ejercicio2/utils/utils",
	"Ejercicio2/Ejercicio2/utils/formatter"
], function (Controller, JSONModel, ODataModel, Export, ExportTypeCSV, MessageBox, BaseController, HanaConnection, Utils, formatter) {
	"use strict";

	var oView;

	return BaseController.extend("Ejercicio2.Ejercicio2.controller.Home", {
		formatter: formatter,
		onInit: function () {

			oView = this.getView();

		},

		test: function(){
			return "TEST";	
		},
	
		prueba: function () {
			// sap.m.MessageBox.alert("This message should appear in the alert", {
			// 	title: "Alert", // default
			// 	onClose: null, // default
			// 	styleClass: "", // default
			// 	initialFocus: null, // default
			// 	textDirection: sap.ui.core.TextDirection.Inherit // default
			// });

			var settings = {
				url: "http://3.19.76.105:5000/test",
				method: "GET",
				timeout: 0,
				contentType: 'application/atom+xml',
				dataType: 'jsonp',
				crossDomain: true,
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
				},
				headers: {
					'Access-Control-Allow-Origin': '*',
					"Authorization": "Basic UDIwMDEyMDQxNjI6aUkwWmJaS0I2ZFNCMllLMQ=="
				},
			};

			// $.ajax(settings).done(function (response) {
			// 	console.log(response);
			// });
			$.ajax({
				type: 'GET',
				url: 'https://a6mad277ddd4.hana.ondemand.com/CADGENERATOR/CAD_SERVICE.xsodata/PERSONSet',
				cache: false,
				dataType: 'json',
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
				},
				headers: {
					'Access-Control-Allow-Origin': '*',
					"Authorization": "Basic UDIwMDEyMDQxNjI6aUkwWmJaS0I2ZFNCMllLMQ=="
				},
				error: function (msg, textStatus) {
					console.log(textStatus);
				},
				success: function (data) {
					console.log(data);
				}
			});

		},
		prueba2: function () {
			sap.m.MessageBox.information("This message should appear in the information message box", {
				title: "Information", // default
				onClose: null, // default
				styleClass: "", // default
				initialFocus: null, // default
				textDirection: sap.ui.core.TextDirection.Inherit // default
			});
		},
		prueba3: function () {
			sap.m.MessageBox.error("This message should appear in the error message box", {
				title: "Error", // default
				onClose: null, // default
				styleClass: "", // default
				initialFocus: null, // default
				textDirection: sap.ui.core.TextDirection.Inherit // default
			});
		}
	});
});