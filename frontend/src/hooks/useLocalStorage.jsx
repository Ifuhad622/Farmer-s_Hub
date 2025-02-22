import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Initialize the stored value from localStorage or fallback to the provided initialValue.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Attempt to get the item from localStorage
      const item = window.localStorage.getItem(key);
      // Parse and return stored JSON or the initial value if none exists
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  // Function to update both state and localStorage
  const setValue = (value) => {
    try {
      // Support functional updates similar to useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to localStorage in JSON format
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
