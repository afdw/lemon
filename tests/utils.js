var lemonUtils = require("lemon_utils");

console.log(lemonUtils.fillZeros(123, 10));
console.log(lemonUtils.objectDefaults({
	"test1": 123
}, {
	"test1": 432,
	"test2": 754
}));
console.log(lemonUtils.format("2 * 2 = %1; 2 * 3 = %2", 2 * 2, 2 * 3));