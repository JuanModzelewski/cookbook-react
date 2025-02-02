import { useEffect, useRef, useState } from 'react';

/**
 * A custom hook that manages the expanded state of a component. 
 * It sets the state to false when a click is detected outside the component.
 * - expanded: A boolean state indicating whether the component is expanded.
 * - setExpanded: A function to manually set the expanded state.
 * - ref: A ref object to be attached to the component that should detect outside clicks.
 */

const useClickOutsideToggle = () => {
    const [expanded, setExpanded] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handelClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setExpanded(false);
            }
        }
        document.addEventListener("mouseup", handelClickOutside);

        return () => {
            document.removeEventListener("mouseup", handelClickOutside);
        }
    }, [ref]);
    return {expanded, setExpanded, ref};
}

export default useClickOutsideToggle