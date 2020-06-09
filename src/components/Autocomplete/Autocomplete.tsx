import React, { FC, useEffect, useMemo, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { Autocomplete as AutocompleteComponent } from '@material-ui/lab'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'

import { useStyles } from './styles'

const autocompleteService = { current: null }

interface PlaceType {
    description: string
    id: string
    place_id: string
    structured_formatting: {
        main_text: string
        secondary_text: string
        main_text_matched_substrings: [
            {
                offset: number
                length: number
            },
        ]
    }
}

interface IProps {
    onChange: (address: any) => void
}

export const Autocomplete: FC<IProps> = ({ onChange }: IProps) => {

    const classes = useStyles()
    const [value, setValue] = useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<PlaceType[]>([]);

    const fetch = useMemo(
        () =>
            throttle((request: { input: string }, callback: (results?: PlaceType[]) => void) => {
                (autocompleteService.current as any).getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && (window as any).google) {
            autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return
        }

        fetch({ input: inputValue }, (results?: PlaceType[]) => {
            if (active) {
                let newOptions = [] as PlaceType[];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);





    return (

        <AutocompleteComponent

            id="google-search-input"
            style={{ width: "100%", color: "#ffffff", border: "1px solid white" }}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(event: any, newValue: PlaceType | null) => {
                setOptions(newValue ? [newValue, ...options] : options)
                setValue(newValue)
                if (newValue) {
                    console.log(newValue)
                    onChange(newValue.description)

                }
            }}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            renderInput={(params) => (
                <TextField {...params}
                    style={{ color: "#ffffff" }}
                    size="small"
                    label="Add a location"
                    variant="outlined"
                    fullWidth />
            )}
            renderOption={(option) => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match: any) => [match.offset, match.offset + match.length]),
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))}
                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            }}
        />
    )
}
