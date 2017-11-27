
import ScrollAmount from '../../index';

const target1 = new ScrollAmount('.js-scroll-amount', {
    onTop() {
        console.log("top");
    },
    onBottom() {
        console.log("bottom");
    }
});

const btn = document.querySelectorAll('.js-stop')[0];
btn.addEventListener('click', () => {
    target1.stop();
});


