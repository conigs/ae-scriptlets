(function(){
	var params = {
        'scriptName': "Move Layers to Index",
        'undoName' : "Move Layers",
        'prompts' : {
        	'indexTitle' : "Enter Index:",
        	'indexDefault' : "1"
        },
        'errors' : {
        	'noComp' : "No Comp Active\nPlease make sure a comp is active.",
        	'noLayers' : "No Layers Selected\nYou need at least one layer selected.",
        	'NAN' : "Index Not a Number\nEntered layer index is not a valid number."
        }
    };
    
	var comp = app.project.activeItem;
	// make sure a comp is selected
	if (!(comp instanceof CompItem)) { alert(params.errors.noComp); return null;}
    
    var selectedLayers = comp.selectedLayers;
	// make sure at least one layer is selected
	if (selectedLayers.length == 0 ) { alert(params.errors.noLayers);return null; }

    var userEnteredIndex = parseInt(prompt(params.prompts.indexTitle, params.prompts.indexDefault),10);
    // make sure user entered an integer and set targetIndex
    if (userEnteredIndex % 1 !== 0 || userEnteredIndex < 1) { alert(params.errors.NAN); return null;}
    else { var targetIndex = userEnteredIndex; }


    app.beginUndoGroup(params.undoName);
        //Set targetLayer
        var targetLayer = (targetIndex > comp.numLayers ? comp.layer(comp.numLayers) : comp.layer(targetIndex));
        
        //Set first selectedLayer before or after targetLayer depending on index
        if(targetIndex == 1 || targetLayer.index < selectedLayers[0].index) {
            selectedLayers[0].moveBefore(targetLayer);
        } else {
            selectedLayers[0].moveAfter(targetLayer);
        }
        
        //If more than one layer selected, move the rest after the first layer
        if(selectedLayers.length >= 1) {
            targetLayer = selectedLayers[0];
            for(var i = 1, il = selectedLayers.length; i < il; i++) {
                selectedLayers[i].moveAfter(targetLayer);
                targetLayer = selectedLayers[i];
            }
        }
        
    app.endUndoGroup();
})();