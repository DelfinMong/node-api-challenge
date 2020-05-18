const express = require('express');
const Action = require('./actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    // do your magic!
      Action.get()
              .then( action => {
                res.status(200).json(action)
              })
              .catch( err => {
                  res.status(500).json({ err: 'No user'})
              })
  });

  router.get('/:id',(req, res) => {
    const { id } = req.params
          Actions.get(id)
             .then(action => {
               res.status(200).json(action)
             .catch( err => {
                res.status(500).json({ err: 'No user'})
            })  
    })
  })

  router.put('/:id',(req, res) => {
    const { id } = req.params
    const body = req.body

    Action.update(id,body)
          .then(action => {
		    res.status(200).json({action:'made changes', action})
	})
})

router.post('/',(req,res) => {
   const body = req.body
  //  const post = {
  //   "description": "strong drink",
  //   "notes": " random notes ",
  //   "completed": true
  //  }

   Action.insert(body) 
           body ? res.status(201).json({msg:" new post",post})
                : res.status(400).json({ err:"pls include information"})

})

router.delete('/:id',(req, res) => {
	const { id } = req.params
   Action.remove(id)
       .then( action => {
          res.status(200).json({msg:'success', action})
       })
}) 

module.exports = router;