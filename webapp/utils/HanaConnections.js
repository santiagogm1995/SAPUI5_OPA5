sap.ui.define([], function () {

	var urlSF = "/DEMOAPP/";

	function readHana(sEntity, fnSuccess, fnError, filters, select, expand) {
		var oData = new sap.ui.model.odata.v2.ODataModel(urlSF, {
			json: true,
			loadMetadataAsyncs: false,
			skipMetadataAnnotations: true
		});

		var oUrlParameters = {};
		if (select !== "")
			oUrlParameters.$select = select;
		if (expand !== "")
			oUrlParameters.$expand = expand;

		oData.read(sEntity, {
			urlParameters: oUrlParameters,
			filters: [filters],
			success: fnSuccess,
			error: fnError
		});
	}

	function createHana(sEntity, oDependent, fnSuccess, fnError) {
		var oData = new sap.ui.model.odata.v2.ODataModel(urlSF, {
			json: true,
			loadMetadataAsyncs: false,
			skipMetadataAnnotations: true
		});

		oData.create(sEntity, oDependent, {
			success: fnSuccess,
			error: fnError
		});
	}

	function updateHana(sEntity, oDependent, fnSuccess, fnError) {
		var oData = new sap.ui.model.odata.v2.ODataModel(urlSF, {
			json: true,
			loadMetadataAsyncs: false,
			skipMetadataAnnotations: true
		});

		oData.update(sEntity, oDependent, {
			success: fnSuccess,
			error: fnError
		});
	}

	function deleteHana(sEntity, fnSuccess, fnError) {
		var oData = new sap.ui.model.odata.v2.ODataModel(urlSF, {
			json: true,
			loadMetadataAsyncs: false,
			skipMetadataAnnotations: true
		});

		oData.remove(sEntity, {
			success: fnSuccess,
			error: fnError
		});
	}

	return {
		readHana: readHana,
		createHana: createHana,
		updateHana: updateHana,
		deleteHana: deleteHana
	};
});