const express = require('express');
const router = express.Router();

var { Employee } = require('../models/employee.js');
var ObjectId = require('mongoose').Types.ObjectId;


// localhost:3000/employee/
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs); }
        else {
            console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`)
    Employee.findById(req.params.id, (err, docs) => {
        if (!err) { res.send(docs); }
        else {
            console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err, docs) => {
        if (!err) { res.send(docs); }
        else {
            console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2));
        }
    });
})

router.put('/:id', (req, res) => {
    console.log(req);
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new : true},(err,doc)=>{
        console.log(req.params.id);
        if (!err) { res.send(doc); }
        else {
            console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2) , err);
        }
    });
})

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`)
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
        if (!err) { res.send(doc); }
        else {
            console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2));
        }
    })
})

module.exports = router;