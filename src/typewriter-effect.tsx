import { useEffect, useState } from 'react'

enum Phase {
    Typing,
    Pausing,
    Deleting,
}

const typingInterval = 80
const typingPause = 1200
const deletingInterval = 50

export const useTypewriterEffect = (myService: string[]): {
    typedString: string,
    selectedString: string,
} => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [typedString, settypedString] = useState('')
    const [phase, setPhase] = useState(Phase.Typing)

    useEffect(() => {
        switch (phase) {
            case Phase.Typing:
                {
                    const nexttypedString = myService[selectedIndex].slice(
                        0,
                        typedString.length + 1
                    )

                    if (nexttypedString === typedString) {
                        setPhase(Phase.Pausing)
                        return
                    }

                    const timeout = setTimeout(() => {
                        settypedString(nexttypedString)
                    }, typingInterval)

                    return () => clearTimeout(timeout)
                }
            case Phase.Deleting:
                {
                    if (!typedString) {
                        const nextIndex = selectedIndex + 1
                        setSelectedIndex(myService[nextIndex] ? nextIndex : 0)
                        setPhase(Phase.Typing)
                        return
                    }

                    const nextRemaining = myService[selectedIndex].slice(
                        0,
                        typedString.length - 1
                    )

                    const timeout = setTimeout(() => {
                        settypedString(nextRemaining)
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

    }, [myService, typedString, phase, selectedIndex])

    return { typedString, selectedString: myService[selectedIndex] }

}
