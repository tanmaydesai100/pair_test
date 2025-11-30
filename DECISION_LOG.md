# Decision Log

## 1. Where do you coerce mins to a number and why there?
the mins field is converted to a number in the useSessions hook where it fetches data. This is the perfect spot for such a transformation because, this way, the string-to-number conversion need not be done repeatedly in every render. Moreover, consistent data types are maintained throughout the app, and the value of mins will always be of number type. Keeping transformations near the layer that fetches data maintains cleanliness of the code, efficiency, and scalability, making it easier to review and maintain.

## 2. How did you implement the debounce and why did you choose that approach?
I implemented a custom hook called useDebounce, which will delay updating any given value until the user has stopped typing within a given time. How it works: It takes in a value and the delay time, and uses both useState and useEffect to update the debounced value after the specified delay. It also clears any pending timeouts if the component unmounts or the value changes, for proper cleanup and to avoid unnecessary updates.

I chose this approach because

The hook is flexible in that it can be reused for any value.
It is easy to implement and does not depend on additional libraries.
It cleans up timeouts properly to avoid memory issues.
That's efficient because it only updates the value after the user stops typing, rather than on every keystroke.

## 3. If two sessions share the same popularity, what guarantees their relative order?
When two sessions have the same popularity, the stableSort function makes sure their order stays the same as in the original data. It does this by comparing their saved originalIndex values, so if the popularity is equal, it just falls back to those indexes to keep them in the correct order. This way, nothing gets shuffled accidentally.

## 4. What's your approach to accessibility for the toggle?
The toggle is implemented with several accessibility features:
1. Uses a semantic `button` element with appropriate ARIA attributes:
   - `aria-pressed` to indicate the toggle state
   - Clear, descriptive text that changes based on state
   - Keyboard focus and activation support
2. The parent `article` has `aria-checked` to indicate completion status
3. The entire card is focusable and interactive
4. Sufficient color contrast is maintained for text and interactive elements
5. The toggle state is also visually indicated with styling changes
6. The component is fully keyboard navigable
