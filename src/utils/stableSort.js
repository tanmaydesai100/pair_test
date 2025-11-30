// stableSort(list, compareFn) -> returns new sorted array
export default function stableSort(arr, compare) {
  return arr
    .map((v, i) => ({ v, i }))
    .sort((a, b) => {
      const c = compare(a.v, b.v)
      return c !== 0 ? c : a.i - b.i
    })
    .map(x => x.v)
}
