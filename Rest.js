let url = "http://localhost:2200/category"
let itemsUrl = "http://localhost:2200/items?SID="


//Slider 1 code
function getCat(){
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        for(i=0;i<data.length;i++){

            let element = document.createElement('option')  //<option></option>
            let text = document.createTextNode(data[i].Name) // Delhi
            element.appendChild(text) //<option>Delhi</option>
            element.value = data[i].SID //<option value="1">Delhi</option>
            document.getElementById('drugCat').appendChild(element)
            /*<select>
                <option value="1">Delhi</option>
            </select>*/
        }
    })
}

const getDrug = () => {
    const drugCatId = document.getElementById('drugCat').value;
  
    let element = document.getElementById('items');
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  
    fetch(`${itemsUrl}${drugCatId}`)
      .then((res) => res.json())
      .then((data) => {
        let element = document.createElement("option");
        let text = document.createTextNode("----Select Item----");
        
        console.log(text);
        element.appendChild(text);
       document.getElementById("items").appendChild(element);
  
        for (var i = 0; i < data.length; i++) {

          let element = document.createElement("option");
          let text = document.createTextNode(data[i].Name);
          console.log(text);
          element.appendChild(text);
          document.getElementById("items").appendChild(element);
        }
      });
  };
//slider 2 code
function getCat2(){
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        for(i=0;i<data.length;i++){
            let element = document.createElement('option')  //<option></option>
            let text = document.createTextNode(data[i].Name) // Delhi
            element.appendChild(text) //<option>Delhi</option>
            element.value = data[i].SID //<option value="1">Delhi</option>
            document.getElementById('drugCat2').appendChild(element)
            /*<select>
                <option value="1">Delhi</option>
            </select>*/
        }
    })
}

const getDrug2 = () => {
    const drugCatId2 = document.getElementById('drugCat2').value;
  
    let element = document.getElementById('items2');
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  
    fetch(`${itemsUrl}${drugCatId2}`)
      .then((res) => res.json())
      .then((data) => {
        let element = document.createElement("option");
        let text = document.createTextNode("----Select Item----");
        
        console.log(text);
        element.appendChild(text);
       document.getElementById("items").appendChild(element);
  
        for (var i = 0; i < data.length; i++) {
          let element = document.createElement("option");
          let text = document.createTextNode(data[i].Name);
          console.log(text);
          element.appendChild(text);
          document.getElementById("items2").appendChild(element);
        }
      });
  };

//Slider 3 code 

function getCat3(){
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        for(i=0;i<data.length;i++){
            let element = document.createElement('option')  //<option></option>
            let text = document.createTextNode(data[i].Name) // Delhi
            element.appendChild(text) //<option>Delhi</option>
            element.value = data[i].SID //<option value="1">Delhi</option>
            document.getElementById('drugCat3').appendChild(element)
            /*<select>
                <option value="1">Delhi</option>
            </select>*/
        }
    })
}

const getDrug3 = () => {
    const drugCatId3 = document.getElementById('drugCat3').value;
  
    let element = document.getElementById('items3');
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  
    fetch(`${itemsUrl}${drugCatId3}`)
      .then((res) => res.json())
      .then((data) => {
        let element = document.createElement("option");
        let text = document.createTextNode("----Select Item----");
        
        console.log(text);
        element.appendChild(text);
       document.getElementById("items3").appendChild(element);
  
        for (var i = 0; i < data.length; i++) {
          let element = document.createElement("option");
          let text = document.createTextNode(data[i].Name);
          console.log(text);
          element.appendChild(text);
          document.getElementById("items3").appendChild(element);
        }
      });
  };


/*
const getDrug = () => {
    const drugCatId = document.getElementById('drugCat').value;

    let elementRem = document.getElementById('items');
        while(elementRem.firstChild){
            elementRem.removeChild(elementRem.firstChild)
        }

    fetch('${itemsUrl}${drugCatId}')
        .then((res) => res.json())
        .then((data) => {
            let element = document.createElement('option')
            let text = document.createTextNode("----Select Item-----")
            element.appendChild(text)
            document.getElementById('items').appendChild(element)

            for(var i=0;i<data.length;i++){
                let element = document.createElement('option')
                let text = document.createTextNode(data[i].name);
                element.appendChild(text)
                document.getElementById('items').appendChild(element)
            }
        })
        
        
    }

*/



/* const getDrug = () => {
    const drugCatId = document.getElementById('drugCat').value;
   var remove_Items = null
   if (remove_Items == null) {
    remove_Items =items
   } else {
    while(items.length>0){
        items[0].remove()
        
    }

   }
   if(remove_Items.length != items.length){
    while(items.length>0){
        items[0].remove()
        
    }
   }
    
    fetch(`${itemsUrl}${drugCatId}`)
    .then((res) => res.json())
    .then((data) => {
        for(i=0;i<data.length;i++){
            let element = document.createElement('option')
            let text = document.createTextNode(data[i].Name)
            console.log(text)
            element.appendChild(text)
            document.getElementById('items').appendChild(element)
        }
    })
}
*/