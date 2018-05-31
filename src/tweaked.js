const { createValidator } = require("./index");

const defaults = [18, 75, 1, 0.5, 1.5, 3, 7, 5, 5];
const props = [
    "fullPoints", "requiredPercentage", "pointsPerChar", "pointsPerUnique", "repeatedCharPenalty", "repeatedCharCount",
    "repeatedCharMaxPosition", "minUniqueChars", "maxNonUniqueScore",
];

const createOptions = object => {
    const options = {};
    props.forEach(prop => {
        if (prop in object) {
            options[prop] = object[prop];
            return;
        }
        const index = props.indexOf(prop);
        options[prop] = defaults[index];
    });
    return options;
};

const unpackOptions = options => {
    return props.map(prop => options[prop]);
};

/**
 * @typedef {Object} TweakedOptions
 * @property {number} [fullPoints = 18] - points required to score for value to be marked as "100% secure"
 * @property {number} [requiredPercentage = 75] - percentage value required for password to be considered safe
 * @property {number} [pointsPerChar = 1] - how many points are added per character
 * @property {number} [pointsPerUnique = 0.5] - how many additional points are added per unique character
 * @property {number} [repeatedCharPenalty = 1.5] - how many points are taken for repeated characters
 * @property {number} [repeatedCharCount = 3] - how many times a character should be repeated before being considered
 * "repeated"
 * @property {number} [repeatedCharMaxPosition = 7] - position in string after characters are no longer considered
 * repeated (this is used to avoid longer passwords to be considered less and less secure, because user run out of
 * unique characters on keyboard)
 * @property {number} [minUniqueChars = 5] - minimal count of unique characters required to not lowering the points to
 * `maxNonUniqueScore` value
 * @property {number} [maxNonUniqueScore = 5] - if minimal count of unique characters is not met - this is the point to
 * the score will be lowered (only if already higher)
 */

/**
 * Creates tweaked validator.
 *
 * @param {TweakedOptions} options
 * @returns {Validator} - validator function
 */

const createTweakedValidator = options => {
    return createValidator(... unpackOptions(createOptions(options)));
};
module.exports = createTweakedValidator;
