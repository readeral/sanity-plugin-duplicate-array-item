import React from 'react';
import DropDownButton from 'part:@sanity/components/buttons/dropdown';
import DefaultArrayFunctions from 'part:@sanity/form-builder/input/array/functions-default';
import updateKeys from './updateKeys';

export default function DuplicateArrayFunctions(props) {
  const {type, value, onAppendItem} = props;

  const handleDuplicateBtnClick = ({item}) => {
    const newItem = item.hasOwnProperty('_key')
      ? updateKeys(Object.assign({}, item), '_key')
      : item;
    onAppendItem(newItem);
  };

  const items = field => {
    // If there is no canDuplicate value, or there are no array items, return empty array
    if (field === undefined || value === undefined) {
      return [];
    }

    // If canDuplicate is set to boolean 'true' and item is a string, return string
    if (typeof field !== 'string' && field === true) {
      if (typeof item === 'string' || typeof item === 'number') {
        return value.map(item => ({title: item, item}));
      }
    }

    return value
      // Filter out references
      .filter(item => !item._type)
      // Map remaining items
      .map(item => {
        // If canDuplicate passes a value which doesn't correspond to a field, try alternatives:
        if (item[field] === undefined) {
          // Test to see if item can be rendered as is
          if (typeof item === 'string' || typeof item === 'number') {
            return {
              title: item,
              item
            };
          }

          // Test for common fields instead
          if (item.name || item.title || item.text) {
            return {
              title: item.name || item.title || item.text,
              item
            };
          }

          // Otherwise return nothing
          console.log(
            'The array duplication button cannot find your field to render children. Please check your schema.'
          );
          return [];
        }

        return {
          title: item[field],
          item
        };
      });
  };

  const itemArray = items(type?.options?.canDuplicate);

  return (
    <DefaultArrayFunctions {...props}>
      {itemArray.length > 0 && (
        <DropDownButton
          inverted
          items={itemArray}
          onAction={handleDuplicateBtnClick}
        >
          Duplicate
        </DropDownButton>
      )}
    </DefaultArrayFunctions>
  );
}
