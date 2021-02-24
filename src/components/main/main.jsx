import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '../card/card'

export default function Main(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                {props.data.map(e => {
                    return (<Card post={e} dispatch={props.dispatch}></Card>)
                })}
            </Container>
        </React.Fragment>
    );
}