function createFunctionList() {
    let functions = [];
  
    for (let i = 0; i < 5; i++) {
      functions.push(function () {
        console.log("Index:", i);
      });
    }
  
    return functions;
  }
  
  const functionList = createFunctionList();
  
  functionList[0](); // Index: 0
  functionList[1](); // Index: 1
  functionList[2](); // Index: 2
  functionList[3](); // Index: 3
  functionList[4](); // Index: 4
  