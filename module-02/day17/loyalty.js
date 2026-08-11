'use strict';

const defaultEarnRule = etb => Math.floor(etb / 10);

function createLoyalty(earnRule = defaultEarnRule) {
    let points = 0;
    return {
        earn(etb) {
            points += earnRule(etb);
        },

        redeem(p) {
            points = Math.max(0, points - p);
        },

        balance() {
            return points;
        }
    };
}

const card = createLoyalty();

card.earn(250);
card.redeem(10);

console.log(card.balance());