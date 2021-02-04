/********
Mattelock v1.2
by Paul Conigliaro

Applies the "Set Matte" effect to the first selected layer(s)
with the "Take Matte From Layer" property set to the
last layer selected.

Apply to KBar button or run from the Script menu.

Usage:

1. Select the layer(s) to apply the matte to

2. Select the layer to use as the source of the matte.

Optional: Hold ALT/Option to invert the matte.
-OR-
Optional: Hold Shift to apply inverted matte to layers
using eachother as the source.

3. Run script

********/

(function matteLock(){

	var params = {
		"scriptName" : "Mattelock",
		"undoName" : "Apply Set Matte",
		"error" :  "Select At Least 2 Layers\nPlease first select the layer(s) to apply Set Matte to, then select the matte source layer last."
	};

	//Get active comp
	var comp = app.project.activeItem;

	//Return error if no comp is selected
	if(comp === null || !(comp instanceof CompItem)) { alert(params.error); return; }
	
	//Get selected layers
	var selectedLayers = comp.selectedLayers;

	//Return error if more or fewer than two layers are selected
	if(selectedLayers.length < 2) { return alert(params.error); }


	app.beginUndoGroup(params.undoName);

		//Apply Set Matte effect to the first selected layer
		for(var i=0, il=selectedLayers.length-1; i<il; i++) {
			var setMatteEffect = selectedLayers[i].property("ADBE Effect Parade").addProperty("ADBE Set Matte3");
			//Set the source of the matte to the second selected layer
			setMatteEffect.property(1).setValue(selectedLayers[il].index);
			//Invert the matte if ALT/Option is held
			setMatteEffect.property(3).setValue(ScriptUI.environment.keyboardState.altKey);
			//Apply matte to second layer if Shift is held
			if(ScriptUI.environment.keyboardState.shiftKey) {
				//Set first layer matte to Invert
				setMatteEffect.property(3).setValue(true);
				//Apply Set Matte effect to the second selected layer
				setMatteEffect = selectedLayers[il].property("ADBE Effect Parade").addProperty("ADBE Set Matte3");
				//Set the souce of the matte to the first layer
				setMatteEffect.property(1).setValue(selectedLayers[i].index);
				//Invert the matte
				setMatteEffect.property(3).setValue(true);
			}
		}


	app.endUndoGroup();


})(); //End matteLock()