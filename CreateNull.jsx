//CreateNull.jsx
//Author: Paul Conigliaro
//Creates a null.
//If other layers are selected, creates null in center and parents selected to null.
//Options to name the null or inherit most common label color.

(function (){
	/**** Option Variables ****/
	//Custom name for Null, leave blank for standard AE naming
	var nullName			= "";
	//Inherit most common label color from selected layers
	var inheritColor		= true;
	//Place anchor point in center of null
	var centerAnchorPoint	= false;


	var comp = app.project.activeItem;

	if(comp && comp instanceof CompItem) {
		//Layer variables
		var selectedLayers = comp.selectedLayers;
		var numLayers = selectedLayers.length;

		app.beginUndoGroup("Create Null");

			if(numLayers == 0) {
				//If no layers selected, just create a null
				var newNull = comp.layers.addNull();
				if(nullName) newNull.name = nullName;
				if(centerAnchorPoint) newNull.transform.anchorPoint.setValue([newNull.width/2,newNull.height/2]);
			} else {
				//If layers selected, average layer positions, find most common label, check for 3D layers
				var nullIn = comp.duration;
				var nullOut = 0;
				var is3D = false;
				var firstLayer = selectedLayers[0];
				var firstIndex = selectedLayers[0].index;
				var modeMap = {};
	    		var maxEl = selectedLayers[0];
	    		var maxCount = 0;
				var positionTotalX = 0;
				var positionTotalY = 0;
				var positionTotalZ = 0;
				//Loop through layers
				for(var i = 0; i < numLayers; i++) {
					selectedLayers[i].parent = null;
					positionTotalX += selectedLayers[i].transform.position.value[0];
					positionTotalY += selectedLayers[i].transform.position.value[1];
					positionTotalZ += selectedLayers[i].transform.position.value[2];
					if(checkIf3dLayer(selectedLayers[i]) && is3D == false) { is3D = true; }
					if(selectedLayers[i].index < firstIndex) {
						firstLayer = selectedLayers[i];
						firstIndex = selectedLayers[i].index;
					}
					if(selectedLayers[i].inPoint < nullIn) nullIn = selectedLayers[i].inPoint;
					if(selectedLayers[i].outPoint > nullOut) nullOut = selectedLayers[i].outPoint;
					var el = selectedLayers[i].label;
	        		if(modeMap[el] == null) modeMap[el] = 1;
	        		else modeMap[el]++;  
	        		if(modeMap[el] > maxCount) {
	           			maxEl = el;
	            		maxCount = modeMap[el];
	        		}
				}
				//Average positions
				var nullX = positionTotalX/numLayers;
				var nullY = positionTotalY/numLayers;
				var nullZ = positionTotalZ/numLayers;
				//Create null
				var newNull = comp.layers.addNull(nullOut-nullIn);
				if(nullName) newNull.name = nullName;
				if(centerAnchorPoint) newNull.transform.anchorPoint.setValue([newNull.width/2,newNull.height/2]);
				if(inheritColor && !isNaN(maxEl)) newNull.label = maxEl;
				newNull.moveBefore(firstLayer);
				newNull.threeDLayer = is3D;
				newNull.startTime = nullIn;
				newNull.transform.position.setValue([nullX, nullY, nullZ]);
				for(var i = 0; i < numLayers; i++) {
					selectedLayers[i].parent = newNull;
				}
			}
			

		app.endUndoGroup();
	}

	function checkIf3dLayer(theLayer) {
	    return ( theLayer.threeDLayer || theLayer instanceof CameraLayer || theLayer instanceof LightLayer );
	}

})();
