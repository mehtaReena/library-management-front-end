import { CircularProgress, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from "./ConfirmDialog";
import CloseIcon from '@material-ui/icons/Close';
import Notification from './Notification'

function BookList(props) {
    const url = "http://localhost:3300/books";
    const useStyles = makeStyles((theme) => ({
        customPaper:{
            padding:theme.spacing(2),
        }

      }));
      const classes = useStyles();

    let [books, setBooks] = useState();
    let [loading, setLoading] = useState(true);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })


    let getBooks = async () => {
        let response = await fetch(url);
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



    return (
        <Paper className ={classes.customPaper}elevation={3} >
            <Typography variant="h5">All books</Typography>
            <Divider />
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {
                        books.map((book) => (
                            <ListItem>
                                <ListItemText primary={book.title}
                                    secondary={book.author} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
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
        </Paper>
    );
}

export default BookList;