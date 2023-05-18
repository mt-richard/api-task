const express = require("express")
const {applicants} = require('../models/index');
const route = express.Router()
const { Op } = require('sequelize');

const secretKey = process.env.JWT_SECRET;
function authenticate(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.json({status:401, message: 'Authorization header missing' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.json({ status:401,message: 'Token is not valid' });
    }
    req.user = decoded.user;
    next();
  });
}



route.get('/', async (req, res) => {
    try {
        const allapplicants = await applicants.findAll();
        res.json(allapplicants);
    } catch (error) {
        console.error(error);
    }
    
})


route.post('/add', async (req, res) => {
    try {
        const exists = await applicants.findOne({where: { 
            [Op.or]: [
              { email: req.body.email },
              { name: req.body.name },
              { phone: req.body.phone }
            ]
          }});
        if (exists) {
            res.json({status:'201',message: 'Email or  Name or Phone Already used'})
        } else {
            const applicant = await applicants.create(req.body);
            if (applicant) {
                res.json({message: 'Application successfully added', status:'200'})
            } 
        }
         
    } catch (error) {
        console.error(error)
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

route.put('/edit/:id', async (req, res) => {
    try {
        const applicant = await applicants.findByPk(req.params.id);
        if (applicant) {
            applicant.update(req.body);
            res.json({status: 200, message: 'Data Updated Successfully'})
            
        }else{
            res.json({status: 404, message: 'Aplicant Not Found'})
        }
        
    } catch (error) {
        console.error(error);
    }
    
})

route.delete('/delete/:id', async (req, res) => {
    try {
        const application = await applicants.findByPk(req.params.id)
        if (application) {
            await application.destroy();
            res.json({status: 200, message: 'Application deleted'})
        }else{
            res.json({status: 404, message: 'Application not found'})
        }
    } catch (error) {
        console.error(error);
    }
    
})

route.get('/applied/:option', async(req, res) =>{
    try {
        const apply = await applicants.count({where: {position: req.params.option}})
        if (apply) {
            res.json(apply)
        }else{
            res.json({status: 404, message: 'No applicants found'})
        }
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = route