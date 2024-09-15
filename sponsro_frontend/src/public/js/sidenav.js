const sidenav = document.querySelector(".sideNavContent"),
    searchbox=document.querySelector(".searchBox"),
    sideNavicon = document.querySelector(".sideNavicon"),
    searchicon = document.querySelector(".searchicon"),
    update=document.querySelector("#update");
    

    function funcsearch() {
        if(searchbox.style.display=== "none")
        {    searchbox.style.display = "block";
        }
        else
        {
            searchbox.style.display = "none";
        }
    }
    sideNavicon.addEventListener("click", function() {
        if(sidenav.style.display=== "none")
        {    sidenav.style.display = "block";
        }
        else
        {
            sidenav.style.display = "none";
        }
    });
    searchicon.addEventListener("click", funcsearch);
    update.addEventListener("click", funcsearch);
    function myFunction(x) {
        x.classList.toggle("change");
      }

      $('.txt').html(function(i, html) {
        var chars = $.trim(html).split("");
      
        return '<span>' + chars.join('</span><span>') + '</span>';
      });