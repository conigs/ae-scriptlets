// Move all layers to the CTI as a group
// hold ALT/OPT to specify a starting time.

(function (){

	// Script Parameters
	var params = {
        'scriptName': "Shift Layer Group",
        'undoName' : "Shift Layers",
        'prompts' : {
        	'timeTitle' : "Enter Time:",
        	'timeDefault' : "00:00:00:00"
        },
        'errors' : {
        	'noComp' : "No Comp Active\nPlease make sure a comp is active.",
        	'noLayers' : "No Layers Selected\nYou need at least one layer selected."
        }
    };

    // Get active comp
	var comp = app.project.activeItem;
	// make sure a comp is selected
	if(!(comp instanceof CompItem)) { return alert(params.errors.noComp); }

	// Get selected layers
	var selectedLayers = comp.selectedLayers;
	// make sure at least one layer is selected
	if (comp.selectedLayers.length == 0 ) { return alert(params.errors.noLayers); }

	// Initialize variables
	var earliestInPoint, currentLayer, targetTime, timeDifference;

	// Find earliest in point
	earliestInPoint = selectedLayers[0].inPoint; 
	
	// Skip first layer as we don't need to check it
	for (var i = 1, il = selectedLayers.length; i < il; ++i) {
		currentLayer = selectedLayers[i];
		if (currentLayer.inPoint < earliestInPoint) {
			earliestInPoint = currentLayer.inPoint;
		}
	}

	// Check if alt/opt key is pressed for timecode
	if(ScriptUI.environment.keyboardState.altKey === true) {
		var tc = prompt(params.prompts.timeTitle, params.prompts.timeDefault);
		var fps = 1/comp.frameDuration;
		targetTime = currentFormatToTime(tc, fps);
	} else {
		targetTime = comp.time;
	}

	// Get difference between earliest layer and target time
	timeDifference = targetTime - earliestInPoint;
	
	// Shift the layers as a group
	app.beginUndoGroup(params.undoName);
	{
		for (i = 0; i < selectedLayers.length; ++i) {
			currentLayer = selectedLayers[i];
			currentLayer.startTime += timeDifference;
		}				
	}
	app.endUndoGroup();

})();