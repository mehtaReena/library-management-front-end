import { CircularProgress, Divider, Fab, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from "./ConfirmDialog";
import CloseIcon from '@material-ui/icons/Close';
import Notification from './Notification'
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Controls from "../components/controls/Controls";


function BookList(props) {

    const url = "http://localhost:3300/books";
    const useStyles = makeStyles((theme) => ({
        customPaper: {
            padding: theme.spacing(12),
            gutters: theme.spacing(25),
            width: 1000,
            display: 'flex',
            margin: 'auto',
            flexDirection: 'column'


        },
        extendedIcon: {
            alignItems: "right"
        },

    }));
    const classes = useStyles();

    let [books, setBooks] = useState();
    let [loading, setLoading] = useState(true);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [selectedIndex, setSelectedIndex] = React.useState(1);


    let getBooks = async () => {
        let access_Token = window.localStorage.getItem('access_Token')
        console.log(" /Book  " ,access_Token)
        let response = await fetch(url,{
                method:'GET',
                headers:{
                    'Authorization': 'Bearer '+access_Token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
        });
        let data = await response.json();
        console.log(data)
        setBooks(data)
        setLoading(false);
    }
    useEffect(() => {
        getBooks()
    }, [])


    const onDelete = async (id) => {
        let Removeurl = "http://localhost:3300/books/" + id;

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        let res = await fetch(Removeurl,
            {
                method: 'DELETE'
            });
        let result = await res.json();
        console.log(result)
        setBooks(result)



        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }




    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };



    return (
        <Paper className={classes.customPaper} elevation={9} >
            <Typography variant="h5" align="center">Books</Typography>
            <Divider />
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {
                        books.map((book, idx) => (
                            <ListItem
                                selected={selectedIndex === idx}
                                onClick={(event) => handleListItemClick(event, idx)}>
                                <ListItemText primary={book.title}
                                    secondary={book.author} />


                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <EditIcon>
                                            <CloseIcon fontSize="small" /> </EditIcon>
                                    </IconButton>


                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon style={{ fill: "red" }}
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: `Are you sure to delete this  "${book.title} "?`,
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(book._id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" /> </DeleteIcon>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                </List>
            )}
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            <Controls.Button
                text="Add New"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}

            />
        </Paper>
    );
}

export default BookList;