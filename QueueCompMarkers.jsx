(function(){
	var strings = {
		'scriptName': "Queue Comp Markers",
		'undoName': "Queue Comp Marker",
		'fileNameSeparator': "-",
		'errors': {
			'noComp': ["No Comp Active","Please make sure a comp is active."].join("\n"),
			'noMarkers': ["No Markers","There are no markers in the active comp."].join("\n")
		}
	}

	var comp = app.project.activeItem;
	if(!(comp instanceof CompItem)) { return alert(strings.errors.noComp); }
	var markers = comp.markerProperty;
	if(markers.numKeys < 1) { return alert(strings.errors.noMarkers); }

	app.beginUndoGroup(strings.undoName);

		var rqItem, basePath;

		for(var i = 1, il = markers.numKeys; i <= il; i++) {

			rqItem = app.project.renderQueue.items.add(comp);
			rqItem.timeSpanStart = markers.keyTime(i);
			rqItem.timeSpanDuration = markers.keyValue(i).duration;
			if(markers.keyValue(i).comment != "") {
				basePath = rqItem.outputModule(1).getSettings(GetSettingsFormat.STRING)["Output File Info"]["Base Path"];
				subfolderPath = rqItem.outputModule(1).getSettings(GetSettingsFormat.STRING)["Output File Info"]["Subfolder Path"];
				rqItem.outputModule(1).setSettings({
					'Output File Info' : {
						'Base Path' : basePath,
						'Subfolder Path': subfolderPath,
						'File Name' : comp.name + strings.fileNameSeparator + markers.keyValue(i).comment + ".[fileExtension]"
					}
				});
			}
		}
	app.endUndoGroup();
})();