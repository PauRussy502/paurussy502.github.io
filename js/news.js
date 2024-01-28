function procesarSolicitud(url, destinoId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {

            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;

            let rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
            <rss version="2.0">
            <channel>`;

            const newsInfo = tempElement.querySelector('#Blog1 > div.blog-posts.clear');

            if (newsInfo) {
                const titleElement = newsInfo.querySelector('div:nth-child(1) > a > div > div.clear.home-right > h2');
                const imageElement = newsInfo.querySelector('div:nth-child(1) > a > div > div.home-img.clear > div > img');
                const dateElement = newsInfo.querySelector('div:nth-child(1) > a > div > div.clear.home-right > div.item-label > span.h-datetime'); 
                const categoryElement = newsInfo.querySelector('div:nth-child(1) > a > div > div.clear.home-right > div.item-label > span.h-tags');
                const descElement = newsInfo.querySelector('div:nth-child(1) > a > div > div.clear.home-right > div.home-desc');
                const urlElement = newsInfo.querySelector('div:nth-child(1) > a');


                const titleText = titleElement ? titleElement.textContent.trim() : 'No info';
                const imageText = imageElement ? imageElement.getAttribute('src').trim() : 'No info';
                const dateText = dateElement ? dateElement.textContent.replace(/[^\x20-\x7E]/g, '').trim().split(' ').slice(0).join(' ') : 'N/A';
                const categoryText = categoryElement ? categoryElement.textContent.trim() : 'No info';
                const descText = descElement ? descElement.textContent.trim() : 'No info';
                const urlText = urlElement ? urlElement.getAttribute('href').trim() : 'No info';
                
                rssFeed += `
                    <item>
                        <h3><a href="${urlText}">${titleText} <span class="context">CLICK FOR MORE INFO</span></a></h3>
                        <p class="context">${dateText} | ${categoryText}</p>
                        <p class="newsdesc">Description: ${descText}</p>
                    </item>`;
            }

            rssFeed += `
            </channel>
            </rss>`;

            document.getElementById(destinoId).innerHTML = rssFeed;
        })
        .catch(error => {
            console.error(`Error al obtener la página: ${error.message}`);
        });
}

const newsurl = 'https://corsproxy.io/?' + encodeURIComponent('https://thehackernews.com/');


procesarSolicitud(newsurl, 'news');