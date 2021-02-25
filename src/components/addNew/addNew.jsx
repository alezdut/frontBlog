import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Link, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import './addNew.css'


const useStyles = makeStyles({
    root: {
        maxWidth: 540,
        margin: '1vh',

    },
    media: {
        height: 140,

    },
});

export default function AddNew(props) {
    const classes = useStyles();
    let { id } = useParams();
    const [data, setData] = useState({});
    const [error, setError] = useState(false)

    useEffect(() => {
        if (id !== 'new') {
            axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => {
                setData(res.data);
            }).catch(err => {
                console.log(err.message)
            })
        }
    }, [])

    const handleValidite = (e) => {
        if (e.target.id === 'title') {
            setData({
                ...data,
                title: e.target.value
            })
        }
        else if (e.target.id === 'body') {
            setData({
                ...data,
                body: e.target.value
            })
        }
        if (e.target.value === '') {
            setError(true)
        } else (setError(false))
    }

    return (
        <Container maxWidth="sm">
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image="https://picsum.photos/400/200"
                />
                <CardContent >
                    <TextField className='card__content'
                        id="title"
                        error={error}
                        onChange={handleValidite}
                        label=""
                        fullWidth
                        placeholder={data.title ? '' : 'Titulo del post'}
                        multiline
                        rows={1}
                        defaultValue={data.title ? data.title : ''}
                        variant="outlined"
                    />
                    <Divider />
                    <TextField className='card__content'
                        id="body"
                        error={error}
                        onChange={handleValidite}
                        label=""
                        fullWidth
                        placeholder={data && data.body ? '' : 'Contenido del post'}
                        multiline
                        rows={4}
                        defaultValue={data && data.body ? data.body : ''}
                        variant="outlined"
                    />
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" disabled={error} onClick={() => {
                        if (data.id) {
                            axios.patch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, data).then(res => {
                                props.dispatch({
                                    type: 'LOAD_DETAIL',
                                    payload: res.data
                                })
                            })
                        }
                        else {
                            axios.post('https://jsonplaceholder.typicode.com/posts', data).then(res => {
                                props.dispatch({
                                    type: 'LOAD_DETAIL',
                                    payload: res.data
                                })
                            })
                        }
                    }
                    }><Link className='link__new' to={`/detail/${data.id}`}>Aceptar</Link>
                    </Button>
                    <Button size="small" color="primary">
                        <Link className='link__new' to='/'>Cancelar</Link>
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
}