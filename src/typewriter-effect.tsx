import { useEffect, useState } from 'react'
import "./style.scss"

enum Phase {
    Typing,
    Pausing,
    Deleting,
}

const typingInterval = 80
const typingPause = 1200
const deletingInterval = 50

export const useTypewriterEffect = (myString: string[]): {
    typedString: string,
    selectedString: string,
} => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [typedString, setTypedString] = useState('')
    const [phase, setPhase] = useState(Phase.Typing)

    useEffect(() => {
        switch (phase) {
            case Phase.Typing:
                {
                    const nextTypedString = myString[selectedIndex].slice(
                        0,
                        typedString.length + 1
                    )

                    if (nextTypedString === typedString) {
                        setPhase(Phase.Pausing)
                        return
                    }

                    const timeout = setTimeout(() => {
                        setTypedString(nextTypedString)
                    }, typingInterval)

                    return () => clearTimeout(timeout)
                }
            case Phase.Deleting:
                {
                    if (!typedString) {
                        const nextIndex = selectedIndex + 1
                        setSelectedIndex(myString[nextIndex] ? nextIndex : 0)
                        setPhase(Phase.Typing)
                        return
                    }

                    const nextRemaining = myString[selectedIndex].slice(
                        0,
                        typedString.length - 1
                    )

                    const timeout = setTimeout(() => {
                        setTypedString(nextRemaining)
                    }, deletingInterval)

                    return () => clearTimeout(timeout)
                }
            case Phase.Pausing:
            default:
                const timeout = setTimeout(() => {
                    setPhase(Phase.Deleting)
                }, typingPause)

                return () => clearTimeout(timeout)
        }

    }, [myString, typedString, phase, selectedIndex])

    return { typedString, selectedString: myString[selectedIndex] }

}
