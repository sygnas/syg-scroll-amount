
import ScrollAmount from '../../dist/es6/index';

const target1 = new ScrollAmount('.js-scroll-amount', {
    onTop() {
        console.log("top");
    },
    onBottom() {
        console.log("bottom");
    }
});

