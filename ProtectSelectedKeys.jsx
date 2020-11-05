// ProtectKeys.jsx
// Author: Paul Conigliaro
// Date: 2018-09-19
// Creates a protected marker range around selected keyframes.

(function (){
	// Script Parameters
	var params = {
        'scriptName': "Project Selected Keys",
        'undoName' : "Protect Selected Keys",
        'prompts' : {
        	'markerName' : "Enter marker name:"
        },
        'errors' : {
        	'noComp' : "No Comp Active\nPlease make sure a comp is active.",
        	'noKeys' : "No Keyframes Selected\nPlease select keyframes to create the protected range."
        }
    };

    // Get active comp
	var comp = app.project.activeItem;
	// Make sure a comp is selected
	if(!(comp instanceof CompItem)) { alert(params.errors.noComp); return null;}
    
    // Make sure properties/keys are selected
    if(comp.selectedProperties.length == 0) { alert(params.errors.noKeys); return null; }

    // Get first and last key times
	var keyBounds = getFirstLastKeyframes(comp.selectedProperties);
	
	if(keyBounds === false) { alert(params.errors.noKeys); return null}

    // Create marker from selected keys
    app.beginUndoGroup(params.undoName);
    	var markerName = prompt(params.prompts.markerName);
    	var keyMarker = new MarkerValue(markerName);
    	keyMarker.duration = keyBounds.lastKey-keyBounds.firstKey;
    	keyMarker.protectedRegion = true;
    	comp.markerProperty.setValueAtTime(keyBounds.firstKey, keyMarker);
	app.endUndoGroup();

	function getFirstLastKeyframes(theProperties) {
		// Calculate first and last keyframe times
		var firstKey = comp.duration;
		var lastKey = 0;
		var keyTime = 0;
		var keyIndex, keyTime;
		var keysSelected = false;
		for (var i = 0; i < theProperties.length; i++) {
			if (theProperties[i].isTimeVarying) {
				for (var j=0; j<theProperties[i].selectedKeys.length; j++) {
					keyIndex = theProperties[i].selectedKeys[j];
					keyTime = theProperties[i].keyTime(keyIndex);
					//Check keyTime against first and last time
					if(keyTime<firstKey) firstKey = keyTime;
					if(keyTime>lastKey) lastKey = keyTime;
				}
			}
		}
		return {'firstKey': firstKey, 'lastKey': lastKey};
	}
})();