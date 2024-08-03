document.getElementById('analyzeButton').addEventListener('click', analyzeImage);

async function analyzeImage() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please upload an image.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('https://api.deepai.org/api/image-recognition', {
            method: 'POST',
            headers: {
                'api-key': '30b42df1-07b7-4311-99e6-6e0485d42bf5'
            },
            body: formData
        });

        const data = await response.json();
        console.log(data); // Log the entire response for debugging
        displayResults(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.output && data.output.labels) {
        data.output.labels.forEach(label => {
            const p = document.createElement('p');
            p.className = 'result-item';
            p.textContent = `Object: ${label.name}, Confidence: ${label.confidence.toFixed(2)}`;
            resultsDiv.appendChild(p);
        });
    } else {
        resultsDiv.textContent = 'No objects detected.';
    }
}