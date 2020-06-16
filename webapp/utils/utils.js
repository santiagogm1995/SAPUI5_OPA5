sap.ui.define([
	"Ejercicio2/Ejercicio2/model/store",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (store, Filter, FilterOperator) {

	var back = store.getBack();
	var oId = store.getOId();

	function geti18n(that, sText, aVariables) {
		if (aVariables)
			return that.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sText, aVariables);
		else
			return that.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sText);
	}

	function getMetadata() {
		return new sap.ui.model.odata.ODataModel(store.getOdata().sServiceUrl, false);
	}

	function getValue(oView, sId) {
		var oObject = oView.byId(sId);
		var msg;
		var oValue;

		if (oObject == undefined) {
			msg = "Objeto no encontrado";
		} else {
			var sMetadata = oObject.getMetadata();

			switch (sMetadata._sClassName) {
			case "sap.m.Input":
				var sSubTipo = oView.byId(sId).getType();
				if (sSubTipo == "Number") {
					oValue = Number(oObject.getValue()) == 0 ? undefined : Number(oObject.getValue());
				} else {
					oValue = oObject.getValue() == "" ? undefined : oObject.getValue();
				}
				break;
			case "sap.m.DatePicker":
				oValue = oObject.getValue() == "" ? undefined : oObject.getValue();
				break;
			case "sap.m.Select":
				oValue = oObject.getSelectedKey() == "" ? undefined : oObject.getSelectedKey();
				break;
			default:
				msg = "Tipo no configurado";
				break;
			}
		}

		if (msg != undefined) {
			console.error(msg + sId)
		} else {
			return oValue;
		}
	}

	function setValue(oView, sId, oValue) {
		var oObject = oView.byId(sId);
		var msg;

		if (oObject == undefined) {
			msg = "Objeto no encontrado";
		} else {
			var sMetadata = oObject.getMetadata();

			switch (sMetadata._sClassName) {
			case "sap.m.Input":
				var sSubTipo = oObject.getType();

				if (sSubTipo == "Number" && Number(oValue) != NaN) {
					oObject.setValue(oValue);
				} else {
					oObject.setValue(oValue);
				}
				break;
			case "sap.m.DatePicker":
				oObject.setValue(oValue);
				break;
			case "sap.m.Select":
				break;
			default:
				msg = "Tipo no configurado";
				break;
			}
		}

		console.error(msg)
	}

	function validateRegex(oView, sParent, sInput) {
		var bOutput = "true";
		var oValue = this.getValue(oView, sInput);
		var oParent = oId.find(a => a.Key == sParent).Value;
		var oRegex = oParent.find(a => a.idFront == sInput).regex;

		if (!oRegex.test(oValue)) {
			bOutput = false;
		}

		return bOutput;
	}

	function getFilters(oView, sParent) {
		let that = this;
		var oInputs = oId.find(a => a.Key == sParent).Value;
		var Filters = [];

		oInputs.forEach(function (a) {
			if (a.value == undefined) {
				return;
			};
			var oValue = that.getValue(oView, a.idFront);
			oValue == undefined ? 0 : Filters.push(new Filter(a.idBack, a.idTypeFilter, oValue.toUpperCase()));
		}, [that, oView]);

		return Filters;
	}

	return {
		geti18n: geti18n,
		getMetadata: getMetadata,
		getValue: getValue,
		setValue: setValue,
		validateRegex: validateRegex,
		getFilters: getFilters
	};
});