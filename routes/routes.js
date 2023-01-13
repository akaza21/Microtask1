const express = require("express");
const router = express.Router();

let tokens = ["akaza", "pragyash", "p0mp0m"];

const authenticate = (req) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["token"];
  if (!token) {
    return false;
  }

  if (tokens.indexOf(token) === -1) return false;
  return true;
};

let repos = {
  expressjs: "https://github.com/expressjs/express",
  axios: "https://github.com/axios/axios",
  nextjs: "https://github.com/vercel/next.js",
};

router.get("/repos", (req, res) => {
  if (authenticate(req)) {
    res.status(200).json(repos);
  } else {
    res.status(400).json({
      message: "Token required",
    });
  }
});

router.get("/repos/:name", (req, res) => {
  let name = req.params.name;
  if (authenticate(req)) {
    if(repos[name]){
        res.status(200).json({
            'repo':repos[name]
        });

    }else{
        res.status(200).json({
           'message':'Repo Not Found'
        });
    }
    
  }else{
    res.status(400).json({
        message:"Token required"
    })
  }
});

module.exports = router;
