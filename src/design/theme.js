import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: { main: '#6252ce', contrastText: '#fdb717' },
    secondary: { main: '#fdb717', contrastText: '#6252ce' }
};

const typography = {
    fontFamily: [
        'Varela Round',
        'Tajawal'
    ].join(','),
};

const direction = 'rtl';

const themeName = 'Indigo Lightning Yellow Lobe Coral';

export default createMuiTheme({ palette, typography, direction, themeName });