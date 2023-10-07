import { useEffect, useState } from 'react';
import "./style.scss"

const Phase = {
    Typing: 'Typing',
    Pausing: 'Pausing',
    Deleting: 'Deleting',
};

interface TypewriterOptions {
    speed?: number;
    delay?: number;
    loop?: boolean;
    cursor?: string;
}

const defaultOptions: TypewriterOptions = {
    speed: 50,
    delay: 1000,
    loop: true,
    cursor: '|',
};

export const useTypewriterEffect = (
    inputStrings: string[],
    options?: TypewriterOptions
): {
    typedString: string;
    selectedString: string;
} => {
    const mergedOptions: TypewriterOptions = { ...defaultOptions, ...options };
    const [typedString, setTypedString] = useState('');
    const [phase, setPhase] = useState(Phase.Typing);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const currentSentence = inputStrings[currentIndex];

        switch (phase) {
            case Phase.Typing: {
                if (typedString.length < currentSentence.length) {
                    const nextTypedCharacter = currentSentence.slice(
                        0,
                        typedString.length + 1
                    );
                    timeout = setTimeout(() => {
                        setTypedString(nextTypedCharacter);
                    }, mergedOptions.speed);
                } else {
                    setPhase(Phase.Pausing);
                    timeout = setTimeout(() => {
                        setPhase(Phase.Deleting);
                    }, mergedOptions.delay);
                }
                break;
            }
            case Phase.Deleting: {
                if (typedString.length > 0) {
                    const nextRemaining = typedString.slice(0, typedString.length - 1);
                    timeout = setTimeout(() => {
                        setTypedString(nextRemaining);
                    }, mergedOptions.speed);
                } else {
                    setCurrentIndex((currentIndex + 1) % inputStrings.length);

                    if (!mergedOptions.loop && currentIndex === inputStrings.length - 1) {
                        return; // Animation ended
                    }

                    setPhase(Phase.Typing);
                }
                break;
            }
            case Phase.Pausing:
            default: {
                timeout = setTimeout(() => {
                    setPhase(Phase.Deleting);
                }, mergedOptions.delay);
                break;
            }
        }

        return () => clearTimeout(timeout);
    }, [typedString, phase, currentIndex, inputStrings, mergedOptions]);

    const cursor = mergedOptions.cursor || '|';

    return {
        typedString: typedString + cursor,
        selectedString: inputStrings[currentIndex],
    };
};
