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
  const { name } = req.body;

  // Check if a person with the same name already exists
  const { data: existingData, error: existingError } = await supabase
    .from('person')
    .select('name')
    .eq('name', name);

  if (existingError) {
    return res.status(400).json({ error: existingError.message });
  }

  if (existingData && existingData.length > 0) {
    return res.status(400).json({ error: 'Person with the same name already exists.' });
  }

  // if person does not exist, create a new one
    const { data, error } = await supabase
      .from('person')
      .insert([req.body])
      .select('*');
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(201).json(data); 
});

// Read one person
router.get('/:param', validateIntegerOrString, async (req, res) => {
  const param = req.params.param;
  let query;
  if (!isNaN(parseInt(param))) {
    const id = parseInt(param);
    query = supabase
      .from('person')
      .select('*')
      .eq('id', id);
  } else {
    query = supabase
      .from('person')
      .select('*')
      .eq('name', param);
  }

  const { data, error } = await query;
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  
  if (!data) {
    return res.status(404).json({ error: 'Person not found.' });
  }

  res.status(200).json(data);
});

// Update a person's data
router.put('/:param', validateIntegerOrString, validateString, async (req, res) => {
  const param = req.params.param;
  let query;

  // Check if a person with the same name already exists (excluding the current person by ID)
  const { name } = req.body;
  const { data: existingData, error: existingError } = await supabase
    .from('person')
    .select('name')
    .neq('id', param) // Exclude the current person by ID
    .eq('name', name);

  if (existingError) {
    return res.status(400).json({ error: existingError.message });
  }

  if (existingData && existingData.length > 0) {
    return res.status(400).json({ error: 'Person with the same name already exists.' });
  }

  if (!isNaN(parseInt(param))) {
    const id = parseInt(param);
    query = supabase
      .from('person')
      .update(req.body)
      .eq('id', id)
      .select('*');
  } else {
    query = supabase
      .from('person')
      .update(req.body)
      .eq('name', param)
      .select('*');
  }

  const { data, error } = await query;
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Person not found.' });
  }

  res.status(200).json({ message: "person updated", data });
});

// Delete a person
router.delete('/:param', validateIntegerOrString, async (req, res) => {
  const param = req.params.param;
  let query;
  if (!isNaN(parseInt(param))) {
    const id = parseInt(param);
    query = supabase
      .from('person')
      .delete()
      .eq('id', id);
  } else {
    query = supabase
      .from('person')
      .delete()
      .eq('name', param);
  }

  const { data, error } = await query;
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'Person deleted.' }); 
});

module.exports = router;
``
