// Global counter.
let itemsCounter = document.getElementById('itemsContainer').childElementCount;
let folderCounter = document.getElementById('folderContainer').childElementCount;


// Add item to list.
let addModalItemAdd = document.getElementById('addItemModalButton');
addModalItemAdd.addEventListener('click', function() {
    // Get the input.
    let input = document.getElementById('addModalItemInput');

    if (input.value !== '') {
        // Verify the counter of the item id.
        let exist = null;

        do {
            // Add 1 to variable itemsCounter.
            itemsCounter++;

            exist = document.getElementById('element-' + itemsCounter);
        } while (exist !== null);

        // Get the list to append the item.
        let itemsContainer = document.getElementById('itemsContainer');
    
        // Create the item element.
        let element = document.createElement('div');
        element.id = 'element-' + itemsCounter;
        element.className = 'd-flex justify-content-between align-items-center mb-2 item';
        element.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="d-flex justify-content-center align-items-center align-items-center me-4 icon">
                    <i class="fa-solid fa-check folder-icon"></i>
                </div>
                
                <input type="checkbox" name="${'element-' + itemsCounter}">
                <p class="elementValue mb-0 ms-3">${input.value}</p>
            </div>


            <div class="d-flex me-5">
                <i class="fas fa-edit text-primary edit" data-number="${'element-' + itemsCounter}"></i>
                <i class="fa-solid fa-circle-minus text-danger ms-3 delete" data-number="${'element-' + itemsCounter}"></i>
            </div>
        `;
    
        itemsContainer.append(element);
        
        // Empty the input.
        input.value = '';
    
        // let data = new FormData();
        // data.append('input', input.value);
    
        // fetch('./App.php', {
        //     method: 'POST',
        //     body: data,
        // })
        // .then(response => response.json())
        // .then(function (data) {
        //     output.value = data;
        // });
    } else {
        // Field can not be empty.
    }
});


// Event delegation for edit item.
let itemsContainer = document.getElementById('itemsContainer');
itemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit') === true ) {
        // Get the ID of the root element.
        let itemId = event.target.getAttribute('data-number');
        
        // Get the item and his value
        let item = document.getElementById(itemId);
        let itemValue = item.querySelector('.elementValue');

        // Set modal input value.
        let inputModal = document.getElementById('editModalItemInput');
        inputModal.value = itemValue.innerHTML;

        // Set data-number to Save button.
        let saveButton = document.getElementById('editModalItemSave');
        saveButton.setAttribute('data-number', itemId);
        
        // Get edit item modal and show it.
        let modal = new bootstrap.Modal(document.getElementById('editModalItem'));
        modal.show();
    }
});


// Save edit item modal.
let editModalItemSave = document.getElementById('editModalItemSave');
editModalItemSave.addEventListener('click', function() {
    // Get data-number attribute.
    let itemId = editModalItemSave.getAttribute('data-number');

    // Get modal input.
    let inputModal = document.getElementById('editModalItemInput');

    // Get the item and his value
    let item = document.getElementById(itemId);
    let itemValue = item.querySelector('.elementValue');
    itemValue.innerHTML = inputModal.value;
});


// Event delegation for delete.
itemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete') === true ) {
        deleteItem(event.target);
    }
});



// Confirm delete modal.
let deleteModalItemDelete = document.getElementById('deleteModalItemDelete');
deleteModalItemDelete.addEventListener('click', function() {
    // Get the ID of the root element.
    let itemId = deleteModalItemDelete.getAttribute('data-number');

    // Get the item.
    let item = document.getElementById(itemId);

    // Get parent element.
    let parentElement = item.parentElement;

    // Delete item.
    parentElement.removeChild(item);
});





// Add folder.
let addFolderButton = document.getElementById('addFolderButton');
addFolderButton.addEventListener('click', function() {
    // Get modal, modal header and body.
    let modal = document.getElementById('addModalFolder');
    let modalBody = modal.querySelector('.modal-body .check-items');

    if (itemsContainer.childElementCount > 0) {
        // Get the child elements.
        let childElements = itemsContainer.children;
        let items = document.createElement('div');
        items.classList = 'ms-3';
    
        for (let i = 0; i < itemsContainer.childElementCount; i++) {
            let itemName = childElements[i].querySelector('.elementValue').innerText;
    
            items.innerHTML = items.innerHTML + '' + `
                <div class="d-flex align-items-center">
                    <input type="checkbox" name="` + childElements[i].id + `">
                    <p class="elementValue mb-0 ms-3">` + itemName + `</p>
                </div>
            `;
        }
    
        // Get modal, modal header and body.
        let modal = document.getElementById('addModalFolder');
        let modalBody = modal.querySelector('.modal-body .check-items');
    
        // Edit modal body.
        let h5 = document.createElement('h5');
        h5.innerText = 'Items without folder';
    
        modalBody.innerHTML = '';
        modalBody.append(h5);
        modalBody.append(items);
    } else {
        modalBody.innerHTML = '';
    }
});


// Save add forlder modal.
let addFolderModalButton = document.getElementById('addFolderModalButton');
addFolderModalButton.addEventListener('click', function() {
    // Get the input.
    let input = document.getElementById('addModalFolderInput');

    if (input.value !== '') {
        // Verify the counter of the item id.
        let exist = null;

        do {
            // Add 1 to variable folderCounter.
            folderCounter++;

            exist = document.getElementById('folder-' + folderCounter);
        } while (exist !== null);

        // Get the list to append the item.
        let folderContainer = document.getElementById('folderContainer');
    
        // Create the item element.
        let element = document.createElement('div');
        element.className = 'folder-' + folderCounter + ' mt-4';
        element.innerHTML = `
            <div id="${'folder-' + folderCounter}" class="d-flex justify-content-between align-items-center mb-2 folder">
                <div class="d-flex align-items-center">
                    <div class="d-flex justify-content-center align-items-center align-items-center me-4 icon">
                        <i class="fa-solid fa-folder-open folder-icon"></i>
                    </div>
                    
                    <p class="elementValue mb-0 ms-3">${input.value}</p>
                </div>

                <div class="d-flex me-5">
                    <i class="fa-solid fa-plus text-success add" data-number="${'folder-' + folderCounter}"></i>
                    <i class="fas fa-edit text-primary ms-3 edit" data-number="${'folder-' + folderCounter}"></i>
                    <i class="fa-solid fa-circle-minus text-danger ms-3 delete" data-number="${'folder-' + folderCounter}"></i>
                </div>
            </div>
        `;

        folderContainer.append(element);

        // Get modal and modal body.
        let modal = document.getElementById('addModalFolder');
        let modalBody = modal.querySelector('.modal-body .ms-3');

        // Move items.
        moveItems(element, modalBody);
        
        // Empty the input.
        input.value = '';
    }
});


// Event delegation for edit folder.
let folderContainer = document.getElementById('folderContainer');
folderContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit') === true ) {
        // Get the ID of the root element.
        let folderId = event.target.getAttribute('data-number');
        
        // Get the folder and his value
        let folder = document.getElementById(folderId);
        let folderValue = folder.querySelector('.elementValue');

        // Set modal input value.
        let inputModal = document.getElementById('editModalFolderInput');
        inputModal.value = folderValue.innerHTML;

        // List the items in that folder (if it has).
        let folderFather = document.querySelector('.' + folderId);
        let items = document.createElement('div');
        items.classList = 'ms-3';
        
        if (folderFather.childElementCount > 1) {
            for (let i = 1; i < folderFather.childElementCount; i++) {
                let itemName = folderFather.children[i].querySelector('.elementValue').innerText;

                items.innerHTML = items.innerHTML + `
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="` + folderFather.children[i].id + `">
                        <p class="elementValue mb-0 ms-3">` + itemName + `</p>
                    </div>
                `;
            }

            // Get modal, modal header and body.
            let modal = document.getElementById('editModalFolder');
            let modalBody = modal.querySelector('.modal-body .check-items');

            // Edit modal body.
            let h5 = document.createElement('h5');
            h5.innerText = 'Items to remove from the folder';

            let p = document.createElement('p');
            p.classList = 'small mb-1';
            p.innerText = 'Check the item to remove';
        
            modalBody.innerHTML = '';
            modalBody.append(h5);
            modalBody.append(p);
            modalBody.append(items);
        }

        // Set data-number to Save button.
        let saveButton = document.getElementById('editFolderModalButton');
        saveButton.setAttribute('data-number', folderId);
        
        // Get edit folder modal and show it.
        let modal = new bootstrap.Modal(document.getElementById('editModalFolder'));
        modal.show();
    }
});


// Save edit folder modal.
let editFolderModalButton = document.getElementById('editFolderModalButton');
editFolderModalButton.addEventListener('click', function() {
    // Get data-number attribute.
    let folderId = editFolderModalButton.getAttribute('data-number');

    // Get modal input.
    let inputModal = document.getElementById('editModalFolderInput');

    // Get the folder and his value.
    let folder = document.getElementById(folderId);
    let folderValue = folder.querySelector('.elementValue');
    folderValue.innerHTML = inputModal.value;

    // Get modal, modal header and body.
    let modal = document.getElementById('editModalFolder');
    let modalBody = modal.querySelector('.modal-body .check-items .ms-3');

    // Check there is items
    if (modalBody.childElementCount > 0) {
        // Remove items checked.
        moveItems(itemsContainer, modalBody);
    }
});


// Event delegation for delete.
folderContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete') === true ) {
        debugger
        // Check if deleting item or folder.
        let item = event.target.parentElement.parentElement;

        if (item.classList.contains('item') === false) {
            // Deleting folder.
            // Get the ID of the root element.
            let itemId = event.target.getAttribute('data-number');
    
            // Set data-number to Save button.
            let deleteButton = document.getElementById('deleteModalFolderDelete');
            deleteButton.setAttribute('data-number', itemId);
    
            // Get delete modal and show it.
            let modal = new bootstrap.Modal(document.getElementById('deleteModalFolder'));
            modal.show();
        } else {
            // Deleting item.
            deleteItem(event.target);
        }
    }
});


// Confirm delete modal.
let deleteModalFolderDelete = document.getElementById('deleteModalFolderDelete');
deleteModalFolderDelete.addEventListener('click', function() {
    // Get the ID of the root element.
    let itemId = deleteModalFolderDelete.getAttribute('data-number');

    // Get the item.
    let item = document.querySelector('.' + itemId);

    // Delete item.
    folderContainer.removeChild(item);
});


// Event delegation for add item to folder.
folderContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('add') === true ) {
        // Check if there is items witout folder.
        if (itemsContainer.childElementCount > 0) {
            // Get the ID of the root element.
            let itemId = event.target.getAttribute('data-number');
            
            // Get the item and his value
            let item = document.getElementById(itemId);
    
            // Get the child elements.
            let childElements = itemsContainer.children;
            let items = document.createElement('div');
            items.classList = 'ms-3';
    
            for (let i = 0; i < itemsContainer.childElementCount; i++) {
                let itemName = childElements[i].querySelector('.elementValue').innerText;
    
                items.innerHTML = items.innerHTML + `
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="` + childElements[i].id + `">
                        <p class="elementValue mb-0 ms-3">` + itemName + `</p>
                    </div>
                `;
            }

            // Get modal, modal header and body.
            let modal = document.getElementById('modalAddItemFolder');
            let modalHeader = modal.querySelector('.modal-title');
            let modalBody = modal.querySelector('.modal-body');
    
            // Edit modal header.
            let folderName = item.querySelector('.elementValue');
            modalHeader.innerText = 'Add item to folder: ' + folderName.innerText;
    
            // Edit modal body.
            let h5 = document.createElement('h5');
            h5.innerText = 'Items without folder';
    
            modalBody.innerHTML = '';
            modalBody.append(h5);
            modalBody.append(items);

            // Set data-number to Add button.
            let saveButton = document.getElementById('buttonAddItemFolder');
            saveButton.setAttribute('data-number', itemId);
            
            // Get add item to folder modal and show it.
            let modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
        } else {
            // There are not items without folder.
            let body = `
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <i class="fa-solid fa-triangle-exclamation fa-3x text-danger"></i>

                    <h5 class="mt-3">There are not items without folder.</h5>
                </div>
            `;

            errorModal(body);
        }
    }
});


// Confirm add items to folder.
let buttonAddItemFolder = document.getElementById('buttonAddItemFolder');
buttonAddItemFolder.addEventListener('click', function() {
    // Get folder.
    let folderId = buttonAddItemFolder.getAttribute('data-number');
    let folder = document.querySelector('.' + folderId);

    // Get modal and modal body.
    let modal = document.getElementById('modalAddItemFolder');
    let modalBody = modal.querySelector('.modal-body .ms-3');

    // Move items.
    moveItems(folder, modalBody);
});



function deleteItem(target) {
    // Get the ID of the root element.
    let itemId = target.getAttribute('data-number');

    // Set data-number to Save button.
    let deleteButton = document.getElementById('deleteModalItemDelete');
    deleteButton.setAttribute('data-number', itemId);

    // Get delete modal and show it.
    let modal = new bootstrap.Modal(document.getElementById('deleteModalItem'));
    modal.show();
}


function moveItems(folder, modalBody) {
    for (let i = 0; i < modalBody.childElementCount; i++) {
        // Get checkbox.
        let checkbox = modalBody.children[i].querySelector('input');

        // If is checked, we move it to the folder.
        if (checkbox.checked) {
            // Get item.
            let itemId = modalBody.children[i].querySelector('input').getAttribute('name');
            let item = document.getElementById(itemId);

            // Add class to item.
            item.classList.add('ms-5');

            // Move.
            folder.append(item);
        }
    }
}


function errorModal(body) {
    // Get modal and modal body.
    let modal = document.getElementById('errorModal');
    let modalBody = modal.querySelector('.modal-body')

    // Replace error modal content.
    modalBody.innerHTML = body;

    // Launch modal.
    let modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}