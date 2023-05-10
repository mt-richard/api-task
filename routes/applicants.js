const express = require("express")
const {applicants} = require('../models/index');
const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const allapplicants = await applicants.findAll();
        res.json(allapplicants);
    } catch (error) {
        console.error(error);
    }
    
})

route.get('/:id', async (req, res) => {
    try {
        const applicant = await applicants.findByPk(req.params.id);
        if (applicant) {
                    res.json(applicant);
                } else {
                    res.status(404).json({message: 'Applicant not found'})
                }
        
    } catch (error) {
        console.error(error);
    }
    
})
route.post('/add', async (req, res) => {
    try {
        const applicant = await applicants.create(req.body);
        if (applicant) {
            res.status(200).json({message: 'Application successfully added'})
        } else {
            res.status(201).json({message: 'Applicant already exists'})
        }   
        
    } catch (error) {
        console.error(error)
    }
    
})

route.put('/edit/:id', async (req, res) => {
    try {
        const applicant = await applicants.findByPk(req.params.id);
        if (applicant) {
            applicant.update(req.body);
            res.json({message: 'Data updated'})
            
        }
        res.json({message: 'Failed to update'})
    } catch (error) {
        console.error(error);
    }
    
})

route.delete('/delete/:id', async (req, res) => {
    try {
        const application = await applicants.findByPk(req.params.id)
        if (application) {
            await application.destroy();
            res.json({message: 'Application deleted'})
        }
    } catch (error) {
        console.error(error);
    }
    
})


module.exports = route