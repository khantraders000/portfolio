const API_KEY = "168771779c71f3d64106d8a88376808a";

// Tab Switching 
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const searchForm = document.querySelector("[data-searchForm]");
const userInfoContainer = document.querySelector(".userInfoContainer");
const grantAccessContainer = document.querySelector(
    ".grantLocationContainer"
);
const loadingContainer = document.querySelector('.loadingContainer');

const notFound = document.querySelector('.errorContainer');
const errorBtn = document.querySelector('[data-errorButton]');
const errorText = document.querySelector('[data-errorText]');
const errorImage = document.querySelector('[data-errorImg]');
let currentTab = userTab;
currentTab.classList.add("current-Tab");
function switchTab(clickedtab) {
    if(clickedtab!=currentTab){
        currentTab.classList.remove("current-Tab");
        currentTab = clickedtab;
        currentTab.classList.add("current-Tab");
        if(!searchForm.classList.contains("active")){
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");            
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getFromSessionStorage();
        }
    }
}
userTab.addEventListener("click",() =>{
    switchTab(userTab);
});

searchTab.addEventListener("click", () =>{
     switchTab(searchTab);
});