import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const useStyles = makeStyles({
    root: {
        maxWidth: 540,
        margin: '1vh'
    },
    media: {
        height: 140,
    },
});

export default function Detail(props) {
    const classes = useStyles();
    const [error, setError] = useState(false)
    let { id } = useParams();

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => {

        }).catch(err => {
            if (err) {
                setError(true)
            }
        })
    }, [])

    return (
        <Container maxWidth="sm">
            {error ? <p>No se encontro el post especificado</p> :
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        image="https://picsum.photos/400/200"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.post.body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            <Link className='link__card' to={`/edit/${props.post.id}`}>Editar</Link>
                        </Button>
                        <Button size="small" color="primary" onClick={() => {
                            props.dispatch({
                                type: 'DELETE',
                                payload: props.post
                            })
                        }}>
                            <Link className='link__card' to='/'>Eliminar</Link>
                        </Button>
                    </CardActions>
                </Card>
            }
        </Container>
    );
}