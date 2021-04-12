const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {name, budget} = req.body
  if(!name || !budget){
    res.status(400).json({message:"name and budget are required"})
  }else if(typeof name != 'string'){
    res.status(400).json({ message: "name of account must be a string" })
  }else if(name.length.trim() < 3 || name.length.trim() > 100){
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  }else if(typeof budget != 'number'){
    res.status(400).json({ message: "budget of account must be a number" })
  }else if(budget<0 || budget>1000000){
    res.status(400).json({ message: "budget of account is too large or too small" })
  }else{
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await Account.getAll()
  if(req.body.name.trim() === account.name){
    res.status(400).json({ message: "that name is taken" })
  }else{
    next();
  }
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const account = await Account.getById(req.params.id)
    if(account){
      req.account = account
      next()
    }else{
      res.status(404).json({message:"account not found"})
    }
  }catch(err){
    next(err)
  }
}
