// Global counter.
let itemsCounter = document.getElementById('itemsContainer').childElementCount;
let folderCounter = document.getElementById('folderContainer').childElementCount;


// Add item to list.
let addModalItemAdd = document.getElementById('addItemModalButton');
addModalItemAdd.addEventListener('click', function() {
    // Get the input.
    let input = document.getElementById('addModalItemInput');

    if (input.value !== '') {
        // Check if has invalid class and remove it.
        if (input.classList.contains('is-invalid')) {
            input.classList.remove('is-invalid');
        }
        
        // Create and populate data object.
        let data = new FormData();
        data.append('action', 'addItem');
        data.append('folder_id', null);
        data.append('item_name', input.value);
        data.append('checked', false);

        // Make fetch to controller.
        fetch('../php/controller.php?', {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(function (data) {
            let items = [data];

            // Draw all items.
            drawItems(items);

            // Hide modal.
            jQuery('#addModalItem').modal('hide');
    
            // Empty the input.
            input.value = '';
        });
    } else {
        // Input can not be null.
        input.classList.add('is-invalid');
    }
});


// Event delegation for edit item.
let itemsContainer = document.getElementById('itemsContainer');
itemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit') === true ) {
        editItem(event.target);
    }
});


// Confirm edit item modal.
let editModalItemSave = document.getElementById('editModalItemSave');
editModalItemSave.addEventListener('click', function() {
    // Get data-number attribute.
    let itemId = editModalItemSave.getAttribute('data-number');

    // Get modal input.
    let inputModal = document.getElementById('editModalItemInput');

    // Create and populate data object.
    let data = new FormData();
    data.append('action', 'editItem');
    data.append('item_id', itemId);
    data.append('item_name', inputModal.value);

    // Make fetch to controller.
    fetch('../php/controller.php?', {
        method: 'POST',
        body: data,
    })
    .then(function () {
        // Get the item and his value.
        let item = document.getElementById(itemId);
        let itemValue = item.querySelector('.elementValue');
        itemValue.innerHTML = inputModal.value;
    });
});


// Event delegation for delete.
itemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete') === true ) {
        deleteItem(event.target);
    }
});


// Confirm delete item modal.
let deleteModalItemDelete = document.getElementById('deleteModalItemDelete');
deleteModalItemDelete.addEventListener('click', function() {
    // Get the ID of the root element.
    let itemId = deleteModalItemDelete.getAttribute('data-number');

    // Get the item.
    let item = document.getElementById(itemId);

    // Create and populate data object.
    let data = new FormData();
    data.append('action', 'deleteItem');
    data.append('item_id', itemId);

    // Make fetch to controller.
    fetch('../php/controller.php?', {
        method: 'POST',
        body: data,
    })
    .then(function () {
        // Get parent element.
        let parentElement = item.parentElement;
    
        // Delete item.
        parentElement.removeChild(item);
    });
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


// Confirm add folder modal.
let addFolderModalButton = document.getElementById('addFolderModalButton');
addFolderModalButton.addEventListener('click', function() {
    // Get the input.
    let input = document.getElementById('addModalFolderInput');

    if (input.value !== '') {
        // Check if has invalid class and remove it.
        if (input.classList.contains('is-invalid')) {
            input.classList.remove('is-invalid');
        }

        // Create and populate data object.
        let data = new FormData();
        data.append('action', 'addFolder');
        data.append('folder_name', input.value);
    
        // Make fetch to controller.
        fetch('../php/controller.php?', {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(function (data) {
            let folders = [data];

            // Draw all folders.
            drawFolders(folders);

            // Get modal and modal body.
            let modal = document.getElementById('addModalFolder');
            let modalBody = modal.querySelector('.modal-body .ms-3');
            jQuery('#addModalFolder').modal('hide');

            // Move items.
            moveItems(folder, modalBody, 'folder-' + data.id);
            
            // Empty the input.
            input.value = '';
        });
    } else {
        // Input can not be null.
        input.classList.add('is-invalid');
    }
});


// Event delegation for edit folder.
let folderContainer = document.getElementById('folderContainer');
folderContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit') === true ) {
        // Check if editing item or folder.
        let item = event.target.parentElement.parentElement;

        if (item.classList.contains('item') === false) {
            // Editing folder.
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
        } else {
            // Editing item.
            editItem(event.target);
        }
    }
});


// Confirm edit folder modal.
let editFolderModalButton = document.getElementById('editFolderModalButton');
editFolderModalButton.addEventListener('click', function() {
    // Get data-number attribute.
    let folderId = editFolderModalButton.getAttribute('data-number');

    // Get modal input.
    let inputModal = document.getElementById('editModalFolderInput');

    // Create and populate data object.
    let data = new FormData();
    data.append('action', 'editFolder');
    data.append('folder_id', folderId);
    data.append('folder_name', inputModal.value);

    // Make fetch to controller.
    fetch('../php/controller.php?', {
        method: 'POST',
        body: data,
    })
    .then(function () {
        // Get the folder and his value.
        let folder = document.getElementById(folderId);
        let folderValue = folder.querySelector('.elementValue');
        folderValue.innerHTML = inputModal.value;

        // Get modal, modal header and body.
        let modal = document.getElementById('editModalFolder');
        let modalBody = modal.querySelector('.modal-body .check-items .ms-3');
    
        // Check there is items.
        if (modalBody.childElementCount > 0) {
            // Remove items checked.
            moveItems(itemsContainer, modalBody);
        }
    });
});


// Event delegation for delete.
folderContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete') === true ) {
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


// Confirm delete folder modal.
let deleteModalFolderDelete = document.getElementById('deleteModalFolderDelete');
deleteModalFolderDelete.addEventListener('click', function() {
    // Get the ID of the root element.
    let folderId = deleteModalFolderDelete.getAttribute('data-number');

    // Get the folder.
    let folder = document.querySelector('.' + folderId);

    // Create and populate data object.
    let data = new FormData();
    data.append('action', 'deleteFolder');
    data.append('folder_id', folderId);

    // Make fetch to controller.
    fetch('../php/controller.php?', {
        method: 'POST',
        body: data,
    })
    .then(function () {
        // Delete item.
        folderContainer.removeChild(folder);
    });
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
    moveItems(folder, modalBody, folderId);
});


function editItem(target) {
    // Get the ID of the root element.
    let itemId = target.getAttribute('data-number');

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


function moveItems(folder, modalBody, folderId = '') {
    for (let i = 0; i < modalBody.childElementCount; i++) {
        // Get checkbox.
        let checkbox = modalBody.children[i].querySelector('input');

        // If is checked, we move it to the folder.
        if (checkbox.checked) {
            // Get item.
            let itemId = modalBody.children[i].querySelector('input').getAttribute('name');
            let item = document.getElementById(itemId);

            // Create and populate data object.
            let data = new FormData();
            data.append('action', 'editItem');
            data.append('item_id', itemId);
            data.append('folder_id', folderId);

            // Make fetch to controller.
            fetch('../php/controller.php?', {
                method: 'POST',
                body: data,
            })
            .then(function () {         
                if (folder === itemsContainer) {
                    // Remove class to item.
                    item.classList.remove('ms-5');
                } else {
                    // Add class to item.
                    item.classList.add('ms-5');
                }   

                // Move.
                folder.append(item);
            });
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

window.onload = getData();
function getData() {
    // Fetch folders.
    let action = 'action=getAllFolders';

    fetch('../php/controller.php?' + action, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(function (data) {
        drawFolders(data.folders);

        // Fetch items.
        let action = 'action=getAllItems';

        fetch('../php/controller.php?' + action, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(function (data) {
            drawItems(data.items);            
        });
    })
    .catch(log => console.log('log: ', log));
}


function drawFolders(folders) {
    if (folders !== null) {
        folders.forEach(folder => {
            // Create the item element.
            let folderCreated = document.createElement('div');
            folderCreated.className = 'folder-' + folder.id + ' mt-4';

            folderCreated.innerHTML = `
                <div id="${'folder-' + folder.id}" class="d-flex justify-content-between align-items-center mb-2 folder">
                    <div class="d-flex align-items-center">
                        <div class="d-flex justify-content-center align-items-center align-items-center me-4 icon">
                            <i class="fa-solid fa-folder-open folder-icon"></i>
                        </div>
                        
                        <p class="elementValue mb-0 ms-3">${folder.name}</p>
                    </div>

                    <div class="d-flex me-5">
                        <i class="fa-solid fa-plus text-success add" data-number="${'folder-' + folder.id}"></i>
                        <i class="fas fa-edit text-primary ms-3 edit" data-number="${'folder-' + folder.id}"></i>
                        <i class="fa-solid fa-circle-minus text-danger ms-3 delete" data-number="${'folder-' + folder.id}"></i>
                    </div>
                </div>
            `;


            // Get the list to append the item.
            let folderContainer = document.getElementById('folderContainer');

            // Append folder.
            folderContainer.append(folderCreated);    
        });
    }
}


function drawItems(items) {
    if (items !== null) {
        items.forEach(item => {
            // Create the item element.
            let itemCreated = document.createElement('div');
            
            // Set id and class.
            itemCreated.id = 'element-' + item.id;
            itemCreated.className = 'd-flex justify-content-between align-items-center mb-2 item';

            // Set if is checked.
            let checked = '';
            if (item.checked === '1') {
                checked = 'checked';
            }

            // Finish building the html.
            itemCreated.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="d-flex justify-content-center align-items-center align-items-center me-4 icon">
                        <i class="fa-solid fa-check folder-icon"></i>
                    </div>
                    
                    <input type="checkbox" name="${'element-' + item.id}" ${checked}>
                    <p class="elementValue mb-0 ms-3">${item.name}</p>
                </div>


                <div class="d-flex me-5">
                    <i class="fas fa-edit text-primary edit" data-number="${'element-' + item.id}"></i>
                    <i class="fa-solid fa-circle-minus text-danger ms-3 delete" data-number="${'element-' + item.id}"></i>
                </div>
            `;

            // Check folder.
            let father = document.getElementById('itemsContainer');
            if (item.folder_id !== null) {
                father = document.querySelector('.folder-' + item.folder_id);
                itemCreated.classList.add('ms-5');
            }

            // Append item.
            father.append(itemCreated);
        });


        // Event listener for checkboxes.
        let mainContainer = document.getElementById('main-container');
        let checkboxs = mainContainer.querySelectorAll("input[type='checkbox']");

        for (let i = 0; i < checkboxs.length; i++) {
            checkboxs[i].addEventListener("click", editCheck);
        }
    }
}

function editCheck(event) {
    let folderId = '';
    let itemId = event.target.name;
    let checked = event.target.checked;

    // Get parent id.
    if (event.target.parentElement.parentElement.parentElement.id != "itemsContainer") {
        folderId = event.target.parentElement.parentElement.parentElement.className;
        if (folderId.includes('mt-4')) {
            folderId = folderId.slice(0, -5);
        }
    }

    // Create and populate data object.
    let data = new FormData();
    data.append('action', 'editItem');
    data.append('folder_id', folderId);
    data.append('item_id', itemId);
    data.append('checked', checked);

    // Make fetch to controller.
    fetch('../php/controller.php?', {
        method: 'POST',
        body: data,
    })
}