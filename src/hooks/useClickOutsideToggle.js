import { useEffect, useRef, useState } from 'react';


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





  