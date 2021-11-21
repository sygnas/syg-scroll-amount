
import ScrollAmount from '../../dist/index.es.js';

const target1 = new ScrollAmount('.js-scroll-amount', {
    onTop() {
        console.log("top");
    },
    onBottom() {
        console.log("bottom");
    }
});

