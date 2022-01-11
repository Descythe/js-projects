const imgs = document.getElementById("images"),
      img = imgs.querySelectorAll("img");

let idx = 0;

setInterval(() => {
    if (++idx > img.length - 1) {
        idx = 0;
    }

    imgs.style.transform = `translateX(${-idx * 500}px)`;
}, 1.5 * 1000);
