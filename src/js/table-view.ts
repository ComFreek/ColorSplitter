import { Colors } from './colors';

export module TableView {
	function colorToHex(color: number[]) {
		return color.map((component) => ("0" + component.toString(16)).slice(-2).toLocaleUpperCase()).join("");
	}

	function colorToRgba(color) {
		var str = color.toString();
		return [
			+str.substr(-3),
			+str.substr(-6, 3),
			+str.substr(-9, 3),
			+str.substr(0, 3)
		];
	}

	function rgbaToCss(color) {
		return "rgba(" + color.join(",") + ")";
	}

	function buildRow(color) {
		var rawRgbaColor = colorToRgba(color),
			hexCode = colorToHex(rawRgbaColor),
			colorName = "";

		// Only show a color name if opacity == 1
		// because the alpha channel isn't used for searching in the lookup table
		if (rawRgbaColor[3] == 1) {
			colorName = Colors.getColorName(hexCode.substring(0, hexCode.length - 2));
		}
		return "<tr>" +
			"<td class='colorSample' style='background-color: " + rgbaToCss(rawRgbaColor) + "'></td>" +
			"<td>" +
			rawRgbaColor.join(",") +
			"</td>" +
			"<td>" +
			hexCode +
			"</td>" +
			"<td>" +
			colorName +
			"</td>" +
			"</tr>";
	}

	export function paginateTable(rows: number, rowsPerPage: number) {
		return Math.floor(rows / rowsPerPage);
	}

	export function showTable(table: HTMLTableElement, colors: Set<number>, from: number, to: number): void {
		var i = 0;

		var ARR_SIZE = 1000;
		var arr = new Array(ARR_SIZE);
		var j = 0;


		var iter = colors[Symbol.iterator]();
		var color;

		var tbody = <HTMLElement>table.querySelector("tbody");

		// TypeScript doesn't support iterators and for..of yet!
		while (!(color = iter.next()).done) {
			i++;
			if (i < from) {
				continue;
			}
			else if (i > to) {
				break;
			}

			arr[j++] = buildRow(color.value);
			if (j % ARR_SIZE == 0) {
				tbody.insertAdjacentHTML("beforeend", arr.join(""));
				j = 0;
			}
		}
		tbody.insertAdjacentHTML("beforeend", arr.join(""));
	}
}