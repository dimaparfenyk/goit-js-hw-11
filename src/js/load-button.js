function showLoadBtn(el) {
   el.classList.remove('is-hidden') 
};

function hideLoadBtn(el) {
    // el.classList.remove('is-hidden')
    el.classList.add('is-hidden');
};

export{showLoadBtn,hideLoadBtn}