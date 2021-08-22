// User Signup 
const signup = ()=>{
    var email = document.getElementById("email").value
    var name = document.getElementById("username").value
    var password = document.getElementById("password").value

    if(email==''||name=='' ||password==""){
        alert("Enter Correct Values")
    }

    else{
        firebase.auth().createUserWithEmailAndPassword(email, password )
          .then((result) => {
            var user = result.user;
            console.log("User :",user)
            console.log("User Uid:",user.uid)
   

            var obj = {
                Name : name,
                email : email,
                password :password,
                uid : user.uid
            }

            firebase.database().ref("User").child(user.uid).set(obj)
            .then((data)=>{
            window.location='login.html'
            alert
            })
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            
          });
    }

}

// User Signin

const signin = ()=> {
  var email = document.getElementById("email").value
  var password = document.getElementById("password").value


  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;

        localStorage.setItem('Current_user_ID' ,user.uid)
        localStorage.setItem('Current_user_name' ,user.uid)

        var currentUserId = localStorage.getItem('Current_user_ID')

          console.log(currentUserId)

          firebase.database().ref().child('Restaurant').orderByChild('uid').equalTo(currentUserId).once('value')
          .then((snap) => {
              var data = snap.toJSON();

              if (data == null) {
                  firebase.database().ref().child('Users').orderByChild('uid').equalTo(currentUserId).once('value')
                  .then((snap) => {
                      var data = snap.toJSON();
                      window.location='index.html'            
                  });
              }
              else{
                  window.location='dashboard.html'
              }
          });
  })
  .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error Code: ", errorCode)
      console.log("Error Message: ", errorMessage)
  });
}

// Register as a restaurant

const resignup = ()=>{

  var res_email = document.getElementById("res_email").value
  var res_name = document.getElementById("res_username").value
  var res_password = document.getElementById("res_password").value
  var res_phone = document.getElementById("res_phone").value
  var res_city = document.getElementById("res_city").value
  var res_country = document.getElementById("res_country").value

  if(res_email==''||res_email=='' ||res_password=="" ||res_phone==""||res_city==""||res_country==""){
      alert("Enter Correct Values")
  }

  else{
      firebase.auth().createUserWithEmailAndPassword(res_email, res_password )
        .then((result) => {

          var user = result.user;
          
 

          var obj = {
              name : res_name,
              email : res_email,
              password :res_password,
              phone: res_phone,
              country: res_country,
              city: res_city,
              uid : user.uid


          }

          firebase.database().ref("Restaurant").child(user.uid).set(obj)
          .then((data)=>{
          window.location='login.html'
          alert
          })
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
        });
  }

}

// Showing Restaurant collection

const abc = ()=> {
  firebase.database().ref('/Restaurant').once('value', (snapshot) => {
     const data11 = snapshot.toJSON()
             const value = Object.values(data11)

             var user_data = []

             console.log(value)

             currentUsername = localStorage.getItem('Current_user_name')

             //document.getElementById("display_username").innerHTML = currentUsername

             value.forEach(v=>
              
                 user_data.push(v)   
              )

            //  var data = document.getElementById("user_data");

             console.log("test", user_data)
             
             document.getElementById('user_data').innerHTML = user_data.map((user,i) => 
                 // console.log(Object.keys(user))
                 `
                 <div class="col-md-4 col-sm-4">
                   <div class="team-thumb wow fadeInUp" data-wow-delay="0.2s">
                        <img src="images/restaurant.jpg" class="img-responsive" alt="">
                             <div class="team-hover">
                                  <div class="team-item">
                                       <h4>${user.name}</h4>
                                       <ul class="social-icon">
                                            <li><a href="#" class="fa fa-linkedin-square"></a></li>
                                            <li><a href="#" class="fa fa-envelope-o"></a></li>
                                       </ul>
                                  </div>
                             </div>
                   </div>

                   <div class="team-info">
                        <h3>${user.name}</h3>
                        <p>A tradional mughlai restaurant offering range of dishes for both meat and veg lovers...</p>
                        <a href="#${user.uid}" class="card-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample">View Dishes</a>
                   </div>

                   <ul class="list-group list-group-flush collapse" id="${user.uid}">                                                
                         ${user.Dishes_1? `<li>${user.Dishes_1} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                         ${user.Dishes_2? `<li>${user.Dishes_2} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                         ${user.Dishes_3? `<li>${user.Dishes_3} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                         ${user.Dishes_4? `<li>${user.Dishes_4} <button class="btn btn-primary float-end"onClick="test();">Order</button></li>`:``}
                         ${user.Dishes_5? `<li>${user.Dishes_5} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                         ${user.Dishes_6? `<li>${user.Dishes_6} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                         ${user.Dishes_7? `<li>${user.Dishes_7} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                         ${user.Dishes_8? `<li>${user.Dishes_8} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                         ${user.Dishes_9? `<li>${user.Dishes_9} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                         ${user.Dishes_10? `<li>${user.Dishes_10} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}                     
                     </ul>
                     <p>Location: ${user.city}</p>

                </div>
                 `
             )
  });
}



