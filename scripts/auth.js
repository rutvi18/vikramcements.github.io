//var users = db.collection('users');
// users.doc("dfK0wc9Smcgkth4SgnRq").get().then(doc => {
//     console.log(doc.data().Name); 
// })

//listen for auth method changes
auth.onAuthStateChanged(user =>{
  if(user){
      console.log('user logged in' , user, user.email);
      db.collection("users").onSnapshot(snap => {
      snap.forEach(doc => {
        console.log(doc.data());
        console.log(doc.data().email);
        var x = doc.data().email;
        var y = user.email;
        if(x==y){
            var nm = doc.data().Name;
            console.log(nm);
        }
        
        if(doc.data().email==user.email && doc.data().account_type=="operator"){
            console.log("its operator");
            document.querySelector('#currentuser').innerHTML = doc.data().Name;
          document.querySelector('#empnoandamt').style.display = "block";
          document.querySelector('#getempno').style.display = "block";
          document.querySelector('#getamt').style.display = "block";
          document.querySelector('#btn_to_update').style.display = "block";
        }
        else if(doc.data().email==user.email && doc.data().account_type=="user"){
            document.querySelector('#user_display').style.display = "block";
            // document.querySelector('#welcome_user').style.display = "block";
            document.querySelector('#petrolpump_amt').style.display = "block";
            document.querySelector('#colonyname').style.display = "block";
            document.querySelector('#quarterno').style.display = "block";
            document.querySelector('#currentuser').innerHTML = doc.data().Name;
            document.querySelector('#quarterno').innerHTML="Quarter number: " + doc.data().Quarter_no;
			document.querySelector('#colonyname').innerHTML=doc.data().Colony + " colony";
            var query = db.collection("users").where("email", "==", user.email);
            query.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var x = doc.data().employeeno;
                    console.log(x);
                    db.collection("petrolpump operator").where("employeeno", "==", x)
                      .get()
                      .then(function(querySnapshot) {
                           querySnapshot.forEach(function(doc) {
                            document.querySelector('#petrolpump_amt').innerHTML = doc.data().Total_charge; 
                            console.log(doc.data());
                        });
                     })
                });
            })
            // document.querySelector('#petrolpump_amt').innerHTML =  
        }
    });
});
         
      
     
  }
  else{
      console.log('user logged out');
    //   document.querySelector('#guide').style.display = "none";
      document.querySelector('#getamt').style.display = "none";
      document.querySelector('#getempno').style.display = "none";
      document.querySelector('#btn_to_update').style.display = "none";
      document.querySelector('#user_display').style.display = "none";
    //   document.querySelector('#welcome_user').style.display = "none";
      document.querySelector('#petrolpump_amt').style.display = "none";
      document.querySelector('#quarterno').style.display = "none";
      document.querySelector('#colonyname').style.display = "none";
      document.querySelector('#currentuser').innerHTML = "";
  }
});

a="";
function update(){
    console.log('hello');
    const form = document.querySelector("#empnoandamt");
    var user = firebase.auth().currentUser;
    db.collection("users").where("email" , "==" , user.email).get().then(function(querySnapshot){
       querySnapshot.forEach(function(doc){
            var b = doc.data().collection_linked;
           console.log(b);
           var val = form['getempno'].value;
    var amt = form['getamt'].value;
    console.log(amt,val);
    //var c = "petrolpump operator";
     db.collection(b).where("employeeno" , "==" , val).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
        var y = doc.data().Total_charge;
        var amt = form['getamt'].value;
        var integer = parseInt(amt);
        console.log(y, integer);
        console.log("hi");
        var new_sum = y + integer;
        var x = doc.id;
         db.collection(b).doc(x).update({
         "Total_charge": new_sum
            });
        }); 
    });
    db.collection("users").where("employeeno","==",val).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            console.log(doc.data().email);
            Email.send({
                Host: "smtp.gmail.com",
                Username : "f20180066@hyderabad.bits-pilani.ac.in",
                Password : "hsetimA@23",
                To : doc.data().email,
                From : "f20180066@hyderabad.bits-pilani.ac.in",
                Subject : b + " charged you",
                Body : b + " charged you with INR " + amt,
                }).then(
                    message => alert("Verification mail sent successfully")
                );
                form.reset();
        })
    })
           //a = [a , b].join("");
          //console.log(a);
       })
    })
    
    //console.log(b);
    // db.collection("users").doc("mario")
    // var val = form['getempno'].value;
    // var amt = form['getamt'].value;
    // console.log(amt);
    // var c = "petrolpump operator";
    //  db.collection(c).where("employeeno" , "==" , val).get().then(function(querySnapshot){
    //     querySnapshot.forEach(function(doc){
    //     var y = doc.data().Total_charge;
    //     var amt = form['getamt'].value;
    //     var integer = parseInt(amt);
    //     console.log(y, integer);
    //     var new_sum = y + integer;
    //     var x = doc.id;
    //      db.collection(c).doc(x).update({
    //      "Total_charge": new_sum
    //         });
    //     }); 
    // });
    //.get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //         var y = doc.data().Total_charge;
    //         var new_sum = y + amt;
    //         var x = doc.id;
    //         db.collection("petrolpump operator").doc(x).update({
    //                             "Total_charge": new_sum
    //                         });
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
    
    // db.collection("petrolpump operator").onSnapshot(snap => {
//             snap.forEach(doc => {
//           if(val==doc.data().employeeno){
//               console.log('hello bitch');
//               var x = doc.id;
//               var y = doc.data().Total_charge;
//               var new_sum = y + amt;
//               //console.log(y);
//               db.collection("petrolpump operator").doc(x).update({
//                 "Total_charge": new_sum
//             });
            
//           }
//       });
//   });
// var form = document.querySelector("form");
//     form.addEventListener("submit", function(event) {
//       console.log("Saving value", form.elements.empno.value);
//       event.preventDefault();
//     });
window.alert('Updated successfully');
//window.location.reload();
}


//password reset
function passwordreset(){
    var email = document.querySelector('#login-email').value;
    console.log(email);
    if(email!=""){
        auth.sendPasswordResetEmail(email).then(function(){
            window.alert("Email has been sent to you Please check and verify!!!")
        })
        .catch(function(error){
            window.alert(error.message);
        })
    }
    else{
        window.alert("Enter valid email ID");
    }
}

//signup form, get id of form tag for signup form
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener( 'submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm[ 'signup-email'].value;
    const password = signupForm['signup-password'].value;
    if(password.length>=6){
    auth.createUserWithEmailAndPassword(email, password).then( cred => {
        console.log(cred.user);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
    var nm = signupForm['username'].value;
    var emp = signupForm['employee-number'].value;
    var col = signupForm['colony'].value;
    var quarter = signupForm['quarter-no'].value;
    db.collection("users").add({
        Name: nm,
        employeeno: emp,
        Colony: col,
        Quarter_no: quarter,
        email: email,
        account_type: "user"
    })
    db.collection("petrolpump operator").add({
        employeeno: emp,
        Total_charge: 0
    })
}
else{
    window.alert("Password length must be greater than 6 characters");
    signupForm.reset();
}
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit' , (e) => {
    console.log("hello");
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    /*console.log(email,password);*/
    console.log("hello");
    auth.signInWithEmailAndPassword( email, password).then(cred => {
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    
    })
})
