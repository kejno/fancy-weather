import React, { useState, useContext } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { WeatherContext } from '../Weather'

import MicIcon from '@material-ui/icons/Mic';
import IconButton from '@material-ui/core/IconButton';

import './SpeechRecognition.css'

export const SpeechRecognition = () => {

    const { onAddressChange } = useContext(WeatherContext);

    const [value, setValue] = useState("");
    const { listen, stop } = useSpeechRecognition({
        onResult: result => {
            setValue(result);
        },
        onEnd: () => onAddressChange(value),
    });

    return (
        <div>
            <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onMouseDown={listen}
                onMouseUp={stop}
            >
                <MicIcon />
            </IconButton>
        </div>

    );
} 