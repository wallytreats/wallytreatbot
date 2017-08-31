function(){
  $('postbtn').click(async function (){
      const response = await fetch('http://localhost:3000/')
      const json = await response.json()
      console.log(json);
  })
}();
