const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr.`;
let index = 0;

setInterval(() => {
    document.body.innerText = text.slice(0, index++);

    if (index > text.length) {
        index = 0;
    }
}, 100 * getFluctuation());

function getFluctuation() {
    return .8 + (Math.random() * (1.2 - .8));
}
