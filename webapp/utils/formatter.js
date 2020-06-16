sap.ui.define([], function () {
	"use strict";

	return {
		formatFechaString : function(data){
			var date = new Date(data);
			return date.getDate() + "-" +(Number(date.getMonth())+1) + "-" + date.getFullYear();
		}
	};

});