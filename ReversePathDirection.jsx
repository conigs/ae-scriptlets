// Flips direction of path switches

(function(){
	app.beginUndoGroup("Reverse Path Direction");

	var thisComp = app.project.activeItem;
	var theLayers = thisComp.selectedLayers;
	
	var i = theLayers.length;
	while(i--) {
		var j = theLayers[i].selectedProperties.length;
		while(j--) {
			var theProp = theLayers[i].selectedProperties[j];
			if(theProp.shapeDirection != null) {
				var direction = theProp.shapeDirection.value;
				theProp.shapeDirection.setValue(direction==3?1:3);
			}		
		}	
	}
	
	app.endUndoGroup();
})();
