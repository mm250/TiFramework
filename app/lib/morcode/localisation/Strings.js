var localisationFile;

var defaultValue = 'UNKNOWN TRANSLATION';

var currentLocale = Ti.Locale.getCurrentLocale().toLowerCase();
//e.g. en-GB

/**
 * Function to translate 'id' into language specific string by using Ti.Locale.getCurrentLocale()
 * depending on getCurrentLocale() look up correct 'strings.xml'
 *
 * @param {Object} id e.g. 	"MAIN_MENU_HOLIDAY_SUMMERY" will give 'Holiday summary' if en-gb specified
 * or 'Ferien Zusammenfassung' if 'de-de' is set in phone
 */

module.exports = {

    L : function(id, params) {

        try {
            
            if (!localisationFile) {
                
                var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'i18n', currentLocale, 'strings.xml');

                // try and load in localisation strings file.
                var readContents = loadFile(readFile, function() {
                    
                    currentLocale = Alloy.CFG.localeDefault;
                    readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'i18n', currentLocale, 'strings.xml');

                    // load default localisation strings file.
                    readContents = loadFile(readFile, function() {                        
                        throw "Cannot find default locale Strings file:" + Alloy.CFG.localeDefault;
                    })
                })
                 
                if (readContents) {
                    localisationFile = readContents.toString();                    
                } else {
                    throw "Error reading file from filesystem, id:" + id + " in locale: " + currentLocale ;
                }
            }
        
            return (params) ? replaceParams(_lookupStringsXPath(id), params) : _lookupStringsXPath(id);

        } catch (ex) {
            console.error("catch:" + ex);
            return defaultValue;
        }
    }
}

function replaceParams (txt, params){
    return txt.replace((/\\?\{([^{}]+)\}/g), function(match, name){
        if (match.charAt(0) == '\\') return match.slice(1);
        return (params[name] != null) ? params[name] : '';
    });
}

function loadFile(file, onfileDoesNotExist) {

    if (file.exists()) {
        return file.read();
    }
   
    if (onfileDoesNotExist) onfileDoesNotExist();
}

/**
 * Function to search (using XPath) string for 'id'
 *
 * @param {Object} id e.g. 	"MAIN_MENU_HOLIDAY_SUMMERY" will give 'Holiday summary'
 */

function _lookupStringsXPath(id) {
    try{
        var xmldata = Titanium.XML.parseString(localisationFile);
        var xpath = "//string[@name='" + id + "']/text()";
        var result = xmldata.evaluate(xpath);
        return (result.length > 0) ? result.item(0).text : defaultValue;
    } catch (ex) {
        throw ex + "cannot find string in strings id: " + id + " in file:" + currentLocale; 
    }
};

