const StorageCtrl = (function(){

    return{
        storeItem: function(item){
            
            let items;

            if(localStorage.getItem("items") === null){
                items =[];

                items.push(item);

                localStorage.setItem("items", JSON.stringify(items));

                console.log(`step-1`);
            }else{

                items = JSON.parse(localStorage.getItem("items"));

                items.push(item);

                localStorage.setItem("items", JSON.stringify(items));

                console.log(`step-2`);
            }
        },
        getItem: function(){

            if(localStorage.getItem("items") === null){
                items = [];

            }else {

                items = JSON.parse(localStorage.getItem("items"));
            }

            return items;
        },
        deleteItemLs: function(id){

            let items = JSON.parse(localStorage.getItem("items"));

            items.forEach(function(item, index){

                if(id === item.id){
                    items.splice(index, 1);
                }
            })

            localStorage.setItem("items", JSON.stringify(items));
        },
        updatedItemLs: function(updatedItem){
             let items = JSON.parse(localStorage.getItem("items"));

             item.forEach(function(item, index){

                if(updatedItem.id === item.id){
                    items.splice(index, 1);
                }
             })
             localStorage.setItem("items", JSON.stringify(items));
        },
        clearItems: function(){
            localStorage.removeItem("items");

        }
    }

})();

console.log(StorageCtrl.getItem());


const ItemCtrl = (function(){

    const Item = function(id, name, money){
        this.id = id;
        this.name = name;
        this.money = money;
    }

    const data = {

        items: StorageCtrl.getItem(),
        currentItem:null,
        totalMoney:0
    }

    return{
        getItem: function(){
            return data.items;
        },

        addItem: function(name,money){
            
            let ID;

            if(data.items.length > 0){

                ID = data.items[data.items.length-1].id + 1;

                
            }else{
                ID = 0;
            }

            money = parseInt(money);
            
            const newItem = new Item(ID, name, money);

            data.items.push(newItem);

            return newItem;
        },

        getTotalMoney: function(){

            let total = 0;

        if(data.items.length > 0){

            data.items.forEach(function(item){

               

                total += item.money;
            })

        }else{
          return data.totalMoney = 0;
        }

        return total;
        },
        getItemById: function(id){
            let found = null;

            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }

                
            })
            return found;
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        deletItem: function(id){

            const ids = data.items.map(function(item){
                return item.id;
            })
            
            const index =  ids.indexOf(id);

            data.items.splice(index, 1);
        },
        updatedItem: function(name,money){

            money = parseInt(money);

            let found = null;

            data.items.forEach(function(item){
              if(item.id === data.currentItem.id){
                item.name = name;
                item.money = money;
                found = item;
              }
                
            })

            return found;

        },

        clearAllItems: function(){

            data.items = [];
        }
    }

})();






const UICtrl = (function(){

    return{
        populateItemList: function(items){
            
            let html ="";

            items.forEach(item => {
                
                html +=`
                 <li class="collection-item" id="item-${item.id}">
                        <strong>${item.name}</strong> : <em>${item.money} rs</em>

                     <a href="#" class="secondary-content">
                         <i class="fa-solid fa-pencil edit-item"></i>
                     </a>
                </li>

                `
            });
           
            document.querySelector("#item-list").innerHTML = html;
           
            
        },

        clearEditState:function(){

            document.querySelector(".add-btn").style.display = "inline";
            document.querySelector(".update-btn").style.display = "none";
            document.querySelector(".delete-btn").style.display = "none";
            document.querySelector(".backup-btn").style.display = "none";

        },
        showEditState:function(){

            document.querySelector(".add-btn").style.display = "none";
            document.querySelector(".update-btn").style.display = "inline";
            document.querySelector(".delete-btn").style.display = "inline";
            document.querySelector(".backup-btn").style.display = "inline";

        },

        getItemInput:function(){

           return{
            name : document.querySelector("#item-name").value,
            money : document.querySelector("#item-money").value,
           };
        },
        addListItem: function(newItem){

            const li = document.createElement("li");

            li.className = "collection-item";

            li.id = `item-${newItem.id}`

            li.innerHTML = `<strong>${newItem.name}</strong> : <em>${newItem.money} rs</em>

                     <a href="#" class="secondary-content">
                         <i class="fa-solid fa-pencil edit-item"></i>
                     </a>`;

            
            document.querySelector("#item-list").appendChild(li);



        },
        clearInputState:function(){
            document.querySelector("#item-name").value = "";
            document.querySelector("#item-money").value = "";
        },

        showTotalMoney:function(totalMoney){
            document.querySelector(".total-money").innerText = totalMoney;
        },
        addItemToForm: function(){
            document.querySelector("#item-name").value = ItemCtrl.getCurrentItem().name;
            document.querySelector("#item-money").value = ItemCtrl.getCurrentItem().money;

        },
        deleteListItem: function(id){

            const itemID = `#item-${id}`

            const item = document.querySelector(itemID);

            item.remove();
        },
        updatedListItem: function(item){

            let listItems = document.querySelectorAll(".collection-item");

            listItems.forEach(function(listItem){
                
                const itemID = listItem.getAttribute("id");

                if(itemID === `item-${item.id}`){
                   document.querySelector(`#${itemID}`).innerHTML =`
                    <strong>${item.name}</strong> : <em>${item.money} rs</em>

                     <a href="#" class="secondary-content">
                         <i class="fa-solid fa-pencil edit-item"></i>
                     </a>`
                }
            })

        },
        
        clearItems: function(){

            const collection = document.querySelector("#item-list");
            collection.innerHTML = "";
        }
    }

})();


const App = (function(){

    const loadEventListner = function() {

    document.querySelector(".add-btn").addEventListener("click", itemAddSubmit);

     document.querySelector("#item-list").addEventListener("click", itemEditClick);

     document.querySelector(".delete-btn").addEventListener("click", itemToDelete);

     document.querySelector(".backup-btn").addEventListener("click", function(){

        UICtrl.clearEditState();
        UICtrl.clearInputState();
     })

     document.querySelector(".clear-btn").addEventListener("click", clearAllSubmit);
    
    document.querySelector(".update-btn").addEventListener("click", updateAllItems);
    }
      
    const itemEditClick = function(e){
      
        if(e.target.classList.contains("edit-item")){
            UICtrl.showEditState();
            UICtrl.clearInputState();

            const listID = e.target.parentElement.parentElement.id;

            const listArr = listID.split("-");

            const id = Number(listArr[1]);
            
            const itemToEdit = ItemCtrl.getItemById(id);

            ItemCtrl.setCurrentItem(itemToEdit);

            UICtrl.addItemToForm();
        }

    }

    const itemToDelete = function(){
        
        const currentItem = ItemCtrl.getCurrentItem();

        ItemCtrl.deletItem(currentItem.id);

        UICtrl.deleteListItem(currentItem.id);

        

        const totalMoney = ItemCtrl.getTotalMoney();

        UICtrl.showTotalMoney(totalMoney);

        UICtrl.clearEditState();
        UICtrl.clearInputState();

        StorageCtrl.deleteItemLs(currentItem.id);
    }

    const itemAddSubmit = function(e){

        e.preventDefault();
        const input = UICtrl.getItemInput();
        
        if(input.name === ""||input.money === ""){
            alert("please fill the form")

        }else{
            const newItem = ItemCtrl.addItem(input.name, input.money);
            
            UICtrl.addListItem(newItem);
           
            const totalMoney = ItemCtrl.getTotalMoney();

             UICtrl.showTotalMoney(totalMoney);

             StorageCtrl.storeItem(newItem);

              UICtrl.clearInputState();
        }
    }

     const clearAllSubmit = function(){

        ItemCtrl.clearAllItems();


        UICtrl.clearItems();
        const totalMoney = ItemCtrl.getTotalMoney();

        UICtrl.showTotalMoney(totalMoney);

        StorageCtrl.clearItems();
        
     }

     const updateAllItems = function(){

        const input  = UICtrl.getItemInput();

        const updatedItem = ItemCtrl.updatedItem(input.name , input.money);
        
        UICtrl.updatedListItem(updatedItem);

         const totalMoney = ItemCtrl.getTotalMoney();

         StorageCtrl.updatedItemLs(updatedItem);

        UICtrl.showTotalMoney(totalMoney);

         UICtrl.clearEditState();
        UICtrl.clearInputState();


     }

     
    return{

        start: function(){
            

            UICtrl.clearEditState();
            

            const items = ItemCtrl.getItem();

            if(items.length > 0){
                UICtrl.populateItemList(items); 

                const totalMoney = ItemCtrl.getTotalMoney();

                UICtrl.showTotalMoney(totalMoney);
            
            }
            loadEventListner ();

            
        }
    }
})();

App.start();