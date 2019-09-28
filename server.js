const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const Issue =  require('./models/issue');
const Author =  require('./models/author');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
app.use(cors());


mongoose.connect('mongodb://localhost:27017/issues', {useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
  console.log("Connected successfully");
});


router.route('/issues').get((req, res) => {
    //console.log("route working");
    Issue.find((err, issues) => {
        if(err){
            console.log("error" + err);
        }else{
            console.log("gotten");
            res.json(issues)
        }

    });
});

router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if(err){
            console.log(err);
        }else{
            res.json(issue)
        }

    });

});


router.route('/issues/add').post((req, res) => {
    console.log(req.body);
    console.log(req.body.severity);
    let issue = new Issue({
        title: req.body.title,
        responsible: req.body.responsible,
        severity: req.body.severity,
        description: req.body.description
    });
    issue.save((err, doc) => {
        if(!err){
            res.send(doc);
        }else{
            console.log(err)
        }
    });
});

router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if(!issue){
            return next(new Error('Could not load documentat'));
        }else{
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.status = req.body.status;
            issue.save()
        .then(issue => {
            res.status(200).json('Updated');
        })
        .catch(err => {
            res.status(400).send('Update Failed');
        });

        }
    });
});

router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if(err){
            res.json(err);
        }else{
            res.json('Removed sucessfully');

        }
    });
});


app.use('/', router);
app.listen(4000, () => console.log("The server is running on port 4000"));