
  $('#postbtn').click(function(event){
    event.preventDefault();
    // console.log("hello");
    let data = {
      username: $("#username").value
    }
    console.log($("#username").value);
      function postFunc(){
        const response = post('http://localhost:3800/', data)
        const json = response.json()
        console.log(json);
      }
      postFunc();
    })
