import type { Schema } from '@/amplify/data/resource'
import type { Animation } from '@/types/common'
import './RoboFace1.css'
import './RoboFaceSad.css'

type Props = {
    animation: Animation | null
    onCommandComplete: (command: Schema['Command']['type']) => void
}

export default function RoboFace1({
    animation,
    onCommandComplete,
}: Readonly<Props>) {
    return (
        <div className={`robot-screen ${animation}`}>
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
