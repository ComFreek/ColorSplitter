var colorNameHexMap = require('css-color-names');

var str = "";
str += ["// AUTO-GENERATED. DO NOT EDIT.",
        "// SEE generate-color-mappings.js",
        "module ColorSplitter {",
        "  export module Colors {",
        "    var colorMap = new Map<string, string>();",
        "    export function getColorName(hexCode: string): string {",
        "      var colorName = colorMap.get(hexCode.toLowerCase());",
        "      return (typeof colorName == \"undefined\") ? \"\" : colorName;",
        "    }",
        ""].join("\n");

// inverse mapping and remove '#' prefix of hex codes
for (var colorName in colorNameHexMap) {
	if (!colorNameHexMap.hasOwnProperty(colorName)) {
		continue;
	}
	str += "    colorMap.set(\"" + colorNameHexMap[colorName].substr(1) + "\", \"" + colorName + "\");\n";
}
str += ["  }",
        "}"].join("\n");

var fs = require('fs');
fs.writeFile(process.argv[2] || "colors.ts", str, function(err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log("The color file was generated without errors.");
	}
});