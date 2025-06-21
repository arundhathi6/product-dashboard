
function outerFunction() {
    const message = "Hello from the closure!";
    
    return function() {
      console.log(message);
    };
  }
  
  const showMessage = outerFunction();
  
  showMessage(); 
  