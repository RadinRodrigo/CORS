document.getElementById('testButton').addEventListener('click', async () => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Testing CORS vulnerability...';
    
    try {
        const targetUrl = document.getElementById('targetUrl').value;
        const response = await fetch(targetUrl, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        const responseData = await response.text();
        
        resultsDiv.innerHTML = `
            <strong>Response Status:</strong> ${response.status}<br>
            <strong>Response Headers:</strong><pre>${JSON.stringify(Object.fromEntries(response.headers), null, 2)}</pre>
            <strong>Response Body:</strong><pre>${responseData.substring(0, 500)}...</pre>
        `;
        
        // Check if CORS headers are present
        const corsHeaders = ['access-control-allow-origin', 'access-control-allow-credentials'];
        const hasCORS = corsHeaders.some(header => response.headers.has(header));
        
        if (hasCORS) {
            resultsDiv.innerHTML += '<div class="alert alert-warning">⚠️ Potential CORS vulnerability detected!</div>';
        }
        
    } catch (error) {
        resultsDiv.innerHTML = `Error testing CORS: ${error.message}`;
    }
});
