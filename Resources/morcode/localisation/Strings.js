function replaceParams(txt, params) {
    return txt.replace(/\\?\{([^{}]+)\}/g, function(match, name) {
        if ("\\" == match.charAt(0)) return match.slice(1);
        return null != params[name] ? params[name] : "";
    });
}

function loadFile(file, onfileDoesNotExist) {
    if (file.exists()) return file.read();
    onfileDoesNotExist && onfileDoesNotExist();
}

function _lookupStringsXPath(id) {
    try {
        var xmldata = Titanium.XML.parseString(localisationFile);
        var xpath = "//string[@name='" + id + "']/text()";
        var result = xmldata.evaluate(xpath);
        return result.length > 0 ? result.item(0).text : defaultValue;
    } catch (ex) {
        throw ex + "cannot find string in strings id: " + id + " in file:" + currentLocale;
    }
}

var localisationFile;

var defaultValue = "UNKNOWN TRANSLATION";

var currentLocale = Ti.Locale.getCurrentLocale().toLowerCase();

module.exports = {
    L: function(id, params) {
        try {
            if (!localisationFile) {
                var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, "i18n", currentLocale, "strings.xml");
                var readContents = loadFile(readFile, function() {
                    currentLocale = Alloy.CFG.localeDefault;
                    readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, "i18n", currentLocale, "strings.xml");
                    readContents = loadFile(readFile, function() {
                        throw "Cannot find default locale Strings file:" + Alloy.CFG.localeDefault;
                    });
                });
                if (!readContents) throw "Error reading file from filesystem, id:" + id + " in locale: " + currentLocale;
                localisationFile = readContents.toString();
            }
            return params ? replaceParams(_lookupStringsXPath(id), params) : _lookupStringsXPath(id);
        } catch (ex) {
            console.error("catch:" + ex);
            return defaultValue;
        }
    }
};