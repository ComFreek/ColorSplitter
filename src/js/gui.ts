///<reference path="image-processing.ts" />
///<reference path="table-view.ts" />

module ColorSplitter {
    module ViewModel {
        export var colors: Set<number>;
    }

    export module Controller {
        var colors: Set<number>;
        var page: number = 1;
        var colorsPerPage: number = 100;

        var colorTable = <HTMLTableElement>document.getElementById("colorTable"),
            curPage = <HTMLSpanElement>document.getElementById("curPage"),
            numberOfPages = <HTMLSpanElement>document.getElementById("numberOfPages");


        function processImageFile() {
            if (this.files.length < 1) {
                return;
            }

            ImageProcessing.fileToImageData(this.files[0], (imageData) => {
                colors = ImageProcessing.collectColors(imageData);

                page = 1;
                numberOfPages.innerText = Math.ceil(colors.size / colorsPerPage).toString();
                showCurrentPage();
            });
        }

        function showCurrentPage() {
            var prevColorRows = colorTable.querySelectorAll("tbody tr");
            for (var i = 0, len = prevColorRows.length; i < len; i++) {
                var prevColorRow = prevColorRows.item(i);
                prevColorRow.parentNode.removeChild(prevColorRow);
            }
            var from = (page - 1) * colorsPerPage;
            var to = from + colorsPerPage;

            TableView.showTable(colorTable, colors, from, to);
            curPage.innerText = page.toString();
        }

        function movePage(step) {
            return function () {
                page += step;
                showCurrentPage();
            };
        }

        function initEventListeners() {
            document.getElementById("imageFile").addEventListener("change", processImageFile);
            document.getElementById("nextPage").addEventListener("click", movePage(1));
            document.getElementById("prevPage").addEventListener("click", movePage(-1));
            document.getElementById("next20Page").addEventListener("click", movePage(20));
        }

        export function init() {
            initEventListeners();
        }
    }
}

ColorSplitter.Controller.init();