//
// Config

const traits = [
  ["/content/bg-0.png", "/content/bg-1.png"],
  ["/content/bottom-0.png", "/content/bottom-1.png", "/content/bottom-2.png"],
  ["/content/top-0.png", "/content/top-2.png", "/content/top-2.png"],
];

const renderSize = { width: 260, height: 260 };

//
// Execution logic

async function downloadTrait(url) {
  return new Promise((resolve) => {
    const image = document.createElement("img");
    image.src = url;
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
  });
}

async function renderTraitsOnImage(image, urls) {
  const canvas = document.createElement("canvas");
  canvas.width = renderSize.width;
  canvas.height = renderSize.height;

  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const images = await Promise.all(urls.map(downloadTrait));
  images.forEach((_) => ctx.drawImage(_, 0, 0, canvas.width, canvas.height));
  image.src = canvas.toDataURL("image/png");
}

async function run() {
  document.body.style.margin = "0px";
  document.body.style.padding = "0px";

  const image = document.createElement("img");

  image.id = "img";
  image.style.objectFit = "contain";
  image.style.imageRendering = "auto";

  const traitUrls = document
    .querySelector("script[t]")
    .getAttribute("t")
    .split(",")
    .map((trait, i) => traits[i][parseInt(trait.trim(), 10) - 1]);

  await renderTraitsOnImage(image, traitUrls);

  document.body.appendChild(image);
}

window.onload = run;