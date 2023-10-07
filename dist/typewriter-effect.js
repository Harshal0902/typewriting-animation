"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTypewriterEffect = void 0;
const react_1 = require("react");
require("./style.scss");
const Phase = {
    Typing: 'Typing',
    Pausing: 'Pausing',
    Deleting: 'Deleting',
};
const defaultOptions = {
    speed: 50,
    delay: 1000,
    loop: true,
    cursor: '|',
};
const useTypewriterEffect = (inputStrings, options) => {
    const mergedOptions = Object.assign(Object.assign({}, defaultOptions), options);
    const [typedString, setTypedString] = (0, react_1.useState)('');
    const [phase, setPhase] = (0, react_1.useState)(Phase.Typing);
    const [currentIndex, setCurrentIndex] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        let timeout;
        const currentSentence = inputStrings[currentIndex];
        switch (phase) {
            case Phase.Typing: {
                if (typedString.length < currentSentence.length) {
                    const nextTypedCharacter = currentSentence.slice(0, typedString.length + 1);
                    timeout = setTimeout(() => {
                        setTypedString(nextTypedCharacter);
                    }, mergedOptions.speed);
                }
                else {
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
                }
                else {
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
exports.useTypewriterEffect = useTypewriterEffect;
