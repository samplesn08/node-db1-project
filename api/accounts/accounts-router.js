const Account = require("./accounts-model");
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware');

const router = require('express').Router()

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account)
})

router.post('/', checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  } catch(err) {
    next(err);
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const updatedAccount = await Account.updateById(req.params.id, req.body)
    res.status(200).json(updatedAccount)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const deletedAccount = await Account.deleteById(req.params.id)
    res.json(deletedAccount)
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({ message: err.message })
})

module.exports = router;
