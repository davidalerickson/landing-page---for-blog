/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

let prevScrollTop; //variable to track scroll position for hiding and showing menubar

// ---------------Get Nodes-----------------
//Get menu nodes for navbar dynamic navbar construction
const menuNode = document.querySelector("#navbar__list");
const menuItemNodes = document.querySelectorAll("[data-nav]");

//Get button node for "top" button
const btnScrollToTop = document.getElementById("btnTop");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// When the user clicks on the top button document scrolls to top of doc
function topFunction() {
  window.scrollTo(0, 0);
}

//Determines if an element is in the viewport. This can be used for horizontal scroll too if we need
const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
// Add class 'activeMenuItem", "in-viewport' to section when near top of viewport. Both classes are used to give more specificity
const setupMenuOject = () => {
  let tempObject = {};
  //get section nodes and extract section id's and nav values
  const sections = document.querySelectorAll("section");
  for (const [key, value] of Object.entries(sections)) {
    tempObject[value.dataset.nav] = value.id;
  }
  // console.log(tempObject);
  return tempObject;
};

//Iterate through menu object and build menu
const setupMenu = (menuTextAndIds) => {
  for (const [key, value] of Object.entries(menuTextAndIds)) {
    let menuLink = `<a href="#${value}" class="menu__link">${key}</a>`;

    //create li elemant with menu text
    let li = document.createElement("li");
    // add link to list item
    li.innerHTML = menuLink;

    menuNode.appendChild(li);
  }
  //Select First Menu Item as active
  menuNode.childNodes
    .item(0)
    .children[0].classList.add("activeMenuItem", "in-viewport");
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Add Scroll events to document to detect when section is in viewport and update classes of menu items
const setupScrollEventListeners = (numItems) => {
  for (let i = 0; i < numItems; i++) {
    document.addEventListener("scroll", () => {
      if (
        isInViewport(menuItemNodes.item(i).firstElementChild.firstElementChild)
      ) {
        menuNode.childNodes
          .item(i)
          .children[0].classList.add("activeMenuItem", "in-viewport");
      } else {
        menuNode.childNodes
          .item(i)
          .children[0].classList.remove("activeMenuItem", "in-viewport");
      }
    });
  }
};

// If the document is scrolled more than 100px from top, show the #btnTop button
window.addEventListener("scroll", () => {
  document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
    ? (btnScrollToTop.style.display = "block")
    : (btnScrollToTop.style.display = "none");
});

// Build menu

const menuObject = setupMenuOject();
const numMenuItems = Object.keys(menuObject).length;

setupScrollEventListeners(numMenuItems);

setupMenu(menuObject);
