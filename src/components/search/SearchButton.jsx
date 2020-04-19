import React from 'react';
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: theme.spacing(0.5),
        }
});

class SearchButton extends React.Component {
    render() {
        const { classes } = this.props;
        return <Button variant="contained" className={classes.root} color="secondary" disabled={this.props.wordsToSearch.length === 0}><SearchOutlinedIcon /></Button> //todo: add color to button
    }
}

const mapStateToProps = (state) => {
    return { wordsToSearch: state.wordsSearch.wordsToSearch }
};
//todo: add actual search function!! do it with thunk when you have api!!! action names have already been added for this
export default connect(mapStateToProps)(withStyles(styles)(SearchButton));