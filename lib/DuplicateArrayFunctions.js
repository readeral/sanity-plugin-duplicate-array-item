"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DuplicateArrayFunctions;

var _react = _interopRequireDefault(require("react"));

var _dropdown = _interopRequireDefault(require("part:@sanity/components/buttons/dropdown"));

var _functionsDefault = _interopRequireDefault(require("part:@sanity/form-builder/input/array/functions-default"));

var _updateKeys = _interopRequireDefault(require("./updateKeys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DuplicateArrayFunctions(props) {
  var _type$options;

  var type = props.type,
      value = props.value,
      onAppendItem = props.onAppendItem;

  var handleDuplicateBtnClick = (_ref) => {
    var item = _ref.item;
    var newItem = item.hasOwnProperty('_key') ? (0, _updateKeys.default)(Object.assign({}, item), '_key') : item;
    onAppendItem(newItem);
  };

  var items = field => {
    // If there is no canDuplicate value, or there are no array items, return empty array
    if (field === undefined || value === undefined) {
      return [];
    } // If canDuplicate is set to boolean 'true' and item is a string, return string


    if (typeof field !== 'string' && field === true) {
      return value.map(item => ({
        title: item,
        item
      }));
    }

    return value.filter(item => !item._type).map(item => {
      // If canDuplicate passes a value which doesn't correspond to a field, try alternatives:
      if (item[field] === undefined) {
        // Test to see if item can be rendered as is
        if (typeof item === 'string' || typeof item === 'number') {
          return {
            title: item,
            item
          };
        } // Test for common fields instead


        if (item.name || item.title || item.text) {
          return {
            title: item.name || item.title || item.text,
            item
          };
        } // Otherwise return nothing


        console.log('The array duplication button cannot find your field to render children. Please check your schema.');
        return [];
      }

      return {
        title: item[field],
        item
      };
    });
  };

  var itemArray = items(type === null || type === void 0 ? void 0 : (_type$options = type.options) === null || _type$options === void 0 ? void 0 : _type$options.canDuplicate);
  return _react.default.createElement(_functionsDefault.default, props, itemArray.length > 0 && _react.default.createElement(_dropdown.default, {
    inverted: true,
    items: itemArray,
    onAction: handleDuplicateBtnClick
  }, "Duplicate"));
}