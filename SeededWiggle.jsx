// Applies a wiggle with a random seed
(function(){
	app.beginUndoGroup("Seeded Wiggle");
		var comp = app.project.activeItem;
		var selectLayers = comp.selectedLayers;
		var selectProps = comp.selectedProperties;
		var maxSeed = 1000000;

		var i = selectProps.length;

		while (i--) {
			var prop = selectProps[i];
			if(prop.canSetExpression === true && !prop.expression) {
				var rand = Math.round(Math.random()*maxSeed);
				prop.expression = ('	seed='+rand+';\
		freq=4;\
		amp=100;\
		seedRandom(seed,true);\
		wiggle(freq,amp)').replace(/\t+/g,'');
			}
		}
	app.endUndoGroup();
})();
