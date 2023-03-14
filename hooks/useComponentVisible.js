import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'

export default function useComponentVisible(initialIsVisible) {
    const router = useRouter()
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        setIsComponentVisible(false)
    }, [router])

    return { ref, isComponentVisible, setIsComponentVisible };
}