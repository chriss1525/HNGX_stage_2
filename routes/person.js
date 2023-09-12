// CRUD operation api routes
const express = require('express');
const router = express.Router();
const supabase = require('../utils/db.js');

// Middleware to validate if the input is a string
function validateString(req, res, next) {
  const { name } = req.body;
  if (typeof name === 'string') {
    next();
  } else {
    return res.status(400).json({ error: 'Name must be a string.' });
  }
}


// Middleware to validate if the input is an integer or a string
function validateIntegerOrString(req, res, next) {
  const param = req.params.param;
  if (!isNaN(parseInt(param)) || typeof param === 'string') {
    next();
  } else {
    return res.status(400).json({ error: 'Input must be an integer or a string.' });
  }
}

// Create a person
router.post('/', validateString, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('person')
      .insert([req.body])
      .select('*');
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read one person
router.get('/:param', validateIntegerOrString, async (req, res) => {
    const param = req.params.param;
    if (!isNaN(parseInt(param))) {
      const id = parseInt(param);
      const { data, error } = await supabase
        .from('person')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(200).json(data);
    } else {
      const { data, error } = await supabase
        .from('person')
        .select('*')
        .eq('name', param)
        .single();
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(200).json(data);
    } 
});

// Update a person's data
router.put('/:param', validateIntegerOrString, validateString, async (req, res) => {
    const param = req.params.param;
    if (!isNaN(parseInt(param))) {
      const id = parseInt(param);
      const { data, error } = await supabase
        .from('person')
        .update(req.body)
        .eq('id', id)
        .select()
        .single();
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(200).json(message: "person updated", data);
    } else {
      const { data, error } = await supabase
        .from('person')
        .update(req.body)
        .eq('name', param)
        .select()
        .single();
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(200).json( message: "person updated" ,data);
    } 
});

// Delete a person
router.delete('/:param', validateIntegerOrString, async (req, res) => {
    const param = req.params.param;
    if (!isNaN(parseInt(param))) {
      const id = parseInt(param);
      const { data, error } = await supabase
        .from('person')
        .delete()
        .eq('id', id);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(200).json({message: 'Person deleted.'});
    } else {
      const { data, error } = await supabase
        .from('person')
        .delete()
        .eq('name', param);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(200).json({message: 'Person deleted.'});
    } 
});

module.exports = router;
``
