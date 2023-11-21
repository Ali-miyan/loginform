const express = require("express");
const router = express.Router();

const details = {
  email: 'alimiyan1112@gmail.com',
  password: 'ali123'
}

//login user
router.post('/login', (req, res) => {
        
    if (req.body.email === details.email && req.body.password === details.password) {
        req.session.user = req.body.email;
        res.redirect("/route/dashboard");
    }else {
            // Set an error message in the session
            req.session.errorMessage = 'Invalid input.';
            res.redirect('/');
        }
        // res.redirect('/');
        // res.render('base',{msg:"invalid input"})
        // res.send('<script>window.location.href = "/"; alert("invalid input");</script>');
    }
);

//route for dashboard
router.get('/dashboard',(req, res) => {
    if (req.session.user) {
          res.render('dashboard',{user:req.session.user})
      }else{
        res.redirect('/')
      }
})

//route for logout 
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send(err);
        }else{
            // res.render('base',{logout:'Logout succeccfull'})
        
            res.send('<script>window.location.href = "/"; alert("Logout successful");</script>');
        }
    })
})


module.exports = router;


