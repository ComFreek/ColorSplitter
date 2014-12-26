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
				
				export function fileToDataURL(file: File, callback: (dataURL: string) => void) {
						var reader = new FileReader();
						
						reader.addEventListener("load", function fileRead() {
							callback(reader.result);
						});
						reader.readAsDataURL(file);
				}
				
				export function imageToImageData(image: HTMLImageElement) {
					return drawImageInCanvas(image).getImageData(0, 0, image.naturalWidth, image.naturalHeight);
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