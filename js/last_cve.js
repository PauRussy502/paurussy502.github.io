const url = 'https://cors-anywhere.herokuapp.com/https://www.opencve.io/cve';

fetch(url)
    .then(response => response.text())
    .then(html => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;

        let rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
        <channel>`;

        const cveInfo = tempElement.querySelector('#cves > tbody');

        if (cveInfo) {
            const cveElement = cveInfo.querySelector('tr:nth-child(1) > td:nth-child(1)');
            const updatedElement = cveInfo.querySelector('tr:nth-child(1) > td:nth-child(4)');
            const cvssV3Element = cveInfo.querySelector('tr:nth-child(1) > td:nth-child(6)');
            const descElement = cveInfo.querySelector('tr:nth-child(2) > td');

            const cveText = cveElement ? cveElement.textContent.trim() : 'No CVE';
            const updatedText = updatedElement ? updatedElement.textContent.trim() : 'N/A';
            const cvssV3Text = cvssV3Element ? cvssV3Element.textContent.trim() : 'N/A';
            const descText = descElement ? descElement.textContent.trim() : 'No Description';

            const cvssV3Span = cveInfo.querySelector('tr:nth-child(1) > td:nth-child(6) > span');
            const cvssV3Class = cvssV3Span ? cvssV3Span.className : '';

            let textColor = 'white';
            if (cvssV3Class.includes('label-danger')) {
                textColor = '#dd4b39';
            } else if (cvssV3Class.includes('label-critical')) {
                textColor = '#972b1e';
            } else if (cvssV3Class.includes('label-warning')) {
                textColor = '#f39c12';
            }

            rssFeed += `
                <item>
                <p><a href="https://www.opencve.io/cve/${cveText}" target="_blank">${cveText}</a></p>
                <p>
                    Updated: ${updatedText}<br>
                    CVSS v3: <span style="color: ${textColor};">${cvssV3Text}</span><br><br>
                    <span class="cvedesc">Description: ${descText}</span>
                </p>
                </item>`;
        }

        rssFeed += `
        </channel>
        </rss>`;

        document.getElementById('external-content').innerHTML = rssFeed;
    })
    .catch(error => {
        console.error(`Error al obtener la página: ${error.message}`);
    });
