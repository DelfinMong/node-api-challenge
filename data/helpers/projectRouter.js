const express = require('express');
const Action = require('./actionModel');
const Project = require('./projectModel');
const router = express.Router();

router.get('/', (req, res) => {
	Project.get()
		.then(project => {
			res.status(200).json(project)
		})
		.catch(err => {
			res.status(500).json({ error: 'Sorry, try again!', err })
		})
})

router.get('/:id',(req, res) => {
	const {id} = req.params
    Project.get(id)
         .then(project => {
		    res.status(200).json(project)
            })
         .catch(err => {
                res.status(500).json({ error: 'no project with id',})
            })
})

router.post('/',(req, res) => {
    const body = req.body
	Project.insert(body)
		.then(project => {
			res.status(201).json({ success: 'New Project', project })
		})
		.catch(err => {
			res.status(500).json({ error: 'try again!', err })
		})
		
})
router.put('/:id',(req, res) => {
    const { id } = req.params
    const body = req.body

	Project.update(id,body)
		.then(project => {
			res.status(200).json({ msg: 'Updated!', info: body })
		})
})

router.delete('/:id',(req, res) => {
	const { id } = req.params
	Project.remove(id)
		.then(project => {
            res.status(200).json({msg:'success', project})
        })
    })
    
router.get('/:id/actions',(req, res) => {
        const { id } = req.params
    
        Project.getProjectActions(id)
            .then(data => {
                data ? res.status(200).json(data) : null
            })
    })

    router.post('/:id/actions',(req, res) => {
        const { description, notes } = req.body
        const project_id = req.params.id
    
        Project.get(project_id)
            .then(action => {
                if (!action) {
                    null
                } else {
                    let newAction = {
                        description,
                        notes,
                        project_id,
                    }
    
                    Actions.insert(newAction)
                            .then(action => {
                                 res.status(201).json({ success: action })
                    })
                }
            })
    })



module.exports = router;