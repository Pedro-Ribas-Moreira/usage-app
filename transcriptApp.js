document.addEventListener('DOMContentLoaded', function () {
    const dropZone = document.getElementById('dropZone');
    const itemFound = document.getElementById('itemFound');
    const itemFoundFileName = document.getElementById('fileName');
    const fileInput = document.getElementById('fileInput');
    const formContainer = document.getElementById('formContainer');
    const runButton = document.getElementById('runButton');
    const customerNameInput = document.getElementById('customerName');
    const agentNameInput = document.getElementById('agentName');
    let jsonData = null;
  
    // Handle file drop
    dropZone.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.stopPropagation();
      dropZone.classList.add('bg-gray-200');
    });
  
    dropZone.addEventListener('dragleave', (event) => {
      event.preventDefault();
      event.stopPropagation();
      dropZone.classList.remove('bg-gray-200');
    });
  
    dropZone.addEventListener('drop', (event) => {
      event.preventDefault();
      event.stopPropagation();
      dropZone.classList.remove('bg-gray-200');
  
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
        console.log(files[0]);
        let fileName = files[0].name;
        dropZone.classList.add('hidden');
        itemFound.classList.remove('hidden');
        itemFoundFileName.innerText = fileName;
      }
    });
  
    // Handle file selection
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        handleFile(file);
        console.log(file);
        let fileName = file.name;
  
        dropZone.classList.add('hidden');
        itemFound.classList.remove('hidden');
        itemFoundFileName.innerText = fileName;
      }
    });
  
    function handleFile(file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          jsonData = JSON.parse(e.target.result);
          formContainer.classList.remove('hidden');
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  
    runButton.addEventListener('click', () => {
      if (jsonData) {
        generateTextFile(jsonData);
      } else {
        console.error('No data to process.');
      }
    });
  
    function generateTextFile(data) {
      const results = data.results;
      const customerName = customerNameInput.value.trim() || 'C';
      const agentName = agentNameInput.value.trim() || 'A';
  
      let formattedText = '';
  
      results.forEach((item) => {
        let sender = item.tags.senderName;
        const transcript = item.transcript;
  
        if (sender && transcript) {
          if (sender === 'C') {
            sender = customerName;
          }
          if (sender === 'A') {
            sender = agentName;
          }
          if (sender === 'B') {
            sender = 'Bot';
          }
          formattedText += `${sender}:\n${transcript}\n\n`;
        }
      });
  
      downloadTextFile(formattedText);
    }
  
    function downloadTextFile(text) {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transcript.txt';
      document.body.appendChild(a);
      a.click();
  
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
  
      resetForm();
    }
  
    function resetForm() {
      // Clear input fields
      customerNameInput.value = '';
      agentNameInput.value = '';
  
      // Hide the form container
      formContainer.classList.add('hidden');
      dropZone.classList.remove('hidden');
      itemFound.classList.add('hidden')
      // Clear file input and reset drop zone
      dropZone.classList.remove('bg-gray-200');
    }
  });
  