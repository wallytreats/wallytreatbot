
  $('#postbtn').click(function(event){
    // event.preventDefault();
    // console.log("hello");
        var payload = {
          username: document.getElementById("form").elements[0].value,
          twitter: document.getElementById("form").elements[1].value,
          discord: document.getElementById("form").elements[2].value
        };
        let options = {
          contentType: 'application/json',
          data: JSON.stringify(payload),
          method: "POST",
          url: "http://localhost:3800/"
        }

        $.ajax(options).done((data) => {
          if(data.length === 0){
            console.log("got nothin");
          }
        })
        console.log(payload.username);

    })
