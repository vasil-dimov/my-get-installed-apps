const status = document.getElementById('status');
const ul = document.getElementById('installed-apps');
const smartBanner = document.getElementById('smart-banner');
const divNotSupported = document.getElementById('not-supported');

window.addEventListener('load', () => {
    // Check to see if the API is supported.
    const isGetInstalledRelatedApps = 'getInstalledRelatedApps' in navigator;
    const isAndroid = /(android)/i.test(navigator.userAgent);

    if (isGetInstalledRelatedApps && isAndroid) {
        smartBanner.classList.toggle('hidden', false);
        divNotSupported.classList.toggle('hidden', true);
        checkForRelatedApps();
    }
});

function checkForRelatedApps() {
    navigator.getInstalledRelatedApps().then((relatedApps) => {
        relatedApps.forEach((app) => {
            if(app.id === 'com.bg.mydemogetinstalledrelatedapps') {
                status.textContent = `The app is installed!!!`;
                smartBanner.classList.toggle('hidden', true);
            }
            const lines = [];
            lines.push(`<b>id:</b> <code>${app.id}</code>`);
            lines.push(`<b>platform:</b> ${app.platform}`);
            lines.push(`<b>url:</b> <a href="${app.url}">${app.url}</a>`);
            const li = document.createElement('li');
            li.innerHTML = lines.join('<br>');
            ul.appendChild(li);
        });
    });
}


