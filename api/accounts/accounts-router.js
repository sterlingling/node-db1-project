const router = require('express').Router()
const Account = require('./accounts-model');
const md = require('./accounts-middleware');
router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getAll();
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  res.json(req.account)
  // DO YOUR MAGIC
})

router.post('/', md.checkAccountPayload,
  md.checkAccountNameUnique,
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      const newAccount = await Account.create({ name: req.body.name.trim(), budget: req.body.budget, });
      res.status(201).json(newAccount)
    } catch (err) {
      next(err);
    }
  })

router.put('/:id',
  md.checkAccountId,
  md.checkAccountPayload,
  async (req, res, next) => {
    // DO YOUR MAGIC
    const updated = await Account.updateById(req.params.id, req.body)
    res.json(updated)
    try {
      res.json('updated')
    } catch (err) {
      next(err)
    }
  });

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account);
  }
  catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
