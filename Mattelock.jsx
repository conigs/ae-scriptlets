/********
Mattelock v1.1
by Paul Conigliaro

Applies the "Set Matte" effect to the first layer selected
with the "Take Matte From Layer" property set to the
second layer selected.

Apply to KBar button or run from the Script menu.

Usage:

1. Select the layer to apply the matte to

2. Select the layer to use as the source of the matte.

Optional: Hold ALT/Option to invert the matte.
-OR-
Optional: Hold Shift to apply inverted matte to both
layers using eachother as the source.

3. Run script

********/

(function matteLock(){

	var params = {
		"scriptName" : "Mattelock",
		"undoName" : "Apply Set Matte",
		"error" :  "Select 2 Layers\nPlease first select the layer to apply Set Matte to, then select the matte source layer."
	};

	//Get active comp
	var comp = app.project.activeItem;

	//Return error if no comp is selected
	if(comp === null || !(comp instanceof CompItem)) { return alert(params.error); }
	
	//Get selected layers
	var selectedLayers = comp.selectedLayers;

	//Return error if more or fewer than two layers are selected
	if(selectedLayers.length != 2) { return alert(params.error); }


	app.beginUndoGroup(params.undoName);

		//Apply Set Matte effect to the first selected layer
		var setMatteEffect = selectedLayers[0].property("ADBE Effect Parade").addProperty("ADBE Set Matte3");
		//Set the source of the matte to the second selected layer
		setMatteEffect.property(1).setValue(selectedLayers[1].index);
		//Invert the matte if ALT/Option is held
		setMatteEffect.property(3).setValue(ScriptUI.environment.keyboardState.altKey);

		//Apply matte to second layer if Shift is held
		if(ScriptUI.environment.keyboardState.shiftKey) {
			//Set first layer matte to Invert
			setMatteEffect.property(3).setValue(true);
			//Apply Set Matte effect to the second selected layer
			setMatteEffect = selectedLayers[1].property("ADBE Effect Parade").addProperty("ADBE Set Matte3");
			//Set the souce of the matte to the first layer
			setMatteEffect.property(1).setValue(selectedLayers[0].index);
			//Invert the matte
			setMatteEffect.property(3).setValue(true);
		}

	app.endUndoGroup();


})(); //End matteLock()