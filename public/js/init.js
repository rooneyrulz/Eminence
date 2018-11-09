window.onload = () => {
   //Initialize Sidenav
   let sideNav = document.querySelector('.sidenav');
   M.Sidenav.init(sideNav, {});

   //Initialize Slider
   const slider = document.querySelector('.slider');
   M.Slider.init(slider, {
      indicators: false,
      transition: 500,
      height: 500,
      intervel: 6000
   });

   //Initialize Autocomplete
   const ac = document.querySelector('.autocomplete');
   M.Autocomplete.init(ac, {
      data: {
         "Bermuda": null,
         "Hawaii": null,
         "Careebian": null,
         "Boston": null,
         "Florida": null,
         "Jamaica": null,
         "Cancun": null,
         "California": null,
         "Marina": null,
         "Chicago": null,
         "Panama": null,
         "Madacascar": null,
         "Java": null
      }
   });

   //Initialize Scrollspy
   const ss = document.querySelectorAll('.scrollspy');
   M.ScrollSpy.init(ss, {});

   //Initialize Parallax
   const pa = document.querySelectorAll('.parallax');
   M.Parallax.init(pa, {});

   //Initialize Materialbox
   const mb = document.querySelectorAll('.materialboxed');
   M.Materialbox.init(mb, {});

};