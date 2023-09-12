import {useEffect, useMemo, useReducer} from "react";
import {Button} from "../components/Button";

type OnOffProps = {
    on: boolean
}

type State = {
    on: boolean
}

type Action = { type: 'Controls/ON' } | { type: 'Controls/OFF' }


function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'Controls/ON':
            return {
                on: true
            }
        case  'Controls/OFF':
            return {
                on: false
            }
        default:
            return state
    }

}

export function OnOff({on}: OnOffProps) {

    // const [isOn, setOnOff] = useState<boolean>(on)
    const [state, dispatch] = useReducer(reducer, {
        on: on
    })


    console.log('On', state.on)
    const onStyle = useMemo(() => {
        return {backgroundColor: state.on ? 'green' : ''}
    }, [state.on])
    const offStyle = useMemo(() => {
        return {backgroundColor: !state.on ? 'red' : ''}
    }, [state.on])
    const indicator = useMemo(() => {
        return {
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: state.on ? 'green' : 'red', padding: 10
        }
    }, [state.on])

    useEffect(() => {
        console.log('rerender')
        state.on ? document.designMode = 'on' : document.designMode = 'off'

        return () => {

        }
    }, [state.on])

    return (

        <>

            <div>
                <Button
                    text={'On'}
                    style={onStyle}
                    onClick={() => dispatch({type: 'Controls/ON'})}
                />
                <Button
                    text={'Off'}
                    style={offStyle}
                    onClick={() => dispatch({type: 'Controls/OFF'})}
                />

            </div>

            <div style={indicator}></div>

        </>


    )
}