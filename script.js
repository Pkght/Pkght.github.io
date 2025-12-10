document.addEventListener("DOMContentLoaded", function() {
    const sidebarList = document.querySelector(".sidebar ul");
    const currentPath = window.location.pathname;

    tools.forEach(tool => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = tool.name;
        link.href = tool.url.substring(1);

        if (currentPath.endsWith(tool.url)) {
            link.classList.add("active");
        }

        listItem.appendChild(link);
        sidebarList.appendChild(listItem);
    });
});
