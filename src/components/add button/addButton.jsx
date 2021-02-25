import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import './addButton.css';

export default function AddButton() {
    return (
        <div className='button__add'>
            <Fab color="primary" aria-label="add">
                <Link className='link__addButton' to='/edit/new'><AddIcon /></Link>
            </Fab>
        </div>
    );
}