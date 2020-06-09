import React, { useContext } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import IconButton from '@material-ui/core/IconButton';
import { WeatherContext } from '../Weather'


export const SpeechSynthesis = (props) => {

    const context = useContext(WeatherContext);
    const { store } = context
    const { lang, weather } = store

    const { speak, voices, speaking, cancel } = useSpeechSynthesis();

    const temp = Math.round(weather?.main.temp);
    const description = weather?.weather[0].description;
    const feels = Math.round(weather?.main.feels_like);
    const wind = Math.round(weather?.wind.speed);
    const humidity = Math.round(weather?.main.humidity);
    const valueTextRu = `Сегодня ${temp}° ${description}. Ощущается ${feels}°, Ветер ${wind} метра в секунду, влажность ${humidity}%`
    const valueTextEn = `Today ${temp}° ${description}. It feels like ${feels}°, Wind ${wind} meter per second, humdity ${humidity}%`
    const voice = lang === "RU" ? voices[18] : (lang === "EN" ? voices[6] : voices[18])
    const text = lang === "BE" ? "Извините, но на белорусском языке я не разговариваю" : (lang === "RU" ? valueTextRu : valueTextEn)

    return (
        <IconButton
            color="primary"
            component="span"
        >{
                speaking
                    ? <StopIcon onClick={cancel} />
                    : <PlayArrowIcon onClick={() => speak({ text, voice })} />
            }
        </IconButton>
    );
}