let heroHeight = document.querySelector('.hero').scrollHeight;
let projectsHeight = document.getElementById('projects').scrollHeight;
let aboutHeight = document.getElementById('about').scrollHeight;
let contact = document.getElementById('contact').scrollHeight;

let $topBtn = document.getElementById("topBtn");

let scroll = 0;

const josh = new Josh({
    
    animateInMobile: false
});
function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    $topBtn.style.opacity = 1;
    $topBtn.style.cursor = 'pointer';
  } else {
    $topBtn.style.opacity = 0;
    $topBtn.style.cursor = 'default';
  }
}
$topBtn.addEventListener('mouseenter', ()=>{
    $topBtn.style.color = 'var(--black)';
})
$topBtn.addEventListener('mouseleave', ()=>{
    setScrollSettings();
})

// When the user clicks on the button, scroll to the top of the document
function topFunction() 
{
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  console.log(document.URL)
  console.log(document.URL.split("#"))
  let docURL = document.URL.split("#")
  if (docURL.length > 1)
  {
    history.pushState("","", docURL[0]);
  }
} 

function setScrollSettings()
{
    if (scroll >= heroHeight + projectsHeight + (aboutHeight/1.3))
    {
        console.log("Contact")
        $topBtn.style.color = 'var(--black)';
        if (scroll >= heroHeight + projectsHeight + (aboutHeight - 50))
        {
            $footFix.classList.add('show');
        }
        else
        {
            $footFix.classList.remove('show');
        }
        
    }
    else if (scroll >= heroHeight + projectsHeight)
    {
        console.log("About")
        $topBtn.style.color = 'var(--white)';
        $footFix.classList.remove('show');
    }
    else if (scroll >= heroHeight)
    {
        console.log("Projects")
        $topBtn.style.color = 'var(--white)';
        $footFix.classList.remove('show');
    }
    else
    {
        console.log("Hero")
        $topBtn.style.color = 'var(--black)';
        $footFix.classList.remove('show');
    }
}

let $h1 = document.querySelector('.heading');
let $heroTxt = document.getElementById('heroContent');
let $footFix = document.getElementById('footFix');
window.addEventListener("scroll", (event) => {
    heroHeight = document.querySelector('.hero').scrollHeight;
    projectsHeight = document.getElementById('projects').scrollHeight;
    aboutHeight = document.getElementById('about').scrollHeight;
    contact = document.getElementById('contact').scrollHeight;
    scrollFunction();
    scroll = this.scrollY;
    if (scroll >= window.height)
    {
      $h1.style.opacity = 0;
      $heroTxt.style.position = 'fixed';
      $heroTxt.style.bottom = '-550px';
      
    }
    else
    {
      $h1.style.opacity = 1;
      $heroTxt.style.position = 'relative';
      $heroTxt.style.bottom = 0;
    }

    setScrollSettings();
});