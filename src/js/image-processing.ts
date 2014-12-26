module ColorSplitter {
    export module ImageProcessing {
        function drawImageInCanvas(image: HTMLImageElement): CanvasRenderingContext2D {
            var canvas: HTMLCanvasElement = document.createElement("canvas");
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);

            return ctx;
        }

        function fileToImage(file: File, callback: (image: HTMLImageElement) => void) {
            var image = new Image(),
                reader = new FileReader();

            reader.addEventListener("load", function fileRead() {
                image.src = reader.result;
            });
            image.addEventListener("load", function imageLoaded() {
                callback(image);
            });
            reader.readAsDataURL(file);
        }

        export function fileToImageData(file: File, callback: (imageData: ImageData) => void) {
            fileToImage(file, (image) => {
                callback(drawImageInCanvas(image).getImageData(0, 0, image.naturalWidth, image.naturalHeight));
            });
        }

        export function collectColors(imageData) {
            var w = imageData.width,
                h = imageData.height,
                data = imageData.data,
                colors = new Set<number>();
            for (var y = 0; y < h; y++) {
                for (var x = 0; x < w; x++) {
                    var offset = (y * w + x) * 4;
                    var color = data[offset];
                    color += data[offset + 1] * 1000;
                    color += data[offset + 2] * 1000000;
                    color += data[offset + 3] * 1000000000;
                    colors.add(color);
                }
            }
            return colors;
        }

    }
} 