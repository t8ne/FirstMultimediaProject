$(function() {

    /*quando a página é carregada a 1ª seção é a que deve ter associada a classe active */
    $("a[href='#section1']").addClass("active");/* This will highlight Home when your page will be loaded first*/

    /* função que fica à escuta dos eventos de clique */
    $('nav a').bind('click', function(event) {

      var $anchor = $(this);
      
      $('html, body').stop().animate({
        scrollLeft: $($anchor.attr('href')).offset().left
      }, 3500);

      event.preventDefault(); /*impedir o salto imediato*/

      $("#menu a.active").removeClass("active");/* seleciona o link que tem a classe ative e remove deste a classe*/
      
      $(this).addClass("active"); /*adiciona a classe active ao link onde clicou*/

    });

    /* função que faz o scroll usando o rato*/             
    $("html, body").mousewheel(function(event, delta) {
      
            this.scrollLeft -= (delta * 60);
            event.preventDefault();

            setScroll(); /*função que vai associar a classe active à seção correta quando se faz o scroll com o botão do meio do rato */
    });
    

  });

/* vai ser chamada na função mousewheel */
function setScroll()
{
   
  var scrollPosition = $(window).scrollLeft(); /* guarda a posição de scroll*/
  
  /*console.log("scrollPosition "+ scrollPosition);*/
      
  var $navigationLinks = $("#menu a");
	var $sections = $(".section");
	var $sectionsReversed = $($(".section").get().reverse());
   
	var sectionIdTonavigationLink = {};
  $sections.each(function() {
        var id=$(this).attr('id');
		    sectionIdTonavigationLink[id] = $("#menu a[href='#" + id + "']");

    });


	$sectionsReversed.each(function() {
		    var currentSection = $(this);
        var sectionLeft = currentSection.offset().left; /* guarda a distância da seção ao lado esquerdo */

        if (scrollPosition >= sectionLeft) {
		        var id = currentSection.attr('id');
            /*console.log("id atual: " + id);*/
            var $navigationLink = sectionIdTonavigationLink[id];
		        if (!$navigationLink.hasClass('active')) { /* se o link onde clicou não tem a classe active, remove a classe do link anterior e associa a classe ao link atual*/
		           $navigationLinks.removeClass('active'); /*remove a classe dos outros links*/
		           $navigationLink.addClass('active'); /*adiciona a classe ao link atual*/
            }
               
		        return false; /* sai do ciclo e deixa de procurar */
		    }
	});
    
}