import React, { useContext } from 'react'
import { WeatherContext } from '../Weather'

import './YdMap.css'

import { YMaps, Map, Placemark, SearchControl } from "react-yandex-maps";

export const YdMap = () => {

    const context = useContext(WeatherContext);
    const { store } = context
    const { place, currentLocation, weather } = store

    const mapData = {
        center: Object.values(place ? weather.coord : currentLocation),
        zoom: 12,
    };

    const coordinates = [
        Object.values(currentLocation)
    ];

    return (
        <div className="map">
            < YMaps
                query={{
                    apikey: "a99c298f-0047-4a60-9514-ef8ee0dcc864",
                    lang: "en_RU",
                    coordorder: "longlat"
                }}
            >
                <Map
                    state={mapData}
                    width="100%"
                    height="430px"
                >
                    {coordinates.map((coordinate, key) => {
                        return <Placemark geometry={coordinate} key={key} />;
                    })}
                    <SearchControl
                        options={
                            { float: 'right' }
                        }
                    />
                </Map>
            </YMaps >
        </div >
    )
};