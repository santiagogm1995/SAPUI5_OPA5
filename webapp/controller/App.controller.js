sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"Ejercicio2/Ejercicio2/controller/BaseController",
	"Ejercicio2/Ejercicio2/model/store"
], function (Controller, JSONModel, Fragment, BaseController, store) {
	"use strict";

	var oView;
	var that;

	return BaseController.extend(".controller.App", {
		onInit: function () {
			oView = this.getView();
			that = this;

			var navContent = new JSONModel({
				Nav: [{
					name: "Home"
				}, {
					name: "Person"
				}]
			});
			oView.setModel(navContent, "ListNav");
		},

		onMenuButtonPress: function (oEvent) {
			var oButton = $("#" + oEvent.getSource()._oMenuButton.sId);
			// create popover
			if (!this._oPopoverNav) {
				Fragment.load({
					id: "popoverNavCon",
					name: "Ejercicio2.Ejercicio2.view.fragments.popUpNav",
					controller: this
				}).then(function (oPopover) {
					this._oPopoverNav = oPopover;
					this.getView().addDependent(this._oPopoverNav);
					this._oPopoverNav.openBy(oButton);
				}.bind(this));
			} else {
				this._oPopoverNav.openBy(oButton);
			}

		},

		onOpenPopover: function (oEvent) {
			var oButton = oEvent.getSource();
			// create popover
			if (!this._oPopover) {
				Fragment.load({
					id: "popoverPerfilCon",
					name: "Ejercicio2.Ejercicio2.view.fragments.popUpPerfil",
					controller: this
				}).then(function (oPopover) {
					this._oPopover = oPopover;
					this.getView().addDependent(this._oPopover);
					this._oPopover.openBy(oButton);
				}.bind(this));
			} else {
				this._oPopover.openBy(oButton);
			}
		},

		onNav: function (oEvent) {

			//Route to another view
			var oRoute = this.getRouter(oView);
			oRoute.navTo(oEvent.getSource().getText(), {}, true);

			//Close instace popup
			if (this._oPopoverNav) {
				this._oPopoverNav.close();
			} else if (this._oPopover) {
				this._oPopover.close();
			}
		}

	});

});