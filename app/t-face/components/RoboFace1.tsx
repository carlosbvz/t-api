import type { Schema } from '@/amplify/data/resource'
import { useEffect, useState } from 'react'
import './RoboFace1.css'
import './RoboFaceSad.css'

type Props = {
    command: Schema['Command']['type'] | null
    onCommandComplete: (command: Schema['Command']['type']) => void
}

export default function RoboFace1({
    command,
    onCommandComplete,
}: Readonly<Props>) {
    const [robotAnimation, setRobotAnimation] = useState('')

    useEffect(() => {
        if (command) {
            console.log(command)
            onCommandComplete(command)
        }
    }, [command])

    const handleClick = () => {
        if (robotAnimation === '') {
            setRobotAnimation('robot-animation-sad')
        } else {
            setRobotAnimation('')
        }
    }

    return (
        <div className={`robot-screen ${robotAnimation}`} onClick={handleClick}>
            <div className="robot-eyebrows">
                <div className="eyebrow"></div>
                <div className="eyebrow"></div>
            </div>
            <div className="robot-eyes">
                <div className="eye eye-left">
                    <div className="eye-highlight"></div>
                </div>
                <div className="eye eye-right">
                    <div className="eye-highlight"></div>
                </div>
            </div>
            <div className="robot-mouth"></div>
        </div>
    )
}
