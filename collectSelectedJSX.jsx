/**
 * Collects a jsx file to a directory next to the project file.
 * Intended to be used to collect expression libraries for a project.
 */
(function(){

    var strings = {
        scriptName: "Collect selected JSX",
        scriptAuthor: "Paul Conigliaro",
        scriptVersion: "0.1",
        undo: "Collect JSX",
        success: ["File collected.","JSX file collected to %FILEPATH%"].join("\n"),
        errors: {
            noFileSelected: ["No JSX file selected.","Please select a JSX file."].join("\n"),
            fileError: ["Could not copy file.","An error occurred creating the folder an/or copying the file"].join("\n")
        }
    }
    
    var jsxDirectoryName = "jsx";

    var selectedItem = app.project.activeItem;

    if(!selectedItem === undefined || !(selectedItem instanceof FootageItem)) {
        alert(strings.errors.noFileSelected);
        return null;
    }

    var fileSource = selectedItem.file;

    if(!fileSource.name.toLowerCase().match(".jsx")) {
        alert(strings.errors.noFileSelected);
        return null;
    }

    var projectSource = app.project.file;
    var projectFileFolder = projectSource.parent;

    var jsxFolderPath = projectFileFolder.fsName+"/"+jsxDirectoryName+"/";
    var jsxFolder = Folder(jsxFolderPath);
    var jsxFolderExists = jsxFolder.exists || jsxFolder.create();

    var newFilePath = jsxFolderPath+fileSource.name;
    var fileCopySuccess = false;

    if(jsxFolderExists) {

        fileCopySuccess = fileSource.copy(newFilePath);

        if(fileCopySuccess) {

            var newFile = File(newFilePath);
            app.beginUndoGroup(strings.undo);
                selectedItem.replace(newFile);
            app.endUndoGroup();

            alert(replace(strings.success,{"FILEPATH":newFile.fullName}));

        } else {
            alert(strings.errors.fileError);
            return null;
        }
    } else {
        alert(strings.errors.fileError);
        return null;
    }

    /**
     * Replaces arguments from object in a given string
     * @param{string}  str - String containing arguments surrounded by %.
     * @param{object}  obj - Object containing argument definitions.
     * @return{string}     - String with arguments replaced with definitions.
    */
    function replace(str,obj) {
        return str.replace(/%(.+?)%/gi, function(match,grp){return obj[grp]});
    }
})();