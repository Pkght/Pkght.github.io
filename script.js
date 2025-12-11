document.addEventListener("DOMContentLoaded", function() {
    const sidebarList = document.querySelector(".sidebar ul");
    const currentPath = window.location.pathname;
    const isSubdirectory = currentPath.includes("zakaat-calculator") || currentPath.includes("inheritance-calculator");

    // Add a "Home" link
    const homeListItem = document.createElement("li");
    const homeLink = document.createElement("a");
    homeLink.textContent = "Home";
    homeLink.href = isSubdirectory ? ".." : ".";
    if (currentPath === "/" || currentPath === "/index.html") {
        homeLink.classList.add("active");
    }
    homeListItem.appendChild(homeLink);
    sidebarList.appendChild(homeListItem);

    tools.forEach(tool => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = tool.name;
        let toolUrl = tool.url;
        if (toolUrl.startsWith('/')) {
            toolUrl = toolUrl.substring(1);
        }
        link.href = isSubdirectory ? "../" + toolUrl : toolUrl;

        if (currentPath.includes(toolUrl)) {
            link.classList.add("active");
        }

        listItem.appendChild(link);
        sidebarList.appendChild(listItem);
    });

    const footer = document.createElement("footer");
    const privacyLink = isSubdirectory ? "../privacy.html" : "privacy.html";
    const disclaimerLink = isSubdirectory ? "../disclaimer.html" : "disclaimer.html";

    footer.innerHTML = `
        <div class="footer-links">
            <a href="${privacyLink}">Privacy Policy</a> |
            <a href="${disclaimerLink}">Disclaimer</a>
        </div>
        <p>&copy; 2025 Islamic Tools. All rights reserved.</p>
    `;
    document.body.appendChild(footer);
});
