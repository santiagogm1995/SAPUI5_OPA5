sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"Ejercicio2/Ejercicio2/model/models",
	"Ejercicio2/Ejercicio2/model/store"
], function (UIComponent, Device, models, store) {
	"use strict";

	return UIComponent.extend("Ejercicio2.Ejercicio2.Component", {

		metadata: {
			manifest: "json"
		},

		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();
			

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			// set odata in store
			store.setOdata(this.getModel(store.getBack()));
		}
	});
});