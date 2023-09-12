// CRUD operation api routes
const express = require('express');
const router = express.Router();
const supabase = require('../utils/db.js');

// create a person
router.post('/', async (req, res) => {
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

}
);

// read one person
router.get('/:param', async (req, res) => {
  try {
    const param = req.params.param;

    // check if param is an integer or a string

    if(!isNaN(parseInt(param))) {
      const id = parseInt(param);

      // if param is an integer, search by id

      const { data, error } = await supabase
        .from('person')
        .select('*')
        .eq('id', id);
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
);

// update a person's data
router.put('/:param', async (req, res) => {
  try {
    const param = req.params.param;

    // check if param is an integer or a string

    if(!isNaN(parseInt(param))) {
      const id = parseInt(param);
      const { data, error } = await supabase
        .from('person')
        .update(req.body)
        .eq('id', id);
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json(data);
    } else {
      const { data, error } = await supabase
        .from('person')
        .update(req.body)
        .eq('name', param);
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
);

// delete a person
router.delete('/:param', async (req, res) => {
  try {
    const param = req.params.param;

    // check if param is an integer or a string

    if(!isNaN(parseInt(param))) {
      const id = parseInt(param);

      // if param is an integer, search by id
      const { data, error } = await supabase
        .from('person')
        .delete()
        .eq('id', id);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json(data);

    } else {
      const { data, error } = await supabase
        .from('person')
        .delete()
        .eq('name', param);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
);

module.exports = router;
