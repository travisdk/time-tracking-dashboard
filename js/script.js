const COLOR_ARRAY = [
  "salmon-red",
  "soft-blue",
  "light-red",
  "lime-green",
  "violet",
  "soft-orange",
];
const ICON_ARRAY = [
  "icon-work.svg",
  "icon-play.svg",
  "icon-study.svg",
  "icon-exercise.svg",
  "icon-social.svg",
  "icon-self-care.svg",
];
const periodLinks = document.querySelectorAll(".dashboard__period-link");
periodLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    console.log(e.target.dataset.period);
  });
});

const loadJSON = async () => {
  const response = await fetch("../data.json");
  const jsonData = await response.json();
  return jsonData;
};

const populateList = async () => {
  const listPlaceHolder = document.querySelector("#dashboard__activity-cards");
  const activities = await loadJSON();
  let activityNo = 0;
  activities.forEach((activity) => {
    const listItem = document.createElement("li");
    listItem.classList.add("dashboard__activity-card");
    listItem.style.backgroundColor = `var(--${COLOR_ARRAY[activityNo]})`;
    listItem.style.backgroundImage = `url("../images/${
      ICON_ARRAY[activityNo++]
    }")`;
    /* Different bg color for each activity type */

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("dashboard__activity-card-info");
    const h2Title = document.createElement("h2");
    h2Title.innerText = activity.title;
    const moreLink = document.createElement("a");
    moreLink.href = "#";
    const timeUsed = document.createElement("p");
    timeUsed.innerText = `${activity.timeframes.daily.current}hrs`;
    const timeUsedPreviously = document.createElement("p");
    timeUsedPreviously.innerText = `Yesterday - ${activity.timeframes.daily.previous}hrs`;
    cardInfo.append(h2Title, moreLink, timeUsed, timeUsedPreviously);
    listItem.append(cardInfo);
    listPlaceHolder.append(listItem);
  });
};

populateList();
