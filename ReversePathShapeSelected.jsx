// Reverse bezier path shape data.
// I honestly can't remember how stable this is.

(function(){
	app.beginUndoGroup("Reverse Path");

	//Init
	var thisComp = app.project.activeItem;
	var theLayers = thisComp.selectedLayers;
	var theProp = null;
	var keys = 0;

	//Loop through selected layers
	var i = theLayers.length;
	while(i--) {
		
		//Loop through selected properties
		var j = theLayers[i].selectedProperties.length;
		while(j--) {

			theProp = theLayers[i].selectedProperties[j];
			//Only run if property is a shape path
			if(theProp.matchName == "ADBE Vector Shape") {

				//Loop through selected keys if animated, otherwise just reverse shape
				selectKeys = theProp.selectedKeys;
				keys = selectKeys.length;

				if(keys > 0) {

					while(keys--) {
						theProp.setValueAtKey(selectKeys[keys],reversePath(theProp.keyValue(selectKeys[keys])));
					}

				} else {

					theProp.setValue(reversePath(theProp.value));

				}	

			}

		}

	}

	app.endUndoGroup();

	/*
	reversePath(pathProperty)
	pathProperty: vector shape value
	Return value: vector shape value

	Description:
	Load passed path into new shape with reversed verticies and in/out tangents.
	In/out tangents are flipped to account for reversed vertices.
	*/
	function reversePath(pathProperty) {
		var theShape = new Shape();
		theShape.vertices = pathProperty.vertices.reverse();
		theShape.inTangents = pathProperty.outTangents.reverse();
		theShape.outTangents = pathProperty.inTangents.reverse();
		theShape.closed = pathProperty.closed;
		if(theShape.closed === true) {
			theShape.vertices = offsetArray(theShape.vertices);
			theShape.inTangents = offsetArray(theShape.inTangents);
			theShape.outTangents = offsetArray(theShape.outTangents);
		}
		return theShape;
	}

	function offsetArray(inArray){
		inArray.unshift(inArray.pop());
		return inArray;
	}

})();