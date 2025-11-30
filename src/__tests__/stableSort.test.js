import stableSort from '../utils/stableSort';

describe('stableSort', () => {
  it('should sort items in ascending order', () => {
    const items = [
      { id: 1, value: 3 },
      { id: 2, value: 1 },
      { id: 3, value: 2 },
    ];

    const result = stableSort(items, (a, b) => a.value - b.value);
    
    expect(result.map(item => item.value)).toEqual([1, 2, 3]);
  });

  it('should sort items in descending order', () => {
    const items = [
      { id: 1, value: 3 },
      { id: 2, value: 1 },
      { id: 3, value: 2 },
    ];

    const result = stableSort(items, (a, b) => b.value - a.value);
    
    expect(result.map(item => item.value)).toEqual([3, 2, 1]);
  });

  it('should maintain relative order of items with equal sort values', () => {
    const items = [
      { id: 1, value: 1, originalIndex: 0 },
      { id: 2, value: 1, originalIndex: 1 },
      { id: 3, value: 1, originalIndex: 2 },
    ];

    const result = stableSort([...items], (a, b) => a.value - b.value);
    
    // The order should be preserved as in the original array
    expect(result.map(item => item.id)).toEqual([1, 2, 3]);
  });

  it('should handle empty array', () => {
    const result = stableSort([], (a, b) => a - b);
    expect(result).toEqual([]);
  });

  it('should handle single item array', () => {
    const items = [{ id: 1, value: 5 }];
    const result = stableSort(items, (a, b) => a.value - b.value);
    expect(result).toEqual([{ id: 1, value: 5 }]);
  });
});
