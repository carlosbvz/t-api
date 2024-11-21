'use client'

import { useState, useEffect } from 'react'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '@/amplify/data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import '@aws-amplify/ui-react/styles.css'
import RoboFace1 from './components/RoboFace1'

Amplify.configure(outputs)
const client = generateClient<Schema>({ authMode: 'identityPool' })

const DEFAULT_MAX_COMMANDS = 10
const DEFAULT_COMMAND_TIME_IN_MS = 4000

export default function Commands() {
    const [commands, setCommands] = useState<Array<Schema['Command']['type']>>(
        []
    )
    // const [isLoading, setIsLoading] = useState<boolean>(true)
    const [currentCommand, setCurrentCommand] = useState<
        Schema['Command']['type'] | null
    >(null)

    const createSub = client.models.Command.onCreate().subscribe({
        next: (data) => {
            if (commands.length < DEFAULT_MAX_COMMANDS) {
                console.log(data)
                setCommands([data, ...commands])
                // processNextCommand()
            }
        },
        error: (error) => console.warn(error),
    })

    const requestNextCommand = (
        completedCommand?: Schema['Command']['type']
    ) => {
        if (commands.length === 0) return

        /**
         * We need to:
         * 1. Get the next command from the commands list, making sure is not the same as the completedCommand.
         * 2. We need to remove the completedCommand from the commans list
         * 3. We need to set the currentCommand and new commands list
         */

        const nextCommand = commands.find(
            (command) => command.id !== completedCommand?.id
        )

        setCommands((prevCommands) =>
            prevCommands.filter(
                (command) => command.id !== completedCommand?.id
            )
        )

        nextCommand && setCurrentCommand(nextCommand)
    }

    useEffect(() => {
        return () => {
            createSub.unsubscribe()
        }
    }, [])

    return (
        <RoboFace1
            command={currentCommand}
            onCommandComplete={requestNextCommand}
        />
    )
}
