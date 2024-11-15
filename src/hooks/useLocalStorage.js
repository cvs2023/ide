import React, { useEffect, useState } from "react";

const PREFIX = "codepen-clone-";
export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;

  //funcito here because getting vlaue from local is pretty slow
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    } else if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
}
