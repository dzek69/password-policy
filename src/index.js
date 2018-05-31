/**
 * Creates new validator with some rules overriden. Use `tweaked.js` export to more friendly configuration (object with
 * defaults, instead of long list of required arguments)
 * @param {number} fullPoints - points required to score for value to be marked as "100% secure"
 * @param {number} requiredPercentage - percentage value required for password to be considered safe
 * @param {number} pointsPerChar - how many points are added per character
 * @param {number} pointsPerUnique - how many additional points are added per unique character
 * @param {number} repeatedCharPenalty - how many points are taken for repeated characters
 * @param {number} repeatedCharCount - how many times a character should be repeated before being considered
 * "repeated"
 * @param {number} repeatedCharMaxPosition - position in string after characters are no longer considered
 * repeated (this is used to avoid longer passwords to be considered less and less secure, because user run out of
 * unique characters on keyboard)
 * @param {number} minUniqueChars - minimal count of unique characters required to not lowering the points to
 * `maxNonUniqueScore` value
 * @param {number} maxNonUniqueScore - if minimal count of unique characters is not met - this is the point to
 * the score will be lowered (only if already higher)
 * @returns {Validator}
 */
const createValidator = (
    fullPoints, requiredPercentage, pointsPerChar, pointsPerUnique, repeatedCharPenalty, repeatedCharCount,
    repeatedCharMaxPosition, minUniqueChars, maxNonUniqueScore,
) => {
    const calculate = (value) => {
        const chars = value.split("");
        const map = {};
        let points = 0;

        chars.forEach((char, index) => {
            if (!map[char]) { map[char] = 0; }
            map[char]++;

            points += pointsPerChar; // every new char

            if (map[char] === 1) { // unique char
                points += pointsPerUnique;
            }
            if (map[char] > repeatedCharCount) { // non unique char
                if (index <= repeatedCharMaxPosition) { // for char on position <= 12
                    points -= repeatedCharPenalty;
                }
            }
        });

        if (Object.keys(map).length <= minUniqueChars) {
            if (points > maxNonUniqueScore) {
                points = maxNonUniqueScore;
            }
        }

        return points;
    };

    const format = (points) => {
        const percentage = Math.min(points * (100 / fullPoints), 100);
        const valid = percentage >= requiredPercentage;
        return {
            points,
            percentage,
            valid,
        };
    };

    return value => format(calculate(value));
};

/**
 * @typedef {Object} Result
 * @property {number} points - scored points
 * @property {number} percentage - percentage value of password security (0 - 100)
 * @property {boolean} valid - is password score considered secure enough
 */

/**
 * @typedef {function} Validator
 * @param {string} value - password to measure its security level
 * @returns {Result}
 */

/**
 * @type {Validator}
 */
const validate = createValidator(18, 75, 1, 0.5, 1.5, 3, 7, 5, 5);
validate.createValidator = createValidator;

module.exports = validate;