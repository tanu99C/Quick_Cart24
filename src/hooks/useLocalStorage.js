import {useEffect, useState} from "react";

export function useLocalStorage(key, defaultValue)
{
    const fixedKey = 'quick_cart-' + key;

    const [object, setObject] = useState(() =>
    {
        const savedObject = localStorage.getItem(fixedKey);
        if (savedObject) return JSON.parse(savedObject);

        return typeof (defaultValue) === 'function' ? defaultValue() : defaultValue;
    })

    useEffect(() =>
    {
        localStorage.setItem(fixedKey, JSON.stringify(object));
    }, [object]);

    return [object, setObject];
}