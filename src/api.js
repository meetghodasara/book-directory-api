const router = require('express').Router();
const books = require('./books')

var bookDirectory  = books;

router.get('/books', function(req , res){
    res.json(bookDirectory);
});

router.get('/books/:id' , function(req ,res){
    const {id} = req.params;
    const book = bookDirectory.find(b => b.isbn === id);
    if(!book){
        res.status(404).send('Book not fount');
    }
    res.send(book);
});

router.post('/books' , function(req ,res){
    const {
        title,
        isbn,
        pageCount,
        thumbnailUrl,
        status,
        authors,
        categories,
    } = req.body;
    const bookExit = bookDirectory.find(b => b.isbn == isbn);
    if(bookExit){
        return res.send('Book already exist');
    }
    const book = {
        title,
        isbn,
        pageCount,
        thumbnailUrl,
        status,
        authors,
        categories,
    };
    bookDirectory.push(book);
    res.send(book);
})

router.put('/books/:id' , function(req ,res){
    const {id} = req.params;
    const {
        title,
        isbn,
        pageCount,
        thumbnailUrl,
        status,
        authors,
        categories,
    } = req.body;

    const updatedBook = bookDirectory.find(b => b.isbn === id);

    if(!updatedBook){
        res.status(404).send('Book not fount');
    }
    const updateField = (val , field) => {
        if(val){
            updatedBook[field] = val;
        }
    }
    updateField(title , 'title');
    updateField(isbn , 'isbn');
    updateField(pageCount , 'pageCount');
    updateField(thumbnailUrl , 'thumbnailUrl');
    updateField(status , 'status');
    updateField(authors , 'authors');
    updateField(categories , 'categories');

    const bookIndex = bookDirectory.findIndex(b => b.isbn === id);
    bookDirectory.slice(bookIndex , 1 , updatedBook);
    res.send(updatedBook);
})

router.delete('/books/:id' , function(req ,res){
    const {id} = req.params;
    const book = bookDirectory.find( b => b.isbn === id);
    if(!book){
        res.send('Book not exist');
    }
    bookDirectory = bookDirectory.filter(b => b.isbn !== id);
    // bookDirectory.splice(id, 1);
    res.send('Successfully Deleted the book')
    // Filter method use the filter those books whose id not equal to the given id.
})

module.exports = router;