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

export default function Commands() {
    const [commands, setCommands] = useState<Array<Schema['Command']['type']>>(
        []
    )
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const createSub = client.models.Command.onCreate().subscribe({
        next: (data) => {
            console.log(data)
            if (commands.length < DEFAULT_MAX_COMMANDS) {
                setCommands([data, ...commands])
            }
        },
        error: (error) => console.warn(error),
    })

    useEffect(() => {
        return () => {
            createSub.unsubscribe()
        }
    }, [])

    return <RoboFace1 />
}
