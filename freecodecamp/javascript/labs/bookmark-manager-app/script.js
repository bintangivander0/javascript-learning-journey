const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const addBookmarkBtn = document.getElementById("add-bookmark-button");
const viewCategoryBtn = document.getElementById("view-category-button");
const categoryList = document.getElementById("category-list");
const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const addBookmarkBtnForm = document.getElementById("add-bookmark-button-form");
const categoryDropdown = document.getElementById("category-dropdown");
const categoryNameEl = document.querySelectorAll(".category-name");
const closeFormBtn = document.getElementById("close-form-button");
const closeListBtn = document.getElementById("close-list-button");
const deleteBookmarkBtn = document.getElementById("delete-bookmark-button");

const getBookmarks = () => {
  const getLocalStorage = localStorage.getItem("bookmarks");

  try {
    const storedBookmarks = JSON.parse(getLocalStorage);

    if (!Array.isArray(storedBookmarks)) {
      return [];
    }

    const itemValid = storedBookmarks.every(
      bookmark =>
        bookmark !== null &&
        !Array.isArray(bookmark) &&
        typeof bookmark === "object" &&
        "name" in bookmark &&
        "category" in bookmark &&
        "url" in bookmark
    );

    if (itemValid) {
      return storedBookmarks;
    } else {
      return [];
    }
  } catch {
    return [];
  }
};

const displayBookmarks = () => {
  const filteredBookmarks = getBookmarks().filter(
    bookmark => bookmark.category === categoryDropdown.value
  );

  categoryList.innerHTML = "";

  if (filteredBookmarks.length < 1) {
    categoryList.innerHTML = `<p>No Bookmarks Found</p>`;
  } else {
    filteredBookmarks.forEach(bookmark => {
      categoryList.innerHTML += `
        <input type="radio" id="${bookmark.name}" value="${bookmark.name}" name="category" />
        <label for="${bookmark.name}">
          <a href="${bookmark.url}">${bookmark.name}</a>
        </label>
      `;
    });
  }
};

const displayOrCloseForm = () => {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
};

const displayOrHideCategory = () => {
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
};

addBookmarkBtn.addEventListener("click", () => {
  categoryNameEl.forEach(
    element => (element.innerText = categoryDropdown.value)
  );

  displayOrCloseForm();
});

viewCategoryBtn.addEventListener("click", () => {
  categoryNameEl.forEach(
    element => (element.innerText = categoryDropdown.value)
  );

  displayBookmarks();
  displayOrHideCategory();
});

addBookmarkBtnForm.addEventListener("click", () => {
  const oldBookmarks = getBookmarks();

  const newBookmark = {
    name: nameInput.value,
    category: categoryDropdown.value,
    url: urlInput.value
  };

  oldBookmarks.push(newBookmark);

  localStorage.setItem("bookmarks", JSON.stringify(oldBookmarks));

  nameInput.value = "";
  urlInput.value = "";

  displayOrCloseForm();
});

closeFormBtn.addEventListener("click", displayOrCloseForm);

closeListBtn.addEventListener("click", displayOrHideCategory);

deleteBookmarkBtn.addEventListener("click", () => {
  const selectedRadio = document.querySelector(
    `input[name="category"]:checked`
  );

  if (!selectedRadio) return;

  const selectedRadioValue = selectedRadio.value;
  const categoryDropdownValue = categoryDropdown.value;
  const bookmarks = getBookmarks();

  const bookmarkIndex = bookmarks.findIndex(
    bookmark =>
      bookmark.name === selectedRadioValue &&
      bookmark.category === categoryDropdownValue
  );

  if (bookmarkIndex === -1) return;

  bookmarks.splice(bookmarkIndex, 1);

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  displayBookmarks();
});
