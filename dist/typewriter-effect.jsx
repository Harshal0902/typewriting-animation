"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTypewriterEffect = void 0;
const react_1 = require("react");
require("./style.scss");
var Phase;
(function (Phase) {
    Phase[Phase["Typing"] = 0] = "Typing";
    Phase[Phase["Pausing"] = 1] = "Pausing";
    Phase[Phase["Deleting"] = 2] = "Deleting";
})(Phase || (Phase = {}));
const typingInterval = 80;
const typingPause = 1200;
const deletingInterval = 50;
const useTypewriterEffect = (myString) => {
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(0);
    const [typedString, setTypedString] = (0, react_1.useState)('');
    const [phase, setPhase] = (0, react_1.useState)(Phase.Typing);
    (0, react_1.useEffect)(() => {
        switch (phase) {
            case Phase.Typing:
                {
                    const nextTypedString = myString[selectedIndex].slice(0, typedString.length + 1);
                    if (nextTypedString === typedString) {
                        setPhase(Phase.Pausing);
                        return;
                    }
                    const timeout = setTimeout(() => {
                        setTypedString(nextTypedString);
                    }, typingInterval);
                    return () => clearTimeout(timeout);
                }
            case Phase.Deleting:
                {
                    if (!typedString) {
                        const nextIndex = selectedIndex + 1;
                        setSelectedIndex(myString[nextIndex] ? nextIndex : 0);
                        setPhase(Phase.Typing);
                        return;
                    }
                    const nextRemaining = myString[selectedIndex].slice(0, typedString.length - 1);
                    const timeout = setTimeout(() => {
                        setTypedString(nextRemaining);
                    }, deletingInterval);
                    return () => clearTimeout(timeout);
                }
            case Phase.Pausing:
            default:
                const timeout = setTimeout(() => {
                    setPhase(Phase.Deleting);
                }, typingPause);
                return () => clearTimeout(timeout);
        }
    }, [myString, typedString, phase, selectedIndex]);
    return { typedString, selectedString: myString[selectedIndex] };
};
exports.useTypewriterEffect = useTypewriterEffect;
