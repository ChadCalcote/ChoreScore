const clearColumn3 = ()=>{
  // Remove edit form from dashboard when click outside
  const choreEditFormButton = document.querySelector(".chore-info__edit");
  const choreEditForm = document.querySelector(".chore-info__edit-form");
  document.addEventListener('click', (event) => {
      const isClickInside = choreEditFormButton.contains(event.target);
      const isClickInForm = choreEditForm.contains(event.target);

      if (!isClickInside && !isClickInForm) {
          document.querySelector(".edit-chore__form").classList.add("hidden")
          document.querySelector(".chore__buttons-container").classList.add("hidden")
      }
  });

  // Remove chore info from dashboard when click outside
  // const choreInfoContainer = document.querySelector(".chore-info__container")
  // document.addEventListener('click', (event) => {
  //   const isClickInside = choreInfoContainer.contains(event.target);
  //   if (!isClickInside) {
  //     document.querySelector(".chore-info__edit").classList.add("hidden")
  //     document.querySelector(".chore-info__container").innerHTML="";
  //   }
  // });
}

export default clearColumn3;
