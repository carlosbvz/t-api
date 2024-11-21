import type { Schema } from '@/amplify/data/resource'
import { useEffect } from 'react'
import './RoboFace1.css'

type Props = {
    command: Schema['Command']['type'] | null
    onCommandComplete: (command: Schema['Command']['type']) => void
}

export default function RoboFace1({
    command,
    onCommandComplete,
}: Readonly<Props>) {
    useEffect(() => {
        if (command) {
            console.log(command)
            onCommandComplete(command)
        }
    }, [command])

    return (
        <div className="robot-screen">
            <div className="robot-eyebrows">
                <div className="eyebrow"></div>
                <div className="eyebrow"></div>
            </div>
            <div className="robot-eyes">
                <div className="eye">
                    <div className="eye-highlight"></div>
                </div>
                <div className="eye">
                    <div className="eye-highlight"></div>
                </div>
            </div>
            <div className="robot-mouth"></div>
        </div>
    )
}
