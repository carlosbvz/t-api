import React from 'react'

/**
 * Animation Documentation
 *
 * This section describes the available animations for the robot face.
 *
 * ## Supported Animations
 * - **ROBOT-ANIMATION_SAD**: This animation triggers a sad expression on the robot face.
 * - **ROBOT-ANIMATION_SMILE**: This animation triggers a smiling expression on the robot face.
 *
 * ## Future Developments
 * More gestures are currently under development and will be added in future updates.
 *
 * ## View the Robot Face
 * You can see the robot face in action at the following URL: [View Robot Face](/t-face)
 */
type Props = {}

export default function Animation({}: Props) {
    return (
        <div>
            <h2>Animation</h2>
            <h3>Supported Animations</h3>
            <ul>
                <li>
                    <strong>ROBOT-ANIMATION_SAD</strong>: Triggers a sad
                    expression.
                </li>
                <li>
                    <strong>ROBOT-ANIMATION_SMILE</strong>: Triggers a smiling
                    expression.
                </li>
            </ul>
            <h3>Future Developments</h3>
            <p>
                More gestures are currently under development and will be added
                in future updates.
            </p>
            <h3>View the Robot Face</h3>
            <p>
                You can see the robot face in action at the following URL:
                <a href="/t-face">View Robot Face</a>
            </p>
        </div>
    )
}
