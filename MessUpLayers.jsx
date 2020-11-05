// Don't run this. It will not make your life better.
// At least I included an undo...
(function(){

	var comp = app.project.activeItem;
	if(comp && comp instanceof CompItem) {
	    
	    var numLayers = comp.numLayers;

	    app.beginUndoGroup("F*ck Things Up");
	    
	        for(var i = 1, il =numLayers; i <= il; i++) {
	            var targetIndex = Math.round(Math.random()*(numLayers-1)+1);
	            if (i == targetIndex && i < numLayers) targetIndex++;
	            comp.layer(i).moveBefore(comp.layer(targetIndex));
	        }
	        
	        clearOutput();
	        writeLn("Happy keyframing sucker.")
	    
	    app.endUndoGroup();

	}
})();