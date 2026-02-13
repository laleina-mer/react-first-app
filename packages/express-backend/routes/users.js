const express = require('express');
const router = express.Router();
const userService = require('../services/user-services');

router.get('/', async (req, res) => {
  try {
    const { name, job } = req.query;

    let results;
    if (name && job) {
      results = await userService.findUsersByNameAndJob(name, job);
    } else if (name) {
      results = await userService.findUsersByName(name);
    } else if (job) {
      results = await userService.findUsersByJob(job);
    } else {
      results = await userService.findAllUsers();
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.findUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid id' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await userService.deleteUserById(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', deleted });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid id' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await userService.updateUserById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid id or payload' });
  }
});

module.exports = router;
