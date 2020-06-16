sap.ui.define([
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
	],
	function (JSONModel, Filter, FilterOperator) {

		var oData;
		var sBack = "DEMOAPP";
		var oRegex = [{
			type: "Decimal",
			regex: new RegExp(/^[0-9]{0,3}[.]?([0-9]{0,2})?$/)
		}];
		var oId = [
			{},
			{
			Key: "Person",
			Value: [{
				idFront: "InputId",
				idBack: "Id",
				idTypeFilter: FilterOperator.EQ,
				value: undefined,
				regex: undefined
			}, {
				idFront: "InputDni",
				idBack: "Dni",
				idTypeFilter: FilterOperator.EQ,
				value: undefined,
				regex: undefined
			}, {
				idFront: "InputFirstName",
				idBack: "FirstName",
				idTypeFilter: FilterOperator.EQ,
				value: undefined,
				regex: undefined
			}, {
				idFront: "InputLastName",
				idBack: "LastName",
				idTypeFilter: FilterOperator.EQ,
				value: undefined,
				regex: undefined
			}, {
				idFront: "InputDateBirth",
				idBack: "DateBirth",
				idTypeFilter: FilterOperator.EQ,
				value: undefined,
				regex: undefined
			}, {
				idFront: "InputHeight",
				idBack: "Height",
				idTypeFilter: FilterOperator.EQ,
				value: undefined,
				regex: oRegex.find(a => a.type == "Decimal").regex
			}, {
				idFront: "InputWeb",
				idBack: "Web",
				idTypeFilter: FilterOperator.Contains,
				value: undefined,
				regex: undefined
			}, {
				idFront: "InputTwitter",
				idBack: "Twitter",
				idTypeFilter: FilterOperator.Contains,
				value: undefined,
				regex: undefined
			}]
		}];

		return {

			setOdata: function (_odata) {
				oData = _odata;
			},

			getOdata: function () {
				return oData;
			},

			getOId: function () {
				return oId;
			},

			getBack: function () {
				return sBack;
			}

		};
	});