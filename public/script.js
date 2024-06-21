document.addEventListener('DOMContentLoaded', () => {
  // initials variable 
  const itemForm = document.getElementById('itemForm');
  const itemNim = document.getElementById('itemNim');
  const itemName = document.getElementById('itemName');
  const itemTable = document.getElementById('itemTable').querySelector('tbody');

  // function async get data
  const fetchItems = async () => {
      const response = await fetch('http://localhost:3000/api/items');
      const items = await response.json();
      itemTable.innerHTML = '';
      items.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${item.nim}</td>
              <td>${item.name}</td>
              <td><button data-id="${item.nim}" class="deleteBtn">Delete</button></td> 
          `; //generate dataset for delete-btn
          itemTable.appendChild(row);
      });
  };

  itemForm.addEventListener('submit', async (e) => {
      e.preventDefault(); //stop default button 
      const nim = itemNim.value;
      const name = itemName.value;
      await fetch('http://localhost:3000/api/items', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nim, name })
      });
      itemNim.value = '';
      itemName.value = '';
      fetchItems();
  });

  itemTable.addEventListener('click', async (e) => {
      if (e.target.classList.contains('deleteBtn')) {
          const id = e.target.dataset.id; //get from dataset
          await fetch(`http://localhost:3000/api/items/${id}`, { //id is params 
              method: 'DELETE'
          });
          fetchItems();
      }
  });

  fetchItems();
});
