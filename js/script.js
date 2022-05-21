const ACTIVITY_ARRAY = [
  { color: "salmon-red", icon: "icon-work.svg" },
  { color: "soft-blue", icon: "icon-play.svg" },
  { color: "light-red", icon: "icon-study.svg" },
  { color: "lime-green", icon: "icon-exercise.svg" },
  { color: "violet", icon: "icon-social.svg" },
  { color: "soft-orange", icon: "icon-self-care.svg" },
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
    listItem.style.backgroundColor = `var(--${ACTIVITY_ARRAY[activityNo].color})`;
    listItem.style.backgroundImage = `url("../images/${
      ACTIVITY_ARRAY[activityNo++].icon
    }")`;
    /* Different bg color/icon for each activity type */

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("dashboard__activity-card-info");
    const h2Title = document.createElement("h2");
    h2Title.innerText = activity.title;
    const moreLink = document.createElement("a");
    moreLink.href = "#";
    const timeUsed = document.createElement("p");
    const timeUsedPreviously = document.createElement("p");

    for (var name in activity.timeframes) {
      const spanNow = document.createElement("span");
      spanNow.dataset[`${name}`] = activity.timeframes[name].current;
      spanNow.innerText = `${activity.timeframes[name].current}hrs`;
      timeUsed.append(spanNow);
      const spanEarlier = document.createElement("span");
      spanEarlier.dataset[`${name}`] = activity.timeframes[name].previous;
      spanEarlier.innerText = `${activity.timeframes[name].previous}hrs`;
      timeUsedPreviously.append(spanEarlier);
      if (name === "daily") {
        spanNow.classList.add("active");
        spanEarlier.classList.add("active");
      } // default
    }
    cardInfo.append(h2Title, moreLink, timeUsed, timeUsedPreviously);
    listItem.append(cardInfo);
    listPlaceHolder.append(listItem);
  });
};

populateList();
