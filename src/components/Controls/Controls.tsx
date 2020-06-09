import React, { ChangeEvent, useContext, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import SyncIcon from '@material-ui/icons/Sync'
import { common } from '@material-ui/core/colors'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';

import { WeatherContext, IContext } from '../Weather'
import { Lang, Units } from '../../common/constants'
import { SpeechRecognition } from '../SpeechRecognition/SpeechRecognition'
import { SpeechSynthesis } from '../SpeechSynthesis/SpeechSynthesis'

import './index.scss'

export const Controls = () => {
    const context = useContext<IContext>(WeatherContext)
    const { store, onLangChange, onUnitsChange, onRefresh, onAddressChange } = context
    const { lang, units } = store

    const [input, setInput] = useState('');

    const handleInputValue = (event: any) => {
        setInput(event.target.value)
    }

    const handleSubmitForm = (event: any) => {
        event.preventDefault();
    }

    const handleLangChange = (event: ChangeEvent<{ value: unknown }>) =>
        onLangChange && onLangChange(event.target.value as Lang)

    const handleUnitsChange = (event: React.MouseEvent<HTMLElement>, newUnits: Units) => {
        if (onUnitsChange && newUnits) {
            onUnitsChange(newUnits)
        }
    }

    const StyledButton = withStyles({
        root: {
            background: 'rgba(0,0,0,.5)',
            borderRadius: 3,
            fontFamily: 'Montserrat,tahoma,sans-serif',
            fontSize: '1rem',
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 20px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
            textTransform: 'capitalize',
        },
        selected: {
            color: 'red'
        }
    })(ToggleButton);


    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                flexDirection: 'row',
                color: 'white'

            },
            search: {

            },
            input: {
                color: 'green'
            },
            label: {
                color: 'white'
            }
        }),
    );

    const classes = useStyles()

    return (
        <div className="controls-container">
            <div>
                <IconButton aria-label="sync" title={'Refresh'} onClick={onRefresh} color="primary">
                    <SyncIcon fontSize="small" htmlColor={common.white} />
                </IconButton>
            </div>

            <FormControl variant="outlined" className="form-container" size="small" color="primary">
                <Select
                    defaultValue={Lang.en}
                    value={lang}
                    onChange={handleLangChange}
                    inputProps={{
                        classes: {
                            icon: 'select-icon',
                        }
                    }}
                    className="select"
                >
                    {Object.keys(Lang).map((key) => {
                        // @ts-ignore
                        const value = Lang[key]
                        return <MenuItem key={key} value={value}>{value}</MenuItem>
                    })}
                </Select>
            </FormControl>

            <ToggleButtonGroup
                className="toggle-button-container"
                value={units}
                exclusive
                onChange={handleUnitsChange}
                aria-label="units"
            >
                <StyledButton value={Units.metric} aria-label={Units.metric}>
                    &#8451;
                </StyledButton>
                <StyledButton value={Units.imperial} aria-label={Units.imperial}>
                    &#8457;
                </StyledButton>
            </ToggleButtonGroup>


            <div className="autocomplete-container">
                <SpeechSynthesis />
                <SpeechRecognition />

                <FormControl component='form' className={classes.root} onSubmit={handleSubmitForm}>
                    <TextField
                        color="primary"
                        className={classes.label}
                        id="outlined-search"
                        type="search"
                        variant="filled"
                        onChange={handleInputValue} />
                    <Button className={classes.search} color="primary" type="submit" onClick={() => onAddressChange(input)}>
                        <SearchIcon />
                    </Button>
                </FormControl>


            </div>
        </div >
    )
}