import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './card.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function CardMain(props) {
    const classes = useStyles();

    return (
        <div className='cardBody'>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.post.title ? props.post.title : <p>no data loaded</p>}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link className='link__card' to={`/detail/${props.post.id}`}><Button size="small" onClick={() => {
                        axios.get(`https://jsonplaceholder.typicode.com/posts/${props.post.id}`).then(res => {
                            props.dispatch({
                                type: 'LOAD_DETAIL',
                                payload: res.data
                            })
                        })
                    }}>Detalle</Button></Link>
                    <Link className='link__card' to={`/edit/${props.post.id}`}><Button size="small">editar</Button></Link>
                    <Button size="small" onClick={() => {
                        props.dispatch({
                            type: 'DELETE',
                            payload: props.post
                        })
                    }}>eliminar</Button>
                </CardActions>
            </Card>
        </div>
    );
}