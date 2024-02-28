function procesarSolicitud(url, destinoId, indexnew) {
    fetch(url)
        .then(response => response.text())
        .then(html => {

            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;

            let rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
            <rss version="2.0">
            <channel>`;

            const newsInfo = tempElement.querySelector('#Blog1 > div.blog-posts.clear > div:nth-child(' + indexnew + ')');

            if (newsInfo) {
                const titleElement = newsInfo.querySelector('a > div > div.clear.home-right > h2');
                const imageElement = newsInfo.querySelector('a > div > div.home-img.clear > div > img');
                const dateElement = newsInfo.querySelector('a > div > div.clear.home-right > div.item-label > span.h-datetime'); 
                const categoryElement = newsInfo.querySelector('a > div > div.clear.home-right > div.item-label > span.h-tags');
                const descElement = newsInfo.querySelector('a > div > div.clear.home-right > div.home-desc');
                const urlElement = newsInfo.querySelector('a');

                const imageText = imageElement ? imageElement.getAttribute('src').trim() : 'No info';
                const titleText = titleElement ? titleElement.textContent.trim() : 'N/A';
                const dateText = dateElement ? dateElement.textContent.trim().split(' ').slice(0) : 'N/A';
                const categoryText = categoryElement ? categoryElement.textContent.trim() : 'No info';
                const descText = descElement ? descElement.textContent.trim() : 'No info';
                const urlText = urlElement ? urlElement.getAttribute('href').trim() : 'No info';

                const FancydateText = dateText[0].slice(1) + ' ' + dateText[1] + ' ' + dateText[2]

                const cleanedTitleText = titleText.replace(/"/g, '').trim();

                rssFeed += `
                    <item>
                        <h2 class="newstitle">NEW ${indexnew}</h2>
                        <h3><a href="${urlText}" data-text="${cleanedTitleText}" style="margin-top: 10px;">${cleanedTitleText}</a></h3>
                        <p class="newscontext">${FancydateText} | ${categoryText}</p>
                        <p class="newsdesc" style="text-align: justify;">${descText}</p>
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

procesarSolicitud(newsurl, 'news1', '1');
procesarSolicitud(newsurl, 'news2', '2');
procesarSolicitud(newsurl, 'news3', '3');
procesarSolicitud(newsurl, 'news4', '4');
procesarSolicitud(newsurl, 'news5', '5');
procesarSolicitud(newsurl, 'news6', '6');
procesarSolicitud(newsurl, 'news7', '7');
procesarSolicitud(newsurl, 'news8', '8');
procesarSolicitud(newsurl, 'news9', '9');
procesarSolicitud(newsurl, 'news10', '10');